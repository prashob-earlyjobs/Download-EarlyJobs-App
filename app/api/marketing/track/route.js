import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import MarketingData from '@/lib/models/MarketingData';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get client IP
const getClientIP = (request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
};

export async function POST(request) {
  try {
    // Check if request is aborted before processing
    if (request.signal?.aborted) {
      return new NextResponse(null, { status: 204 });
    }

    await connectDB();

    const body = await request.json();
    const {
      sessionId,
      userId,
      platform,
      userAgent,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      action,
      additionalData,
      downloadUrl
    } = body;

    // Generate sessionId if not provided
    const finalSessionId = sessionId || uuidv4();

    // Find existing record by sessionId
    let marketingData = await MarketingData.findOne({ sessionId: finalSessionId });

    if (marketingData) {
      // Update existing record
      if (action) {
        await marketingData.addInteraction(action, additionalData);
      }
      
      if (downloadUrl) {
        await marketingData.markDownloadClicked(downloadUrl);
      }

      // Update referrer and UTM data if provided
      if (referrer || utm_source) {
        marketingData.referrer = referrer || marketingData.referrer;
        marketingData.utm_source = utm_source || marketingData.utm_source;
        marketingData.utm_medium = utm_medium || marketingData.utm_medium;
        marketingData.utm_campaign = utm_campaign || marketingData.utm_campaign;
        marketingData.utm_term = utm_term || marketingData.utm_term;
        marketingData.utm_content = utm_content || marketingData.utm_content;
        await marketingData.save();
      }
    } else {
      // Create new record
      const ipAddress = getClientIP(request);
      
      marketingData = new MarketingData({
        sessionId: finalSessionId,
        userId: userId,
        platform: platform,
        userAgent: userAgent || request.headers.get('user-agent'),
        referrer: referrer || 'direct',
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        ipAddress,
        interactions: action ? [{
          action,
          timestamp: new Date(),
          additionalData: additionalData || {}
        }] : []
      });

      await marketingData.save();
    }

    return NextResponse.json({
      success: true,
      data: marketingData,
      sessionId: finalSessionId
    });
  } catch (error) {
    // Ignore aborted requests (client disconnected)
    if (error.code === 'ECONNRESET' || error.message === 'aborted') {
      // Client disconnected, this is normal behavior
      return new NextResponse(null, { status: 204 });
    }

    // Log other errors but don't expose sensitive information
    console.error('Error tracking marketing data:', error.message);
    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

