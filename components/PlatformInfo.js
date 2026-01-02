'use client';

import { detectPlatform } from '@/utils/platformDetector';
import styles from './PlatformInfo.module.css';

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
    <div className={styles.platformInfo}>
      <div className={styles.platformIcon}>{info.icon}</div>
      <div className={styles.platformDetails}>
        <h3 className={styles.platformName}>Detected: {info.name}</h3>
        <p className={styles.platformDescription}>{info.description}</p>
      </div>
    </div>
  );
};

export default PlatformInfo;

