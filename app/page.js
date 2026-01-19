'use client';

import { useEffect } from 'react';
import { initializeMarketingData, trackDownloadClick } from '@/utils/marketingData';
import SEOHead from '@/components/SEOHead';
import Image from 'next/image';
import styles from './page.module.css';

const DOWNLOAD_URLS = {
  android: 'https://play.google.com/store/apps/details?id=com.victaman.earlyjobs&hl=en_IN',
  ios: 'https://apps.apple.com/in/app/earlyjobs-ai/id6754554572',
};

export default function Home() {
  useEffect(() => {
    // Initialize marketing data tracking on page load
    initializeMarketingData();
  }, []);

  const handleDownload = async (url, platform) => {
    // Track the download click
    await trackDownloadClick(url);
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Hero Section */}
          <header className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.logoContainer}>
                <Image
                  src="/logo512.png"
                  alt="EarlyJobs Logo"
                  width={140}
                  height={140}
                  priority
                  className={styles.logo}
                />
              </div>
              <h1 className={styles.heroTitle}>Find Nearby Jobs & Start Your Career</h1>
              <p className={styles.heroDescription}>
                Download the EarlyJobs app to find verified job openings near you. 
                Apply easily, get faster interview calls, and start your career today.
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* CTA Section */}
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>Download Now</h2>
              <p className={styles.ctaSubtitle}>Available on iOS and Android</p>
              
              <div className={styles.storeButtons}>
                <button 
                  className={`${styles.storeButton} ${styles.appleButton}`}
                  onClick={() => handleDownload(DOWNLOAD_URLS.ios, 'ios')}
                  aria-label="Download on the App Store"
                >
                  <div className={styles.storeButtonIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  </div>
                  <div className={styles.storeButtonText}>
                    <span className={styles.storeButtonLabel}>Download on the</span>
                    <span className={styles.storeButtonName}>App Store</span>
                  </div>
                </button>

                <button 
                  className={`${styles.storeButton} ${styles.googleButton}`}
                  onClick={() => handleDownload(DOWNLOAD_URLS.android, 'android')}
                  aria-label="Get it on Google Play"
                >
                  <div className={styles.storeButtonIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className={styles.storeButtonText}>
                    <span className={styles.storeButtonLabel}>GET IT ON</span>
                    <span className={styles.storeButtonName}>Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className={styles.featuresSection}>
              <h3 className={styles.featuresTitle}>Why Choose EarlyJobs?</h3>
              
              <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                    </svg>
                  </div>
                  <h4 className={styles.featureTitle}>Verified Jobs</h4>
                  <p className={styles.featureDescription}>Access 100% verified job openings from trusted employers</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <h4 className={styles.featureTitle}>Jobs Near You</h4>
                  <p className={styles.featureDescription}>Find opportunities in your area with location-based search</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <h4 className={styles.featureTitle}>Easy Apply</h4>
                  <p className={styles.featureDescription}>One-tap applications with your profile. No lengthy forms</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5C12,17.5 15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z"/>
                    </svg>
                  </div>
                  <h4 className={styles.featureTitle}>Faster Callbacks</h4>
                  <p className={styles.featureDescription}>Get interview calls 3x faster than traditional job portals</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                    </svg>
                  </div>
                  <h4 className={styles.featureTitle}>Smart Matching</h4>
                  <p className={styles.featureDescription}>AI-powered job recommendations based on your profile</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                    </svg>
                  </div>
                  <h4 className={styles.featureTitle}>Career Growth</h4>
                  <p className={styles.featureDescription}>Track your applications and grow with personalized insights</p>
                </div>
              </div>
            </div>
          </main>

          <footer className={styles.footer}>
            <p className={styles.footerText}>&copy; 2024 EarlyJobs. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
