/**
 * Marketing data storage utility
 * Stores user interaction data for marketing analytics using MongoDB via API
 */

import { detectPlatform } from './platformDetector';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/marketing';
const STORAGE_KEY = 'earlyjobs_session_id';

/**
 * Get or create session ID
 * @returns {string} Session ID
 */
const getSessionId = () => {
  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    // Generate a simple session ID (in production, you might want to use a proper UUID library)
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
    const response = await fetch(`${API_BASE_URL}/session/${sessionId}`);
    
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
 * Store marketing data via API
 * @param {Object} data - Marketing data to store
 * @returns {Promise<boolean>} Success status
 */
export const storeMarketingData = async (data) => {
  try {
    const sessionId = getSessionId();
    const platform = data.platform || detectPlatform();
    const referrerData = getReferrerData();

    const payload = {
      sessionId,
      platform,
      userAgent: navigator.userAgent,
      ...referrerData,
      ...data,
    };

    const response = await fetch(`${API_BASE_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (result.success && result.sessionId) {
      localStorage.setItem(STORAGE_KEY, result.sessionId);
    }
    
    return result.success;
  } catch (error) {
    console.error('Error storing marketing data:', error);
    return false;
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
    const platform = detectPlatform();
    const referrerData = getReferrerData();

    const payload = {
      sessionId,
      platform,
      userAgent: navigator.userAgent,
      action,
      additionalData,
      ...referrerData,
    };

    const response = await fetch(`${API_BASE_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (result.success && result.sessionId) {
      localStorage.setItem(STORAGE_KEY, result.sessionId);
    }
    
    return result.success;
  } catch (error) {
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
    const platform = detectPlatform();
    const referrerData = getReferrerData();

    const payload = {
      sessionId,
      platform,
      userAgent: navigator.userAgent,
      action: 'download_clicked',
      downloadUrl,
      additionalData: {
        downloadUrl,
        timestamp: new Date().toISOString(),
      },
      ...referrerData,
    };

    const response = await fetch(`${API_BASE_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (result.success && result.sessionId) {
      localStorage.setItem(STORAGE_KEY, result.sessionId);
    }
    
    return result.success;
  } catch (error) {
    console.error('Error tracking download click:', error);
    return false;
  }
};

/**
 * Get user's referrer information
 * @returns {Object} Referrer data
 */
export const getReferrerData = () => {
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

