# JobShield AI - Complete Deployment Guide

## Overview

Your project has 3 components to deploy:
1. **Frontend** (React + Vite)
2. **Backend API** (Node.js + Express)  
3. **AI Service** (Python + Flask)
4. **Database** (MongoDB Atlas - Already set up)

---

## DEPLOYMENT ARCHITECTURE

```
User Browser
    ↓
Frontend (Vercel/Netlify/AWS S3)
    ↓
Backend API (Heroku/Railway/Render)
    ↓
MongoDB Atlas (Cloud Database)
    ↓
AI Service (Heroku/Railway/Render)
```

---

## OPTION 1: BUDGET FRIENDLY (FREE/CHEAP)

### 1.1 Deploy Frontend (FREE - Vercel or Netlify)

#### Using Vercel (Recommended - Easiest)

**Step 1:** Create account at https://vercel.com

**Step 2:** Install Vercel CLI
```bash
npm install -g vercel
```

**Step 3:** Build frontend
```bash
cd "c:\Users\tanis\Desktop\Seminar Project\client"
npm run build
```
This creates a `dist` folder with optimized files.

**Step 4:** Deploy
```bash
vercel
```
Follow prompts, select "client" folder → Done!

**You get:** https://your-project.vercel.app

**Environment Variables Needed:**
```
VITE_API_URL=https://your-backend.herokuapp.com/api
```

---

#### Using Netlify (Also Easy)

1. Go to https://netlify.com
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy!

**You get:** https://your-project.netlify.app

---

### 1.2 Deploy Backend (CHEAP - Render or Railway)

#### Using Render ($7/month - Most Reliable)

**Step 1:** Create account at https://render.com

**Step 2:** Create "New Web Service"

**Step 3:** Connect GitHub
- Select your repository
- Select `server` folder

**Step 4:** Configure
```
Name: fake-job-detector-backend
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free tier (or $7/month for production)
```

**Step 5:** Add Environment Variables
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_job_detector
JWT_SECRET=your_jwt_secret_change_in_production
NODE_ENV=production
```

**Step 6:** Deploy!

**You get:** https://fake-job-detector-backend.onrender.com

---

#### Using Railway ($5/month - Very Fast)

1. Go to https://railway.app
2. Create project
3. Connect GitHub
4. Select `server` folder
5. Add environment variables (same as above)
6. Deploy!

**You get:** https://your-backend-railway.up.railway.app

---

### 1.3 Deploy AI Service (CHEAP - Render or Railway)

Same process as backend:

**Step 1:** Create "New Web Service" on Render/Railway

**Step 2:** Configure
- Select `ai-service` folder
- Build Command: `pip install -r requirements.txt`
- Start Command: `python app.py`

**Step 3:** Add Environment Variables
```
FLASK_ENV=production
PORT=5000
```

**Step 4:** Deploy!

**You get:** https://fake-job-detector-ai.onrender.com

---

### 1.4 Update Frontend API URL

After backend is deployed, update frontend `.env`:

```
VITE_API_URL=https://fake-job-detector-backend.onrender.com/api
```

Redeploy frontend.

---

## OPTION 2: PROFESSIONAL DEPLOYMENT (AWS)

### 2.1 Frontend - AWS S3 + CloudFront

**Step 1:** Build frontend
```bash
cd client
npm run build
```

**Step 2:** Create S3 bucket
- AWS Console → S3 → Create bucket
- Enable "Static website hosting"
- Upload `dist` folder contents

**Step 3:** Set up CloudFront CDN
- CloudFront → Create distribution
- Point to S3 bucket
- Get URL: https://d123456.cloudfront.net

**Cost:** ~$1-5/month

---

### 2.2 Backend - AWS EC2 or Elastic Beanstalk

#### Using Elastic Beanstalk (Easiest AWS)

**Step 1:** Create Elastic Beanstalk app
- AWS Console → Elastic Beanstalk
- New environment → Node.js

**Step 2:** Prepare code
```bash
cd server
npm install
```

**Step 3:** Deploy
```bash
eb init
eb create fake-job-detector-env
eb deploy
```

**Step 4:** Add environment variables
```
eb setenv MONGODB_URI=your_mongodb_uri
eb setenv JWT_SECRET=your_secret
```

**You get:** https://fake-job-detector-env.elasticbeanstalk.com

**Cost:** ~$10-20/month

---

### 2.3 AI Service - AWS Lambda + API Gateway

**Step 1:** Package Flask app for Lambda

**Step 2:** Upload to Lambda

**Step 3:** Create API Gateway endpoint

**You get:** https://api-id.execute-api.us-east-1.amazonaws.com

**Cost:** ~$0.20/million requests

---

## STEP-BY-STEP RECOMMENDED PATH (CHEAPEST + RELIABLE)

### Total Cost: ~$12-15/month ($0 first month with free trial)

**1. Create Accounts:**
- [ ] Vercel (Frontend) - FREE
- [ ] Render (Backend + AI) - $7/month for performance tier
- [ ] MongoDB Atlas - FREE (already have)

**2. Build All Services:**

```bash
# Build Frontend
cd c:\Users\tanis\Desktop\Seminar Project\client
npm run build

