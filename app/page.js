'use client';

import { useEffect, useState } from 'react';
import { initializeMarketingData, trackDownloadClick } from '@/utils/marketingData';
import { detectPlatform, getDownloadUrl } from '@/utils/platformDetector';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import styles from './page.module.css';

const DOWNLOAD_URLS = {
  android: 'https://play.google.com/store/apps/details?id=com.earlyjobs',
  ios: 'https://apps.apple.com/app/earlyjobs',
  web: 'https://earlyjobs.ai',
};

export default function Home() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Initialize marketing data tracking
    initializeMarketingData();

    // Show redirecting animation after a short delay
    const showRedirectingTimer = setTimeout(() => {
      setIsRedirecting(true);
    }, 800); // Show "Redirecting..." after 0.8 seconds

    // Auto-navigate after a short delay to allow page to render
    const redirectTimer = setTimeout(() => {
      const platform = detectPlatform();
      const downloadUrl = getDownloadUrl(DOWNLOAD_URLS);
      
      // Track the auto-redirect
      trackDownloadClick(downloadUrl);
      
      // Navigate automatically
      window.location.href = downloadUrl;
    }, 1500); // 1.5 second delay to allow page to load and show logo

    return () => {
      clearTimeout(showRedirectingTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  const handleManualClick = async () => {
    const platform = detectPlatform();
    const downloadUrl = getDownloadUrl(DOWNLOAD_URLS);
    
    await trackDownloadClick(downloadUrl);
    window.location.href = downloadUrl;
  };

  const getButtonText = () => {
    const platform = detectPlatform();
    switch (platform) {
      case 'android':
        return 'Download on Google Play';
      case 'ios':
        return 'Download on App Store';
      case 'web':
      default:
        return 'Continue to App';
    }
  };

  return (
    <>
      <SEOHead />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo512.png"
              alt="EarlyJobs Logo"
              width={200}
              height={200}
              priority
              className={styles.logo}
            />
          </div>
          
          <div className={styles.buttonContainer}>
            {isRedirecting && (
              <div className={styles.redirectingText}>
                <span className={styles.spinner}></span>
                <span>Redirecting...</span>
              </div>
            )}
            <button 
              className={`${styles.downloadButton} ${isRedirecting ? styles.redirecting : ''}`}
              onClick={handleManualClick}
              aria-label={getButtonText()}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
