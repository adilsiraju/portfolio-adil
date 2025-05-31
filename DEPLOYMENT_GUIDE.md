# 🚀 Vercel Deployment Guide

## Step-by-Step Deployment Instructions

### 📋 Prerequisites
- GitHub account with your portfolio repository
- Vercel account (free tier is sufficient)

---

## 🌐 **STEP 1: Deploy to Vercel**

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select: `adilsiraju/portfolio-adil`
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `portfolio-adil` (or your preferred name)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `portfolio/` 
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# ? Set up and deploy "portfolio"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? portfolio-adil
# ? In which directory is your code located? ./
```

---

## 🗄️ **STEP 2: Set Up Vercel KV Database**

### 1. **Create KV Database**
   - In your Vercel dashboard, go to your project
   - Click on the "Storage" tab
   - Click "Create Database"
   - Select "KV" (Key-Value store)
   - **Database Name**: `portfolio-kv` (or your choice)
   - **Region**: Choose closest to your target audience
   - Click "Create"

### 2. **Get Environment Variables**
   - After KV database is created, go to the database settings
   - Copy the environment variables shown:
     ```
     KV_URL=redis://...
     KV_REST_API_URL=https://...
     KV_REST_API_TOKEN=...
     KV_REST_API_READ_ONLY_TOKEN=...
     ```

---

## ⚙️ **STEP 3: Configure Environment Variables**

### 1. **Add to Vercel Project**
   - In your Vercel project dashboard
   - Go to "Settings" → "Environment Variables"
   - Add each KV variable:

   | **Name** | **Value** | **Environment** |
   |----------|-----------|-----------------|
   | `KV_URL` | `redis://...` | Production, Preview, Development |
   | `KV_REST_API_URL` | `https://...` | Production, Preview, Development |
   | `KV_REST_API_TOKEN` | `AXX...` | Production, Preview, Development |
   | `KV_REST_API_READ_ONLY_TOKEN` | `ASX...` | Production, Preview, Development |

### 2. **For Local Development** (Optional)
   - Create `.env.local` in your project root:
   ```bash
   # Add the same KV variables here for local testing
   KV_URL=redis://...
   KV_REST_API_URL=https://...
   KV_REST_API_TOKEN=...
   KV_REST_API_READ_ONLY_TOKEN=...
   ```

---

## 🔄 **STEP 4: Redeploy with Environment Variables**

After adding environment variables:
1. Go to "Deployments" tab in your Vercel project
2. Click "..." on the latest deployment
3. Select "Redeploy"
4. Check "Use existing Build Cache" for faster deployment
5. Click "Redeploy"

---

## ✅ **STEP 5: Test Your Live Portfolio**

### 1. **Test Contact Form**
   - Visit your live URL: `https://your-project.vercel.app`
   - Navigate to the contact section
   - Fill out and submit the form
   - You should see a success toast notification

### 2. **Test Admin Dashboard**
   - Visit: `https://your-project.vercel.app/admin`
   - Check if you can see contact submissions and analytics

### 3. **Test Analytics**
   - Navigate through different sections
   - Click on projects, social links, etc.
   - Check the admin dashboard for recorded events

---

## 🎯 **Your Portfolio URLs**

After deployment, you'll have:
- **Main Portfolio**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`
- **Contact API**: `https://your-project.vercel.app/api/contact`
- **Analytics API**: `https://your-project.vercel.app/api/analytics`

---

## 🔧 **Troubleshooting**

### Common Issues:

1. **"Function timeout" errors**
   - KV environment variables not set correctly
   - Check environment variable names match exactly

2. **"Module not found" errors**
   - Run `npm install` locally and commit package-lock.json
   - Redeploy

3. **API routes not working**
   - Ensure you're using the correct project structure
   - Check build logs in Vercel dashboard

### Build Configuration Issues:
If you encounter build issues, add this to your `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

---

## 🎉 **Success Checklist**

- [ ] Portfolio deployed to Vercel
- [ ] KV database created and connected
- [ ] Environment variables configured
- [ ] Contact form working (submissions saved to KV)
- [ ] Analytics tracking events
- [ ] Admin dashboard accessible
- [ ] Custom domain configured (optional)

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test APIs individually using the browser or Postman
4. Check the browser console for any JavaScript errors

Your portfolio is now a full-stack application with professional backend capabilities! 🎊
