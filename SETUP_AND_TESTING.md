# Complete Setup & Testing Guide

## Quick Start (Development)

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas account
- Git

### Step 1: Clone and Setup Backend
```bash
cd server
npm install
```

### Step 2: Configure Backend
Create `.env`:
```env
PORT=5002
MONGODB_URI=mongodb+srv://tanisha:abcd@cluster0.tqfslxm.mongodb.net/
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_in_production
```

### Step 3: Start Backend
```bash
npm run dev
```
Expected output:
```
🚀 Server running on http://localhost:5002
✅ MongoDB connected
```

### Step 4: Setup Python AI Service
```bash
cd ai-service
python -m pip install -r requirements.txt
```

### Step 5: Start AI Service
```bash
python app.py
```
Expected output:
```
✅ Model loaded from disk
🚀 Starting AI Service... Running on http://0.0.0.0:5001
```

### Step 6: Setup Frontend
```bash
cd client
npm install
npm run dev
```
Expected output:
```
VITE v4.5.14  ready in XXX ms
Local:   http://localhost:5173/
```

## Testing API Endpoints

### Health Check Endpoints
```bash
# Backend health
curl http://localhost:5002/api/health

# AI service health
curl http://localhost:5001/health
```

### Authentication Flow

#### 1. Signup
```bash
curl -X POST http://localhost:5002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login
```bash
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Get Profile (Protected Route)
```bash
curl http://localhost:5002/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Job Analysis Endpoints

#### 1. Analyze Job (Requires Authentication)
```bash
curl -X POST http://localhost:5002/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "jobDescription": "Work from home, earning 5000 per week! No experience needed. Just pay $100 for training materials...",
    "recruiterEmail": "recruiter@example.com",
    "phoneNumber": "+1234567890",
    "companyName": "ABC Company",
    "companyWebsite": "https://www.example.com"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "riskScore": 75,
    "riskLevel": "High",
    "redFlags": ["work_from_home_guarantee", "unrealistic_salary", "upfront_payment_required"],
    "ruleBasedScore": 75,
    "aiProbability": 0.82,
    "aiConfidence": 0.95,
    "suggestions": [
      "🚨 AVOID THIS OFFER - Multiple red flags detected",
      "Report this to the platform and job board",
      ...
    ],
    "timestamp": "2024-04-07T..."
  }
}
```

#### 2. Get Analysis History
```bash
curl http://localhost:5002/api/history?limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 3. Get Specific Analysis
```bash
curl http://localhost:5002/api/analysis/ANALYSIS_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 4. Get User Statistics
```bash
curl http://localhost:5002/api/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Frontend Testing Checklist

### Landing Page
- [ ] Logo navigates to home
- [ ] "Get Started" button navigates to signup
- [ ] Features section displays correctly
- [ ] Testimonials carousel works
- [ ] Navigation links work

### Authentication
- [ ] Signup page shows with form fields
- [ ] Email validation works
- [ ] Password validation (min 6 chars)
- [ ] Confirm password match validation
- [ ] Success message on signup
- [ ] User redirected to analysis page
- [ ] Login page functional
- [ ] "Remember me" persists session
- [ ] Logout clears session

### Job Analysis Form
- [ ] All form fields display
- [ ] Form validation works:
  - Job description required (min 20 chars)
  - Email format validation
  - Phone number formatting
  - Company name required
  - Website URL optional but validated if provided
- [ ] Submit button disabled while loading
- [ ] Success message shows
- [ ] Redirects to results page

### Results Page
- [ ] Risk score displays correctly
- [ ] Risk level badge shows correct color:
  - Low = Green
  - Medium = Yellow
  - High = Red
- [ ] Red flags list displays
- [ ] Suggestions display
- [ ] "Analyze Another" button works
- [ ] "View History" button works

### History Page
- [ ] All previous analyses display
- [ ] Analyses are sorted by date (newest first)
- [ ] Filter by risk level works
- [ ] Limit parameter works
- [ ] Click analysis shows details
- [ ] Delete/archive functionality (if implemented)

### Header/Navigation
- [ ] Logo clickable → home
- [ ] Auth buttons visible when logged out
- [ ] User menu visible when logged in
- [ ] Logout button works
- [ ] Mobile responsive

### Error Handling
- [ ] Network errors show gracefully
- [ ] Invalid token redirects to login
- [ ] 401 unauthorized handled
- [ ] Server errors show message
- [ ] Connection timeout shows message

## Performance Testing

### Load Testing (Using Artillery)
```bash
npm install -g artillery

# Create loadtest.yml
dev:
  target: "http://localhost:5002"
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Ramp up"

scenarios:
  - name: "Analyze Job Flow"
    flow:
      - post:
          url: "/api/analyze"
          json:
            jobDescription: "..."
            recruiterEmail: "..."
            phoneNumber: "..."
            companyName: "..."

# Run test
artillery run loadtest.yml
```

### Response Time Targets
- Login: < 200ms
- Signup: < 300ms
- Job Analysis: < 2000ms (includes AI processing)
- Get History: < 500ms
- Get Stats: < 300ms

## Production Checklist

Before deploying to production:

### Security
- [ ] Change JWT_SECRET
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS_ORIGIN properly
- [ ] Update API_BASE_URL in production .env
- [ ] Enable request rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets

### Performance
- [ ] Run production build: `npm run build`
- [ ] Test with production build locally
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Add database indexes

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up uptim monitoring
- [ ] Create alerts for critical errors
- [ ] Monitor database performance

### Deployment
- [ ] Use PM2 for process management
- [ ] Set up auto-restart on failure
- [ ] Configure reverse proxy (Nginx)
- [ ] Enable firewall rules
- [ ] Set up regular backups
- [ ] Test rollback procedure

## Troubleshooting

### "Cannot find module"
```bash
npm install  # Missing dependencies
```

### "MongoDB connection failed"
- Check MONGODB_URI in .env
- Verify IP whitelisting in MongoDB Atlas
- Test connection: `mongosh "YOUR_CONNECTION_STRING"`

### "Auth endpoint returns 401"
- Check JWT_SECRET matches between frontend and backend
- Verify token is being sent: `curl -H "Authorization: Bearer TOKEN" ...`
- Check token expiration

### "CORS error"
- Verify CORS_ORIGIN in backend .env
- Check API_BASE_URL in frontend .env
- Ensure Authorization header is included

### "Slow API responses"
- Check AI service is running
- Monitor database query times
- Check network latency
- Review API logs

## Database Management

### MongoDBBackup
```bash
mongodump --uri "YOUR_MONGODB_URI" --out ./backup
```

### Restore
```bash
mongorestore --uri "YOUR_MONGODB_URI" ./backup
```

### Common Queries
```javascript
// Get all users
db.users.find()

// Get all analyses for a user
db.jobanalyses.find({ userId: ObjectId("...") })

// Get high-risk analyses
db.jobanalyses.find({ riskLevel: "High" })

// Average risk score
db.jobanalyses.aggregate([
  { $group: { _id: null, avgScore: { $avg: "$finalRiskScore" } } }
])
```

## Support & Resources

- **Documentation**: See README.md
- **Issues**: Create GitHub issue with:
  - Error message (full stack trace)
  - Environment (OS, Node version, etc.)
  - Steps to reproduce
  - Expected vs actual behavior

- **Email**: support@jobshieldai.com
- **Chat**: Discord server link

---

For production deployment, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
