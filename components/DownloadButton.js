'use client';

import { detectPlatform, getDownloadUrl } from '@/utils/platformDetector';
import { trackDownloadClick } from '@/utils/marketingData';
import styles from './DownloadButton.module.css';

const DownloadButton = ({ 
  androidUrl = 'https://play.google.com/store/apps/details?id=com.earlyjobs',
  iosUrl = 'https://apps.apple.com/app/earlyjobs',
  webUrl = 'https://earlyjobs.ai'
}) => {
  const platform = detectPlatform();
  const downloadUrl = getDownloadUrl({ androidUrl, iosUrl, webUrl });

  const handleDownload = async () => {
    // Track the download click
    await trackDownloadClick(downloadUrl);

    // Navigate to download URL
    window.location.href = downloadUrl;
  };

  const getButtonText = () => {
    switch (platform) {
      case 'android':
        return 'Download on Google Play';
      case 'ios':
        return 'Download on App Store';
      case 'web':
      default:
        return 'Visit Web App';
    }
  };

  const getButtonIcon = () => {
    switch (platform) {
      case 'android':
        return '🤖';
      case 'ios':
        return '🍎';
      case 'web':
      default:
        return '🌐';
    }
  };

  return (
    <button 
      className={styles.downloadButton} 
      onClick={handleDownload}
      aria-label={getButtonText()}
    >
      <span className={styles.buttonIcon}>{getButtonIcon()}</span>
      <span className={styles.buttonText}>{getButtonText()}</span>
    </button>
  );
};

export default DownloadButton;

