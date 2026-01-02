/**
 * Marketing data storage utility
 * Stores user interaction data for marketing analytics using Next.js API routes
 */

import { detectPlatform } from './platformDetector';

const STORAGE_KEY = 'earlyjobs_session_id';

/**
 * Get or create session ID
 * @returns {string} Session ID
 */
const getSessionId = () => {
  if (typeof window === 'undefined') {
    return null; // Server-side
  }

  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    // Generate a simple session ID
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  return sessionId;
};

/**
 * Get stored marketing data from API
 * @returns {Promise<Object>} Marketing data object
 */
export const getMarketingData = async () => {
  try {
    const sessionId = getSessionId();
    if (!sessionId) return null;

    const response = await fetch(`/api/marketing/session/${sessionId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error reading marketing data:', error);
    return null;
  }
};

/**
 * Track user interaction
 * @param {string} action - Action type (e.g., 'download_clicked', 'page_visited')
 * @param {Object} additionalData - Additional data to track
 * @returns {Promise<boolean>} Success status
 */
export const trackInteraction = async (action, additionalData = {}) => {
  try {
    const sessionId = getSessionId();
    if (!sessionId) return false;

    const platform = detectPlatform();
    const referrerData = getReferrerData();

    const payload = {
      sessionId,
      platform,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      action,
      additionalData,
      ...referrerData,
    };

    const response = await fetch('/api/marketing/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle 204 No Content (aborted requests)
    if (response.status === 204) {
      return true; // Request was aborted, but that's okay
    }

    const result = await response.json();
    
    if (result.success && result.sessionId && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, result.sessionId);
    }
    
    return result.success;
  } catch (error) {
    // Ignore aborted requests (user navigated away, page refreshed, etc.)
    if (error.name === 'AbortError' || error.message === 'aborted') {
      return true; // Not a real error
    }
    console.error('Error tracking interaction:', error);
    return false;
  }
};

/**
 * Track download click
 * @param {string} downloadUrl - The download URL that was clicked
 * @returns {Promise<boolean>} Success status
 */
export const trackDownloadClick = async (downloadUrl) => {
  try {
    const sessionId = getSessionId();
    if (!sessionId) return false;

    const platform = detectPlatform();
    const referrerData = getReferrerData();

    const payload = {
      sessionId,
      platform,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      action: 'download_clicked',
      downloadUrl,
      additionalData: {
        downloadUrl,
        timestamp: new Date().toISOString(),
      },
      ...referrerData,
    };

    const response = await fetch('/api/marketing/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle 204 No Content (aborted requests)
    if (response.status === 204) {
      return true; // Request was aborted, but that's okay
    }

    const result = await response.json();
    
    if (result.success && result.sessionId && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, result.sessionId);
    }
    
    return result.success;
  } catch (error) {
    // Ignore aborted requests (user navigated away, page refreshed, etc.)
    if (error.name === 'AbortError' || error.message === 'aborted') {
      return true; // Not a real error
    }
    console.error('Error tracking download click:', error);
    return false;
  }
};

/**
 * Get user's referrer information
 * @returns {Object} Referrer data
 */
export const getReferrerData = () => {
  if (typeof window === 'undefined') {
    return {
      referrer: 'direct',
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    };
  }

  return {
    referrer: document.referrer || 'direct',
    utm_source: new URLSearchParams(window.location.search).get('utm_source'),
    utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
    utm_term: new URLSearchParams(window.location.search).get('utm_term'),
    utm_content: new URLSearchParams(window.location.search).get('utm_content'),
  };
};

/**
 * Initialize marketing data with referrer and initial visit
 */
export const initializeMarketingData = async () => {
  try {
    const referrerData = getReferrerData();
    const platform = detectPlatform();
    
    await trackInteraction('page_visited', {
      platform,
      ...referrerData,
    });
  } catch (error) {
    console.error('Error initializing marketing data:', error);
  }
};

