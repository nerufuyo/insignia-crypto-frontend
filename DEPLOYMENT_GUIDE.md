# Deployment Guide - Insignia Crypto Frontend

## Deploy to Vercel (Free Tier)

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

### Step 1: Prepare Repository
1. Push your code to GitHub:
   ```bash
   git push origin main
   ```

### Step 2: Deploy on Vercel

#### Option A: Using Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow prompts:
   - Set up and deploy? **Y**
   - Scope: Select your account
   - Link to existing project? **N**
   - Project name: **insignia-crypto-frontend**
   - Directory: **./** (press Enter)
   - Override settings? **N**

5. Deploy to production:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `insignia-crypto-frontend` repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add environment variables:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app`

6. Click "Deploy"

### Step 3: Update Backend URL
After backend is deployed, update the environment variable:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Edit `VITE_API_URL` to your Railway backend URL
4. Redeploy (Vercel will auto-redeploy on variable change)

### Step 4: Configure Custom Domain (Optional)
1. Go to project settings → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

### Important Notes
- Vercel free tier includes:
  - 100GB bandwidth/month
  - Unlimited websites
  - Automatic SSL
  - Global CDN
  - Automatic deployments from Git

- Environment variables are built into the app at build time
- Each git push to main branch triggers automatic deployment

### Monitoring
- View deployments: https://vercel.com/dashboard
- Check logs in deployment details
- Analytics available in dashboard

### Environment Variables Required
```
VITE_API_URL=https://your-backend-url.railway.app
```

## Alternative: Deploy to Netlify

### Steps:
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)

5. Add environment variables:
   - `VITE_API_URL` = your backend URL

6. Click "Deploy site"

### Netlify Configuration File
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Alternative: Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/insignia-crypto-frontend"
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/insignia-crypto-frontend/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Testing Deployment
Once deployed, verify:
1. Open the Vercel URL
2. Try logging in
3. Check browser console for errors
4. Verify API calls are reaching backend

## Troubleshooting

### CORS Errors
Ensure backend has CORS enabled for your Vercel domain:
```typescript
// main.ts
app.enableCors({
  origin: ['https://your-app.vercel.app', 'http://localhost:5173'],
  credentials: true,
});
```

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript compiles without errors

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check backend is deployed and running
- Test backend API directly with curl/Postman

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Redeploy after changing environment variables
- Variables are built into the app at build time

### Routing Issues (404 on refresh)
- Ensure `vercel.json` has rewrite rules
- Or use Netlify's `_redirects` file
- Configure SPA fallback to index.html
