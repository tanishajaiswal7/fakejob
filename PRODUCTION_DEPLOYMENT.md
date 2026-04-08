# FakeJobDetector - Production Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the FakeJobDetector application to production.

## Architecture
The application consists of three microservices:
- **Frontend**: React + Vite (Port 5173 for development)
- **Backend**: Node.js + Express (Port 5002)
- **AI Service**: Python + Flask (Port 5001)
- **Database**: MongoDB Atlas (Cloud)

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- MongoDB Atlas account (free tier available)
- Git
- Docker (optional, for containerization)
- PM2 (Process Manager for Node.js - optional but recommended)

## Backend Deployment (Node.js/Express)

### 1. Install Dependencies
```bash
cd server
npm install --production
```

### 2. Environment Configuration
Create a `.env` file with production values:
```env
PORT=5002
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_job_detector
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_change_this_now_extremely_important
CORS_ORIGIN=https://yourdomain.com
```

### 3. Using PM2 for Process Management
```bash
npm install -g pm2

# Start the backend with PM2
pm2 start index.js --name "fakejob-backend" --env production

# View logs
pm2 logs

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

### 4. Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use strong MongoDB password
- [ ] Enable firewall rules
- [ ] Use HTTPS/SSL certificate
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable CORS for specific domains only

## AI Service Deployment (Python/Flask)

### 1. Install Dependencies
```bash
cd ai-service
python -m pip install -r requirements.txt
```

### 2. Create Production Config
```python
# gunicorn configuration for production
workers = 4
worker_class = 'sync'
bind = '0.0.0.0:5001'
timeout = 120
```

### 3. Run with Gunicorn
```bash
pip install gunicorn
gunicorn -c gunicorn_config.py app:app
```

### 4. Using Systemd (Linux)
Create `/etc/systemd/system/fakejob-ai.service`:
```ini
[Unit]
Description=FakeJobDetector AI Service
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/path/to/ai-service
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/gunicorn -c gunicorn_config.py app:app
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable fakejob-ai
sudo systemctl start fakejob-ai
```

## Frontend Deployment (React/Vite)

### 1. Build for Production
```bash
cd client
npm install
npm run build
```

### 2. Environment Setup
Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### 3. Deployment Options

#### Option A: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option B: Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option C: AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Option D: Traditional VPS
```bash
# Copy dist to server
scp -r dist/* user@server:/var/www/fakejob-detector/

# Configure Nginx
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/fakejob-detector;
    
    # SPA routing
    location / {
        try_files $uri /index.html;
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://localhost:5002/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Database Setup (MongoDB Atlas)

1. **Create Account**: Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: 
   - Choose free tier (M0)
   - Select region closest to your users
   - Create authentication credentials
3. **Network Access**:
   - Add your IP to whitelist
   - Or use "Allow access from anywhere" (less secure)
4. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

## Docker Deployment (Optional)

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5002
CMD ["node", "index.js"]
```

### AI Service Dockerfile
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["gunicorn", "-c", "gunicorn_config.py", "app:app"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5002:5002"
    environment:
      - MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
      - JWT_SECRET=your_secret
  
  ai-service:
    build: ./ai-service
    ports:
      - "5001:5001"

  frontend:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - backend
```

## Performance Optimization

### 1. Compression
- Enable gzip on Nginx/Apache
- Minify CSS/JS in build process
- Compress images

### 2. Caching
- Set cache headers for static assets
- Use CDN for frontend assets
- Redis for API response caching

### 3. Database
- Add indexes on frequently queried fields
- Connection pooling
- Regular backups

### 4. Monitoring
- Use PM2 Plus for monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Set up alerts

## Security Best Practices

1. **HTTPS/SSL**: Always use encrypted connections
2. **Authentication**: 
   - Use strong JWT secrets (32+ characters)
   - Implement token refresh
   - Set appropriate expiration times

3. **Input Validation**: 
   - Validate all user inputs
   - Sanitize data before database insertion
   - Use parameterized queries

4. **Rate Limiting**:
   ```bash
   npm install express-rate-limit
   ```

5. **CORS Configuration**:
   ```javascript
   cors({
     origin: process.env.CORS_ORIGIN,
     credentials: true
   })
   ```

6. **Environment Variables**: Never commit `.env` files

7. **Dependencies**: Regularly update packages
   ```bash
   npm audit fix
   npm update
   ```

## Monitoring & Maintenance

### Logs
- Backend: Use PM2 logs or Winston logger
- Frontend: Use Sentry or similar service
- Server: Use systemd logs (`journalctl`)

### Backups
- MongoDB: Enable automated backups
- Code: Regular git commits
- Database: Weekly manual backups

### Update Process
1. Test locally
2. Deploy to staging
3. Run integration tests
4. Deploy to production
5. Monitor for errors

## Troubleshooting

### "Cannot connect to database"
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure network connectivity

### "API returns 401"
- Verify JWT_SECRET matches frontend
- Check token doesn't exist in request
- Verify token expiration

### "Frontend can't reach backend"
- Check CORS_ORIGIN is correct
- Verify backend is running
- Check firewall rules
- Verify API URL in .env.production

## Performance Metrics

Target performance metrics:
- API response time: < 500ms
- Frontend load time: < 2s
- Database query time: < 100ms
- Token generation: < 50ms

## Scaling

For large-scale deployment:
1. Load balance backend instances
2. Use caching layer (Redis)
3. Separate AI service to dedicated server
4. Use CDN for frontend assets
5. Database replication
6. Message queues for async tasks

## Support & Resources

- Documentation: See BUILD_SUMMARY.md
- Issues:GitHub issue tracker
- Deployment Help: Check specific platform docs
