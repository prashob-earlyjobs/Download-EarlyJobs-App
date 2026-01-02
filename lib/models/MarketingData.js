import mongoose from 'mongoose';

const marketingDataSchema = new mongoose.Schema({
  // User identification
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    index: true
  },
  
  // Platform information
  platform: {
    type: String,
    enum: ['android', 'ios', 'web'],
    required: true
  },
  userAgent: {
    type: String
  },
  
  // Referrer information
  referrer: {
    type: String,
    default: 'direct'
  },
  utm_source: {
    type: String
  },
  utm_medium: {
    type: String
  },
  utm_campaign: {
    type: String
  },
  utm_term: {
    type: String
  },
  utm_content: {
    type: String
  },
  
  // Visit information
  firstVisit: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  visitCount: {
    type: Number,
    default: 1
  },
  
  // Interaction tracking
  interactions: [{
    action: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    additionalData: {
      type: mongoose.Schema.Types.Mixed
    }
  }],
  
  // Download information
  downloadClicked: {
    type: Boolean,
    default: false
  },
  downloadUrl: {
    type: String
  },
  downloadTimestamp: {
    type: Date
  },
  
  // IP and location (optional)
  ipAddress: {
    type: String
  },
  
  // Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Indexes for better query performance
marketingDataSchema.index({ sessionId: 1, createdAt: -1 });
marketingDataSchema.index({ platform: 1, createdAt: -1 });
marketingDataSchema.index({ 'interactions.action': 1 });

// Method to add interaction
marketingDataSchema.methods.addInteraction = function(action, additionalData = {}) {
  this.interactions.push({
    action,
    timestamp: new Date(),
    additionalData
  });
  this.lastVisit = new Date();
  this.visitCount += 1;
  return this.save();
};

// Method to mark download clicked
marketingDataSchema.methods.markDownloadClicked = function(downloadUrl) {
  this.downloadClicked = true;
  this.downloadUrl = downloadUrl;
  this.downloadTimestamp = new Date();
  return this.save();
};

const MarketingData = mongoose.models.MarketingData || mongoose.model('MarketingData', marketingDataSchema);

export default MarketingData;