# Verify Backend
cd c:\Users\tanis\Desktop\Seminar Project\server
npm install

# Verify AI Service
cd c:\Users\tanis\Desktop\Seminar Project\ai-service
pip install -r requirements.txt
```

**3. Deploy Backend First:**
- Go to Render.com → Create account
- Create Web Service from GitHub
- Select `server` folder
- Add MongoDB URI environment variable
- Deploy
- Copy backend URL (e.g., https://backend-xyz.onrender.com)

**4. Deploy AI Service:**
- Create another Web Service on Render
- Select `ai-service` folder
- Deploy
- Copy AI URL (e.g., https://ai-xyz.onrender.com)

**5. Update Frontend:**
```
# In client/.env.production
VITE_API_URL=https://backend-xyz.onrender.com/api
VITE_AI_URL=https://ai-xyz.onrender.com
```

**6. Deploy Frontend:**
- Go to Vercel.com → Create account
- Import GitHub repository
- Select `client` folder
- Add environment variables from above
- Deploy
- Get URL: https://your-project.vercel.app

**7. Test Everything:**
- Open https://your-project.vercel.app
- Login with credentials
- Test analysis form
- Verify data saves to MongoDB

---

## DOMAIN & SSL (Add Custom Domain)

### Add Custom Domain ($10-12/year)

1. **Buy domain** from Namecheap, GoDaddy, etc.
   - Example: fakejobdetector.com

2. **Point to Vercel:**
   - Vercel Dashboard → Add Domain
   - Update DNS records in domain provider
   - SSL auto-enabled in 24 hours

3. **Update Backend URLs:**
   ```
   https://api.fakejobdetector.com (Render)
   https://ai.fakejobdetector.com (Render)
   https://app.fakejobdetector.com (Vercel frontend)
   ```

---

## ENVIRONMENT VARIABLES SETUP

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-domain.com/api
VITE_AI_URL=https://your-ai-domain.com
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_job_detector
JWT_SECRET=change_this_to_random_string
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### AI Service (.env)
```
FLASK_ENV=production
PORT=5000
API_KEY=your_api_key
```

---

## DEPLOYMENT CHECKLIST

Before deploying, verify:

- [ ] All environment variables set correctly
- [ ] MongoDB connection working
- [ ] Frontend builds without errors
- [ ] Backend API responds on `/api/health`
- [ ] AI Service responds on `/health`
- [ ] CORS configured for frontend domain
- [ ] JWT Secret is strong (not default)
- [ ] No sensitive data in code
- [ ] Database migrations run
- [ ] Test user created in production DB

---

## MONITORING & MAINTENANCE

### After Deployment

**Monitor Backend:**
```
Render Dashboard → Logs
Look for error messages
Check CPU/Memory usage
```

**Monitor Frontend:**
```
Vercel Dashboard → Deployments
Real-time analytics
Error tracking
```

**Monitor Database:**
```
MongoDB Atlas → Monitoring
Connection status
Data usage
Query performance
```

---

## POST-DEPLOYMENT TESTING

1. **Test Frontend:**
   ```
   Open: https://your-frontend-domain
   Login: tanisha7@gmail.com / Tanisha@7
   Analyze: Use test job postings
   History: Verify data saved
   ```

2. **Test Backend API:**
   ```
   https://your-backend-domain/api/health
   Should return: {"success":true,"message":"API is healthy"}
   ```

3. **Test AI Service:**
   ```
   https://your-ai-domain/health
   Should return: {"status":"ok"}
   ```

---

## IMPORTANT PRODUCTION SETTINGS

### Before Going Live:

1. **Change JWT Secret:**
   ```
   Node.js: 
   JWT_SECRET=generate_random_string_with_openssl
   ```

2. **Enable HTTPS Everywhere:**
   - All services must use HTTPS
   - Update all URLs to https://

3. **Set up Backups:**
   - MongoDB Atlas: Enable automatic backups
   - Backend: Enable monitoring & alerting

4. **Security:**
   - Update CORS to only allow your domain
   - Set strong database passwords
   - Use environment variables for secrets
   - Enable rate limiting on API

5. **Scale if Needed:**
   - Start with free tier
   - Monitor usage
   - Upgrade if needed

---

## QUICK DEPLOYMENT SUMMARY

```
STEP 1: Build locally & test
cd server && npm install
cd client && npm run build
cd ai-service && pip install -r requirements.txt

