const express = require('express');
const router = express.Router();
const MarketingData = require('../models/MarketingData');
const { v4: uuidv4 } = require('uuid');

// Helper function to get client IP
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         'unknown';
};

// Create or update marketing data
router.post('/track', async (req, res) => {
  try {
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
    } = req.body;

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
      marketingData = new MarketingData({
        sessionId: finalSessionId,
        userId: userId,
        platform: platform,
        userAgent: userAgent || req.headers['user-agent'],
        referrer: referrer || 'direct',
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        ipAddress: getClientIP(req),
        interactions: action ? [{
          action,
          timestamp: new Date(),
          additionalData: additionalData || {}
        }] : []
      });

      await marketingData.save();
    }

    res.status(200).json({
      success: true,
      data: marketingData,
      sessionId: finalSessionId
    });
  } catch (error) {
    console.error('Error tracking marketing data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get marketing data by sessionId
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const marketingData = await MarketingData.findOne({ sessionId });

    if (!marketingData) {
      return res.status(404).json({
        success: false,
        message: 'Marketing data not found'
      });
    }

    res.status(200).json({
      success: true,
      data: marketingData
    });
  } catch (error) {
    console.error('Error fetching marketing data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all marketing data (with pagination)
router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const marketingData = await MarketingData.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MarketingData.countDocuments();

    res.status(200).json({
      success: true,
      data: marketingData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching all marketing data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get analytics/statistics
router.get('/analytics', async (req, res) => {
  try {
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

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

