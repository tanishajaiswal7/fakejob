# Deployment Guide - FakeJobDetector

## 🚀 Production Deployment

This guide covers deploying FakeJobDetector to production.

## Prerequisites

- MongoDB Atlas account (free tier available)
- Vercel account (for frontend)
- Render or Railway account (for backend)

---

## 📦 Part 1: Backend Deployment (Node.js + Express)

### Option A: Deploy to Render

1. **Prepare Repository**
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create Procfile** (server/Procfile)
   ```
   web: node index.js
   ```

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/your-username/fake-job-detector.git
   git push -u origin main
   ```

4. **Deploy on Render**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` directory
   - Set environment variables:
     - `PORT`: 5000
     - `MONGODB_URI`: Your MongoDB connection string
     - `AI_SERVICE_URL`: Your AI service URL
     - `NODE_ENV`: production

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your backend URL will be something like: `https://your-app.onrender.com`

### Option B: Deploy to Railway

1. **Push to GitHub** (same as above)

2. **Deploy on Railway**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Configure environment variables
   - Deploy

### Environment Variables for Backend

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_job_detector
AI_SERVICE_URL=https://your-ai-service.onrender.com
NODE_ENV=production
```

---

## 🐍 Part 2: AI Service Deployment

### Option A: Deploy to Render

1. **Prepare Repository** (ai-service/)

2. **Create Procfile** (ai-service/Procfile)
   ```
   web: gunicorn app:app --bind 0.0.0.0:$PORT
   ```

3. **Update requirements.txt** (add gunicorn)
   ```
   Flask==2.3.2
   Flask-CORS==4.0.0
   scikit-learn==1.3.0
   numpy==1.24.3
   pandas==2.0.3
   spacy==3.6.0
   python-dotenv==1.0.0
   gunicorn==21.2.0
   ```

4. **Deploy on Render**
   - Create new Web Service
   - Set Runtime: Python 3
   - Set environment variables:
     - `AI_PORT`: 5001
     - `FLASK_ENV`: production
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`

5. **Get URL**: `https://your-ai-service.onrender.com`

### Mark Procfile

- Create Procfile with proper format
- Ensure both services have proper startup commands

---

## 🎨 Part 3: Frontend Deployment

### Deploy to Vercel

1. **Prepare Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Create .env.production.local**
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - Framework: Vite
     - Root Directory: client
     - Build Command: npm run build
     - Output Directory: dist

4. **Environment Variables in Vercel**
   - Add `VITE_API_URL` with your backend URL

5. **Deploy** and get your frontend URL: `https://your-app.vercel.app`

### Alternative: Deploy to Netlify

1. **Build Frontend**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `dist` folder
   - OR connect GitHub for auto-deployment

---

## 🗄️ Part 4: MongoDB Setup

### Create MongoDB Atlas Cluster

1. **Sign Up**: https://www.mongodb.com/cloud/atlas

2. **Create Cluster**:
   - Click "Create Cluster"
   - Select Free tier
   - Choose nearest region
   - Create cluster

3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate strong password
   - Click "Add User"

4. **Get Connection String**:
   - Go to "Clusters"
   - Click "Connect"
   - Select "Drivers"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<database>`

5. **Example Connection String**:
   ```
   mongodb+srv://admin:password123@cluster0.abc123.mongodb.net/fake_job_detector?retryWrites=true&w=majority
   ```

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] All environment variables configured
- [ ] MongoDB cluster created
- [ ] Tests passing locally
- [ ] Code committed to GitHub
- [ ] .env files added to .gitignore

### After Backend Deployment
- [ ] Test API endpoints manually
- [ ] Verify MongoDB connection
- [ ] Check error logs
- [ ] Monitor application

### After AI Service Deployment
- [ ] Test `/health` endpoint
- [ ] Test `/predict` endpoint
- [ ] Verify model loads correctly
- [ ] Monitor performance

### After Frontend Deployment
- [ ] Test all pages
- [ ] Verify API connectivity
- [ ] Test on mobile devices
- [ ] Check performance metrics

---

## 🔗 Connecting Services

Update the following after deployment:

**Backend (.env on Render)**:
```env
AI_SERVICE_URL=https://your-ai-service.onrender.com
```

**Frontend (in Vercel)**:
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 📊 Monitoring

### Render Dashboard
- View logs and metrics
- Configure auto-restart
- Monitor resource usage

### Vercel Analytics
- Performance metrics
- Deployment history
- Error tracking

### MongoDB Atlas
- Connection monitoring
- Query analytics
- Backup status

---

## 🚨 Troubleshooting Deployment

### Backend Issues

**Port Already in Use**
```bash
# Change PORT in .env to different value
PORT=5001
```

**MongoDB Connection Error**
- Verify connection string
- Check username/password
- Ensure IP whitelist includes Render IP
- In MongoDB Atlas, add `0.0.0.0/0` to whitelist

**CORS Errors**
- Update corsOptions in middleware/errorHandler.js
- Add your Vercel domain to allowed origins

### AI Service Issues

**Model Loading Error**
- Ensure models directory exists
- Check file permissions
- Verify sklearn and spacy installation

**Import Errors**
- Run `pip install -r requirements.txt`
- Check Python version (3.8+)
- Verify virtual environment activation

### Frontend Issues

**API Connection Error**
- Verify VITE_API_URL in .env
- Check backend is running
- Verify CORS settings
- Check browser console for errors

**Build Failures**
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Try `npm run build` locally first

---

## 🔒 Security Best Practices

### Environment Variables
- Never commit .env files
- Use strong passwords
- Rotate credentials regularly
- Store securely on deployment platform

### MongoDB
- Enable network restrictions
- Use strong authentication
- Enable encryption at rest
- Regular backups

### API Security
- Implement rate limiting
- Use HTTPS (automatic on Vercel/Render)
- Validate all inputs
- Sanitize outputs

### Monitoring
- Set up error alerts
- Monitor resource usage
- Track API response times
- Log suspicious activities

---

## 📈 Performance Optimization

### Frontend
- Images: Use webp format
- Lazy load components
- Minify CSS/JS (automatic with Vite)
- Enable compression on Vercel

### Backend
- Database indexing
- Connection pooling
- Caching strategies
- Response compression

### AI Service
- Model caching
- Batch predictions
- Async processing

---

## 🆚 Comparison: Hosting Providers

| Aspect | Render | Railway | Vercel |
|--------|--------|---------|--------|
| Free Tier | Yes | Limited | Yes |
| Python Support | Yes | Yes | No |
| Custom Domains | Yes | Yes | Yes |
| Auto-deploy | Yes | Yes | Yes |
| Scaling | Paid | Paid | Automatic |

---

## 📞 Support

For deployment help:
1. Check the relevant platform's documentation
2. Review error logs
3. Test locally first
4. Ask in development community

---

**Last Updated**: 2024
**Version**: 1.0
