# Railway Deployment Guide for BloomTrack

## What's Configured:
- ✅ Backend (Node.js/Express) - Ready for Railway
- ✅ Frontend (React) - Ready for Netlify
- ✅ In-memory database working (no MongoDB needed for testing)

## Deployment Steps:

### Step 1: Push Code to GitHub
1. Install Git from: https://git-scm.com/download/win
2. Create a GitHub account at https://github.com
3. Create a new repository named `bloomtrack`
4. In your project folder (BloomTrack), run:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bloomtrack.git
git push -u origin main
```

### Step 2: Deploy Backend to Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select the `bloomtrack` repository
6. Click "Deploy"
7. Wait for Railway to start the build

### Step 3: Configure Environment Variables on Railway
1. In Railway dashboard, go to your project
2. Click on the service
3. Go to "Variables" tab
4. Add these variables:
   - `PORT=5000` (Railway will assign one automatically, but set this)
   - `MONGODB_URI=mongodb://localhost:27017/bloomtrack` (or add a MongoDB service)
   - `JWT_SECRET=7ELz7nNLrIuRdkna`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-netlify-domain.netlify.app`

### Step 4: Deploy Frontend to Netlify
1. Go to https://netlify.com
2. Click "Add new site"
3. Select "Deploy manually"
4. Drag and drop the `frontend/build` folder
5. OR: Connect GitHub and select the repository
6. Once deployed, update your backend CLIENT_URL variable

### Step 5: Update API URL in Frontend
Edit `frontend/.env`:
```
REACT_APP_API_URL=https://your-railway-backend-url
```

Then rebuild and redeploy frontend.

## To Verify Deployment:
- Backend running at: https://your-railway-app.up.railway.app
- Frontend running at: https://your-site.netlify.app

## Need Help?
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
