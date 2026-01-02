import React from 'react';
import { detectPlatform, getDownloadUrl } from '../utils/platformDetector';
import { trackDownloadClick } from '../utils/marketingData';
import './DownloadButton.css';

const DownloadButton = ({ 
  androidUrl = 'https://play.google.com/store/apps/details?id=com.victaman.earlyjobs&hl=en_IN',
  iosUrl = 'https://apps.apple.com/in/app/earlyjobs-ai/id6754554572',
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
      className="download-button" 
      onClick={handleDownload}
      aria-label={getButtonText()}
    >
      <span className="button-icon">{getButtonIcon()}</span>
      <span className="button-text">{getButtonText()}</span>
    </button>
  );
};

export default DownloadButton;

