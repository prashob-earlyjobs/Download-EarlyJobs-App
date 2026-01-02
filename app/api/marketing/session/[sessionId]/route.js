import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import MarketingData from '@/lib/models/MarketingData';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { sessionId } = params;

    const marketingData = await MarketingData.findOne({ sessionId });

    if (!marketingData) {
      return NextResponse.json(
        {
          success: false,
          message: 'Marketing data not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: marketingData
    });
  } catch (error) {
    console.error('Error fetching marketing data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

