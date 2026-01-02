/**
 * Detects the user's platform (Android, iOS, or Web)
 * @returns {string} 'android' | 'ios' | 'web'
 */
export const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Android detection
  if (/android/i.test(userAgent)) {
    return 'android';
  }

  // iOS detection (iPhone, iPad, iPod)
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }

  // Default to web
  return 'web';
};

/**
 * Gets the appropriate download URL based on platform
 * @param {Object} config - Configuration object with download URLs
 * @param {string} config.androidUrl - Play Store URL
 * @param {string} config.iosUrl - App Store URL
 * @param {string} config.webUrl - Web application URL
 * @returns {string} The appropriate download URL
 */
export const getDownloadUrl = (config) => {
  const platform = detectPlatform();
  
  switch (platform) {
    case 'android':
      return config.androidUrl || 'https://play.google.com/store/apps/details?id=com.victaman.earlyjobs&hl=en_IN';
    case 'ios':
      return config.iosUrl || 'https://apps.apple.com/in/app/earlyjobs-ai/id6754554572';
    case 'web':
    default:
      return config.webUrl || 'https://earlyjobs.ai';
  }
};

