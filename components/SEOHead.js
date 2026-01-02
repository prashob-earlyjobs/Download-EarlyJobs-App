'use client';

import { useEffect } from 'react';

export default function SEOHead() {
  useEffect(() => {
    // Add structured data (JSON-LD) for better SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'EarlyJobs',
      description: 'Your gateway to early career opportunities. Download the EarlyJobs app and start your career journey today.',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://app.earlyjobs.ai',
      applicationCategory: 'JobSearchApplication',
      operatingSystem: ['Android', 'iOS', 'Web'],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1000',
      },
      featureList: [
        'Early career opportunities',
        'Job matching',
        'Career growth',
        'Top employers',
      ],
    };

    // Remove existing script if present
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add structured data script
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

