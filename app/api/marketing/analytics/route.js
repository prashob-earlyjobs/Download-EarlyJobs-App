import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import MarketingData from '@/lib/models/MarketingData';

export async function GET() {
  try {
    await connectDB();

    const totalVisits = await MarketingData.countDocuments();
    
    const platformStats = await MarketingData.aggregate([
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 }
        }
      }
    ]);

    const downloadStats = await MarketingData.aggregate([
      {
        $group: {
          _id: '$downloadClicked',
          count: { $sum: 1 }
        }
      }
    ]);

    const topReferrers = await MarketingData.aggregate([
      {
        $group: {
          _id: '$referrer',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalVisits,
        platformStats,
        downloadStats,
        topReferrers
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