STEP 2: Create accounts on Render + Vercel

STEP 3: Deploy backend on Render
Source: server/
Environment: Node.js
Start: npm start

STEP 4: Deploy AI on Render
Source: ai-service/
Environment: Python
Start: python app.py

STEP 5: Deploy frontend on Vercel
Source: client/
Environment variables: VITE_API_URL

STEP 6: Test everything
Open frontend URL & verify

STEP 7: Add custom domain (optional)
Configure DNS & SSL
```

---

## TROUBLESHOOTING DEPLOYMENT

| Problem | Solution |
|---------|----------|
| Frontend can't reach backend | Check CORS settings, verify backend URL, check API health |
| MongoDB connection failed | Verify URI in environment variables, check IP whitelist |
| AI service timeout | Increase timeout settings, check Python dependencies |
| SSL certificate error | Wait 24 hours after DNS update, clear browser cache |
| Environment variables not working | Redeploy after adding variables, verify case sensitivity |

---

## ESTIMATED DEPLOYMENT TIME

- Frontend (Vercel): 5-10 minutes
- Backend (Render): 10-15 minutes
- AI Service (Render): 10-15 minutes
- Domain setup: 24 hours (DNS propagation)

**Total: 30-40 minutes for initial deployment**

---

## COST BREAKDOWN

| Service | Free Tier | Paid | Notes |
|---------|-----------|------|-------|
| Frontend - Vercel | ✅ Unlimited | $20/mo | Use free tier |
| Backend - Render | ✅ Limited | $7/mo | Recommended for reliability |
| AI Service - Render | ✅ Limited | $7/mo | Same as backend |
| Database - MongoDB | ✅ 512MB | $10/mo+ | Free tier usually enough |
| Domain | ❌ | $10-12/yr | Optional |
| **TOTAL** | **FREE** | **$24-27/mo** | Start free, upgrade later |

---

## NEXT STEPS

1. Read this guide completely
2. Create accounts (takes 5 min)
3. Deploy backend & AI service (15 min)
4. Deploy frontend (10 min)
5. Test thoroughly
6. Share deployed URL with teacher!

---

## Need Help During Deployment?

**Common Issues & Fixes:**

**Frontend shows blank page:**
- Check browser console (F12)
- Verify VITE_API_URL is correct
- Rebuild and redeploy

**Backend returns 502 error:**
- Check Render logs
- Verify MongoDB URI is correct
- Check environment variables

**AI service doesn't respond:**
- Check Python installation
- Verify requirements.txt installed
- Check Flask port is 5000

---
