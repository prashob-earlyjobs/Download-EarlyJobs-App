# EarlyJobs App Download

A Next.js application that automatically detects the user's platform (Android, iOS, or Web) and redirects them to the appropriate download link. Includes marketing data tracking and storage functionality with MongoDB backend.

## Features

- 🔍 **Platform Detection**: Automatically detects Android, iOS, or Web platforms
- 📱 **Smart Routing**: Redirects users to:
  - Google Play Store for Android devices
  - App Store for iOS devices
  - Web application for desktop browsers
- 📊 **Marketing Data Tracking**: Stores user interaction data in MongoDB including:
  - Platform information
  - Referrer data
  - UTM parameters
  - User actions (page visits, download clicks)
  - Timestamps
  - Session tracking
  - Analytics endpoints
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- 💾 **MongoDB Backend**: Marketing data is stored in MongoDB database
- ⚡ **Next.js**: Full-stack React framework with API routes

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/earlyjobs
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/earlyjobs?retryWrites=true&w=majority
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If using MongoDB Atlas, ensure your connection string is correct.

### 4. Start the Development Server

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Configuration

You can customize the download URLs in `app/page.js`:

```javascript
<DownloadButton 
  androidUrl="https://play.google.com/store/apps/details?id=com.earlyjobs"
  iosUrl="https://apps.apple.com/app/earlyjobs"
  webUrl="https://earlyjobs.ai"
/>
```

## Marketing Data & MongoDB Model

The app automatically tracks and stores the following data in MongoDB:

### Data Tracked:
- **Session Information**: Unique session IDs for tracking user sessions
- **Platform Detection**: Android, iOS, or Web
- **User Agent**: Browser/device information
- **Referrer Information**: Where users came from
- **UTM Parameters**: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- **Visit Tracking**: First visit, last visit, visit count
- **Interactions**: All user actions with timestamps
- **Download Tracking**: Download clicks with URLs and timestamps
- **IP Address**: Client IP address (for analytics)

### MongoDB Model Schema

The `MarketingData` model includes:
- Session and user identification
- Platform and device information
- Referrer and UTM tracking
- Visit history and statistics
- Interaction logs
- Download tracking
- Timestamps (createdAt, updatedAt)

### API Endpoints

- `POST /api/marketing/track` - Track marketing data and interactions
- `GET /api/marketing/session/[sessionId]` - Get data for a specific session
- `GET /api/marketing/analytics` - Get analytics and statistics

## Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the production server.

## Project Structure

```
├── app/                            # Next.js app directory
│   ├── api/                        # API routes
│   │   └── marketing/             # Marketing API endpoints
│   │       ├── track/route.js     # Track marketing data
│   │       ├── session/[sessionId]/route.js  # Get session data
│   │       └── analytics/route.js # Analytics endpoint
│   ├── page.js                     # Main page component
│   ├── page.module.css             # Page styles
│   ├── layout.js                   # Root layout
│   └── globals.css                 # Global styles
├── components/                      # React components
│   ├── DownloadButton.js           # Download button component
│   ├── DownloadButton.module.css
│   ├── PlatformInfo.js            # Platform info display
│   └── PlatformInfo.module.css
├── lib/                            # Library files
│   ├── db.js                       # MongoDB connection
│   └── models/
│       └── MarketingData.js        # MongoDB model/schema
├── utils/                          # Utility functions
│   ├── platformDetector.js         # Platform detection logic
│   └── marketingData.js            # Marketing data API utilities
├── public/                         # Static files
├── package.json
├── next.config.js                  # Next.js configuration
├── jsconfig.json                   # Path aliases configuration
└── README.md
```

## Technologies Used

- **Next.js 14**: Full-stack React framework
- **React 18**: UI library
- **MongoDB with Mongoose 7.5.0**: Database and ODM
- **UUID**: Session ID generation
- **CSS Modules**: Scoped styling

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Lint code: `npm run lint`

## License

MIT
# Download-EarlyJobs-App
