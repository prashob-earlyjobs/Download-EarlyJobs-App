import React from 'react';
import { detectPlatform } from '../utils/platformDetector';
import './PlatformInfo.css';

const PlatformInfo = () => {
  const platform = detectPlatform();

  const getPlatformInfo = () => {
    switch (platform) {
      case 'android':
        return {
          name: 'Android',
          icon: '🤖',
          description: 'Get the EarlyJobs app from Google Play Store',
        };
      case 'ios':
        return {
          name: 'iOS',
          icon: '🍎',
          description: 'Get the EarlyJobs app from App Store',
        };
      case 'web':
      default:
        return {
          name: 'Web',
          icon: '🌐',
          description: 'Access EarlyJobs on the web',
        };
    }
  };

  const info = getPlatformInfo();

  return (
    <div className="platform-info">
      <div className="platform-icon">{info.icon}</div>
      <div className="platform-details">
        <h3 className="platform-name">Detected: {info.name}</h3>
        <p className="platform-description">{info.description}</p>
      </div>
    </div>
  );
};

export default PlatformInfo;

