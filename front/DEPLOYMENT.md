# Deployment Guide

## 🚀 Deployment Options

### 1. Vercel (Recommended)

#### Quick Deploy
```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel
```

#### Or use the Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will auto-detect Vite and configure everything
4. Click "Deploy"

**Environment Variables:**
Add any needed environment variables in Project Settings > Environment Variables

---

### 2. Netlify

#### Deploy via CLI:
```bash
# Install Netlify CLI
pnpm install -g netlify-cli

# Build
pnpm build

# Deploy
netlify deploy --prod
```

#### Or use Netlify Dashboard:
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your Git repository

**Build Settings:**
- Build command: `pnpm build`
- Publish directory: `dist`

---

### 3. GitHub Pages

#### Setup:
```bash
# Install gh-pages
pnpm install -D gh-pages

# Add to package.json scripts:
"predeploy": "pnpm build",
"deploy": "gh-pages -d dist"

# Update vite.config.ts - add base:
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})

# Deploy
pnpm run deploy
```

---

### 4. AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" > "Host web app"
3. Connect your Git repository
4. Configure build settings:
   - Build command: `pnpm build`
   - Output directory: `dist`
5. Deploy

---

### 5. Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your Git repository
3. Configure:
   - Framework preset: Vite
   - Build command: `pnpm build`
   - Build output directory: `dist`
4. Deploy

---

## 🔧 Pre-Deployment Checklist

### 1. Update Content
- [ ] Replace mock data in `/src/data/mockData.ts`
- [ ] Add your personal information
- [ ] Update project descriptions and links
- [ ] Add real certificate information
- [ ] Update blog posts with your content

### 2. Update Images
- [ ] Replace placeholder images with your own
- [ ] Optimize images (compress, resize)
- [ ] Use appropriate image formats (WebP, AVIF)

### 3. SEO & Meta Tags
- [ ] Add proper title and meta descriptions
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create a favicon
- [ ] Add a robots.txt file

### 4. Performance
- [ ] Run `pnpm build` and check bundle size
- [ ] Test on slow networks
- [ ] Enable compression (most hosts do this automatically)
- [ ] Optimize fonts

### 5. Testing
- [ ] Test all pages
- [ ] Test all three languages
- [ ] Test dark mode
- [ ] Test on mobile devices
- [ ] Test chatbot functionality
- [ ] Check console for errors

### 6. Analytics (Optional)
- [ ] Add Google Analytics
- [ ] Add other tracking tools
- [ ] Monitor performance

### 7. Security
- [ ] Ensure no API keys in code
- [ ] Check for sensitive information
- [ ] Enable HTTPS (most platforms do this automatically)

---

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
pnpm build
pnpm dlx vite-bundle-visualizer
```

### Image Optimization
Use services like:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

### Code Splitting
Already implemented via React Router lazy loading (if you want to add it):
```typescript
const HomePage = lazy(() => import('./pages/home-page'));
```

---

## 🌐 Custom Domain

### Vercel:
1. Go to Project Settings > Domains
2. Add your domain
3. Follow DNS configuration instructions

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

### Cloudflare Pages:
1. Go to Custom Domains
2. Add domain
3. Cloudflare handles DNS automatically if domain is managed by them

---

## 🔄 CI/CD

### GitHub Actions Example:
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - uses: pnpm/action-setup@v2
      with:
        version: 8
    
    - uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'pnpm'
    
    - run: pnpm install
    - run: pnpm build
    
    # Deploy to your platform
    # Add your deployment step here
```

---

## 🐛 Troubleshooting

### Build Fails
- Check Node version (need v18+)
- Clear cache: `rm -rf node_modules .vite dist`
- Reinstall: `pnpm install`

### 404 on Routes
Add a `_redirects` file (Netlify) or `vercel.json` (Vercel):

**Netlify `_redirects`:**
```
/*  /index.html  200
```

**Vercel `vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Images Not Loading
- Check image paths
- Ensure images are in `public` folder or properly imported
- Check console for 404 errors

### Dark Mode Not Working
- Check if theme preference is saved in localStorage
- Test the theme toggle
- Check CSS classes in browser dev tools

---

## 📝 Post-Deployment

### Monitor:
- [ ] Check Google Search Console
- [ ] Monitor analytics
- [ ] Check Lighthouse scores
- [ ] Monitor error tracking (if implemented)

### Maintain:
- [ ] Update content regularly
- [ ] Keep dependencies updated
- [ ] Monitor security vulnerabilities
- [ ] Backup your data

---

## 🎉 Success!

Your portfolio is now live! Share it on:
- LinkedIn
- Twitter/X
- GitHub profile
- Resume/CV
- Professional networks

---

Need help? Check:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/start/tutorial#deploying)
- Platform-specific documentation

Good luck with your cybersecurity career! 🔒
