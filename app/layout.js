import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.earlyjobs.ai';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EarlyJobs App Download | Find Nearby Jobs & Start Your Career',
    template: '%s | EarlyJobs',
  },
  description: 'Download the EarlyJobs app to find verified job openings near you. Apply easily, get faster interview calls, and start your career today.',
  keywords: [
    'EarlyJobs',
    'job search',
    'career opportunities',
    'early career',
    'job app',
    'employment',
    'career growth',
    'job matching',
    'download app',
    'Android app',
    'iOS app',
  ],
  authors: [{ name: 'EarlyJobs' }],
  creator: 'EarlyJobs',
  publisher: 'EarlyJobs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'EarlyJobs',
    title: 'EarlyJobs App Download | Find Nearby Jobs & Start Your Career',
    description: 'Download the EarlyJobs app to find verified job openings near you. Apply easily, get faster interview calls, and start your career today.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EarlyJobs - Download App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EarlyJobs App Download | Find Nearby Jobs & Start Your Career',
    description: 'Download the EarlyJobs app to find verified job openings near you. Apply easily, get faster interview calls, and start your career today.',
    images: ['/og-image.png'],
    creator: '@earlyjobs',
    site: '@earlyjobs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}

