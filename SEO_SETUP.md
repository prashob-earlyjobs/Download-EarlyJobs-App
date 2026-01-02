# SEO Setup Guide

This project includes comprehensive SEO optimization with Open Graph images, structured data, and meta tags.

## Features Implemented

✅ **Meta Tags**
- Title and description
- Keywords
- Author and publisher information
- Canonical URLs

✅ **Open Graph Tags**
- OG title, description, and image
- OG type and locale
- Site name

✅ **Twitter Card Tags**
- Large image card
- Title and description
- Creator and site handles

✅ **Structured Data (JSON-LD)**
- WebApplication schema
- Rating information
- Feature list

✅ **Dynamic OG Image**
- Generated at `/og-image` route
- 1200x630px (standard OG image size)
- Gradient background matching brand colors

✅ **Sitemap & Robots.txt**
- Automatic sitemap generation
- Robots.txt configuration

## Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://app.earlyjobs.ai
```

This URL is used for:
- Open Graph images
- Canonical URLs
- Sitemap generation
- Structured data

## OG Image

The OG image is dynamically generated at `/og-image` route using Next.js ImageResponse API.

### Customizing the OG Image

Edit `app/og-image/route.js` to customize:
- Colors
- Text
- Layout
- Logo/images

### Using a Static OG Image

If you prefer a static image:

1. Create an image (1200x630px) and save it as `public/og-image.png`
2. Update `app/layout.js` to use the static image:
   ```javascript
   images: [
     {
       url: '/og-image.png',
       width: 1200,
       height: 630,
       alt: 'EarlyJobs - Download App',
     },
   ],
   ```

## Testing SEO

### 1. Test Meta Tags
- View page source and check `<head>` section
- Use browser dev tools to inspect meta tags

### 2. Test Open Graph
- Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Test Twitter Cards
- Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 4. Test Structured Data
- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Use [Schema.org Validator](https://validator.schema.org/)

### 5. Test Sitemap
- Visit `https://yourdomain.com/sitemap.xml`
- Check robots.txt at `https://yourdomain.com/robots.txt`

## Customization

### Update Site Information

Edit `app/layout.js` to update:
- Site name
- Description
- Keywords
- Social media handles
- Verification codes

### Update Structured Data

Edit `components/SEOHead.js` to customize:
- Application details
- Ratings
- Features
- Offers

## Verification Codes

Add verification codes in `app/layout.js`:

```javascript
verification: {
  google: 'your-google-verification-code',
  yandex: 'your-yandex-verification-code',
  bing: 'your-bing-verification-code',
},
```

## Social Media Handles

Update Twitter handles in `app/layout.js`:

```javascript
twitter: {
  creator: '@earlyjobs',
  site: '@earlyjobs',
},
```

## Best Practices

1. **Keep descriptions under 160 characters** for optimal display
2. **Use high-quality images** (1200x630px minimum for OG images)
3. **Update sitemap regularly** when adding new pages
4. **Test on multiple platforms** (Facebook, Twitter, LinkedIn)
5. **Monitor search console** for SEO performance

