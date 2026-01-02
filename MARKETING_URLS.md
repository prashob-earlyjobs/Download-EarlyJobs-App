# Sample Marketing URLs with Tracking Parameters

This document provides sample URLs with marketing data parameters for testing the tracking functionality.

## Base URL
```
https://app.earlyjobs.ai
```

## Sample URLs with Marketing Parameters

### 1. Google Ads Campaign
```
https://app.earlyjobs.ai/?utm_source=google&utm_medium=cpc&utm_campaign=early_careers_q1&utm_term=job_search&utm_content=ad_variant_a
```

**Marketing Data Tracked:**
- Source: `google`
- Medium: `cpc` (cost per click)
- Campaign: `early_careers_q1`
- Term: `job_search`
- Content: `ad_variant_a`

---

### 2. Facebook Social Media Campaign
```
https://app.earlyjobs.ai/?utm_source=facebook&utm_medium=social&utm_campaign=summer_internship_2024&utm_content=video_ad
```

**Marketing Data Tracked:**
- Source: `facebook`
- Medium: `social`
- Campaign: `summer_internship_2024`
- Content: `video_ad`

---

### 3. Email Newsletter Campaign
```
https://app.earlyjobs.ai/?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest&utm_content=cta_button
```

**Marketing Data Tracked:**
- Source: `newsletter`
- Medium: `email`
- Campaign: `weekly_digest`
- Content: `cta_button`

---

### 4. LinkedIn Organic Post
```
https://app.earlyjobs.ai/?utm_source=linkedin&utm_medium=social&utm_campaign=organic_post&utm_content=career_tips
```

**Marketing Data Tracked:**
- Source: `linkedin`
- Medium: `social`
- Campaign: `organic_post`
- Content: `career_tips`

---

### 5. Referral Program
```
https://app.earlyjobs.ai/?utm_source=referral&utm_medium=referral&utm_campaign=friend_referral&utm_content=user_12345
```

**Marketing Data Tracked:**
- Source: `referral`
- Medium: `referral`
- Campaign: `friend_referral`
- Content: `user_12345` (referrer user ID)

---

### 6. Instagram Story Ad
```
https://app.earlyjobs.ai/?utm_source=instagram&utm_medium=social&utm_campaign=story_ad&utm_content=swipe_up
```

**Marketing Data Tracked:**
- Source: `instagram`
- Medium: `social`
- Campaign: `story_ad`
- Content: `swipe_up`

---

### 7. YouTube Video Description
```
https://app.earlyjobs.ai/?utm_source=youtube&utm_medium=video&utm_campaign=career_advice_series&utm_content=video_description_link
```

**Marketing Data Tracked:**
- Source: `youtube`
- Medium: `video`
- Campaign: `career_advice_series`
- Content: `video_description_link`

---

### 8. Partner Website
```
https://app.earlyjobs.ai/?utm_source=partner_site&utm_medium=referral&utm_campaign=university_partnership&utm_content=career_center
```

**Marketing Data Tracked:**
- Source: `partner_site`
- Medium: `referral`
- Campaign: `university_partnership`
- Content: `career_center`

---

### 9. Direct Mail QR Code
```
https://app.earlyjobs.ai/?utm_source=direct_mail&utm_medium=print&utm_campaign=college_flyer&utm_content=qr_code
```

**Marketing Data Tracked:**
- Source: `direct_mail`
- Medium: `print`
- Campaign: `college_flyer`
- Content: `qr_code`

---

### 10. Affiliate Marketing
```
https://app.earlyjobs.ai/?utm_source=affiliate&utm_medium=affiliate&utm_campaign=blogger_partnership&utm_content=affiliate_123&utm_term=career_blog
```

**Marketing Data Tracked:**
- Source: `affiliate`
- Medium: `affiliate`
- Campaign: `blogger_partnership`
- Content: `affiliate_123`
- Term: `career_blog`

---

## Testing Different Platforms

### Android Device
When accessed from an Android device, the app will:
- Detect platform: `android`
- Redirect to: `https://play.google.com/store/apps/details?id=com.victaman.earlyjobs&hl=en_IN`
- Track all UTM parameters

### iOS Device
When accessed from an iOS device, the app will:
- Detect platform: `ios`
- Redirect to: `https://apps.apple.com/in/app/earlyjobs-ai/id6754554572`
- Track all UTM parameters

### Web Browser
When accessed from a web browser, the app will:
- Detect platform: `web`
- Redirect to: `https://earlyjobs.ai`
- Track all UTM parameters

---

## What Gets Tracked

For each visit, the following data is stored in MongoDB:

1. **Session Information**
   - Unique session ID
   - User ID (if available)

2. **Platform Detection**
   - Platform type (android/ios/web)
   - User agent string

3. **Referrer Information**
   - HTTP referrer header
   - UTM parameters:
     - `utm_source` - Traffic source
     - `utm_medium` - Marketing medium
     - `utm_campaign` - Campaign name
     - `utm_term` - Campaign term/keyword
     - `utm_content` - Content identifier

4. **Visit Tracking**
   - First visit timestamp
   - Last visit timestamp
   - Visit count

5. **Interactions**
   - Page visits
   - Download clicks
   - Timestamps for each action

6. **IP Address**
   - Client IP address (for analytics)

---

## Example: Complete Tracking Flow

1. User clicks link: `https://app.earlyjobs.ai/?utm_source=google&utm_medium=cpc&utm_campaign=early_careers_q1`

2. App loads and:
   - Detects platform (e.g., Android)
   - Tracks marketing data:
     ```json
     {
       "platform": "android",
       "utm_source": "google",
       "utm_medium": "cpc",
       "utm_campaign": "early_careers_q1",
       "referrer": "https://www.google.com/",
       "firstVisit": "2024-01-15T10:30:00Z",
       "interactions": [
         {
           "action": "page_visited",
           "timestamp": "2024-01-15T10:30:00Z"
         }
       ]
     }
     ```

3. After 1.5 seconds:
   - Auto-redirects to Google Play Store
   - Tracks download click:
     ```json
     {
       "action": "download_clicked",
       "downloadUrl": "https://play.google.com/store/apps/details?id=com.victaman.earlyjobs&hl=en_IN",
       "timestamp": "2024-01-15T10:30:01Z"
     }
     ```

---

## Viewing Tracked Data

### API Endpoints

1. **Get Session Data**
   ```
   GET /api/marketing/session/{sessionId}
   ```

2. **Get Analytics**
   ```
   GET /api/marketing/analytics
   ```

3. **Track Interaction**
   ```
   POST /api/marketing/track
   ```

---

## Best Practices

1. **Consistent Naming**: Use consistent naming conventions for UTM parameters
2. **Lowercase**: Use lowercase for all UTM values
3. **No Spaces**: Use underscores or hyphens instead of spaces
4. **Descriptive**: Make campaign names descriptive and meaningful
5. **Track Everything**: Include UTM parameters in all marketing links

---

## Quick Test URLs

Copy and paste these URLs in your browser to test:

**Google Ads:**
```
https://app.earlyjobs.ai/?utm_source=google&utm_medium=cpc&utm_campaign=test_campaign
```

**Facebook:**
```
https://app.earlyjobs.ai/?utm_source=facebook&utm_medium=social&utm_campaign=test_campaign
```

**Email:**
```
https://app.earlyjobs.ai/?utm_source=email&utm_medium=email&utm_campaign=test_campaign
```

**Direct (No Parameters):**
```
https://app.earlyjobs.ai
```

