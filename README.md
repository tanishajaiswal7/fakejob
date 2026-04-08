# 🚨 FakeJobDetector - Complete Full-Stack Application

A production-ready web application that detects fake jobs and internship offers using AI and rule-based analysis.

## 🎯 Overview

FakeJobDetector helps students and job seekers identify fraudulent job postings and internship scams through:
- **AI-Powered Detection** - Machine learning models trained on job fraud patterns
- **Rule-Based Analysis** - Detects common scam indicators
- **Real-Time Results** - Instant risk scoring and recommendations
- **Comprehensive History** - Track all your analyzed job offers

## 📁 Project Structure

```
Seminar Project/
├── client/                    # React + Vite Frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── styles/          # CSS styles
│   │   ├── utils/           # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                    # Node.js + Express Backend
│   ├── controllers/          # API request handlers
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── models/              # MongoDB schemas
│   ├── middleware/          # Express middleware
│   ├── utils/               # Utility functions
│   ├── package.json
│   ├── .env
│   └── index.js
│
└── ai-service/               # Python NLP Service
    ├── app.py               # Flask application
    ├── models/              # ML model storage
    ├── requirements.txt
    └── .env
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MongoDB Atlas account (or local MongoDB)

### 1. Setup Backend

```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_job_detector
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

### 2. Setup AI Service

```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

The AI service will start on `http://localhost:5001`

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 🔧 Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Pure CSS (modular)
- **HTTP Client**: Axios
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB
- **Validation**: express-validator
- **API Client**: Axios

### AI Service
- **Framework**: Flask
- **ML**: Scikit-learn (Logistic Regression)
- **NLP**: spaCy
- **Text Processing**: TF-IDF Vectorization

## 📋 API Endpoints

### Analysis
- `POST /api/analyze` - Analyze a job offer
- `GET /api/history` - Get analysis history
- `GET /api/analysis/:id` - Get specific analysis
- `GET /api/stats` - Get statistics
- `GET /api/health` - Health check

## ⚙️ Features Breakdown

### 1. Landing Page
- **Hero Section**: Eye-catching headline and CTA
- **How It Works**: Visual step-by-step explanation
- **Features**: Key platform benefits
- **Red Flags Guide**: Common scam indicators
- **Testimonials**: User reviews
- **FAQ**: Common questions

### 2. Analysis Form
- **Input Fields**:
  - Job Description
  - Recruiter Email
  - Phone Number
  - Company Name
  - Company Website (optional)
- **Real-Time Validation**:
  - Format checking
  - Required field validation
  - Email validation
  - Phone number validation
  - URL validation

### 3. Results Page
- **Risk Score**: Visual circular progress indicator
- **Risk Level**: Low/Medium/High with color coding
- **Red Flags**: Detailed list of detected issues
- **Safety Tips**: Personalized recommendations
- **Score Breakdown**: Rule-based vs AI analysis
- **Next Steps Guide**: What to do next

### 4. History Page
- **Complete Analysis History**: All previous analyses
- **Filtering**: By risk level
- **Statistics**: Overview of patterns
- **Details**: Company, email, flags, scores
- **Responsive Table**: Mobile-friendly list view

## 🤖 Detection Engine

### Rule-Based Analysis (50% weight)
Checks for:
- Email domain legitimacy (company vs personal)
- Suspicious keywords (fees, guarantees, etc.)
- Phone number validity
- Missing company information
- Unrealistic salary claims
- Pressure/urgency tactics
- Grammar errors

### AI/NLP Analysis (50% weight)
- TF-IDF text vectorization
- Logistic Regression classification
- Fraud probability scoring (0-1)
- Confidence metrics

### Risk Score Formula
```
Final Risk Score = (Rule-Based * 0.5) + (AI Probability * 0.5 * 100)
```

### Risk Levels
- **Low** (0-39): Appears legitimate
- **Medium** (40-59): Requires verification
- **High** (60-100): Multiple red flags detected

## 🗄️ Database Schema

### JobAnalysis Collection
```javascript
{
  _id: ObjectId,
  jobDescription: String,
  recruiterEmail: String,
  phoneNumber: String,
  companyName: String,
  companyWebsite: String,
  ruleBasedScore: Number (0-100),
  aiProbability: Number (0-1),
  finalRiskScore: Number (0-100),
  riskLevel: String (Low|Medium|High),
  redFlags: [String],
  userIP: String,
  isProcessed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- **Input Sanitization**: XSS protection
- **Validation**: Server-side validation of all inputs
- **CORS Configuration**: Restricted origins
- **Error Handling**: Secure error messages
- **Environment Variables**: Sensitive data protection
- **IP Tracking**: Optional client IP logging

## 📊 Performance Optimization

- **Code Splitting**: Lazy loading pages
- **CSS Modules**: Scoped styling
- **API Caching**: Client-side caching
- **Responsive Images**: Mobile optimization
- **Minification**: Production builds
- **Load Time**: < 2 seconds (target)

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Blue (#1e40af)
- **Secondary**: Cyan (#0369a1)
- **Danger**: Red (#dc2626)
- **Warning**: Amber (#f59e0b)
- **Success**: Green (#10b981)

### Design Principles
- Clean, modern interface
- Student-friendly design
- Mobile responsive (320px - 1920px)
- Accessibility-focused
- Fast load times

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1920px+

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
vercel
```

### Backend (Render/Railway)
```bash
# Deploy as Web Service
# Set environment variables
# Attach MongoDB instance
```

### AI Service (Render/Railway)
```bash
# Deploy as Web Service with Python
# pip install gunicorn
```

## 📝 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=development
```

### AI Service (.env)
```env
AI_PORT=5001
FLASK_ENV=development
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Form validation works
- [ ] API calls succeed
- [ ] Results display correctly
- [ ] History filters work
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] Loading states show
- [ ] Redirects work properly

## 🐛 Troubleshooting

### Connection Issues
- Ensure MongoDB is running
- Check MongoDB connection string
- Verify AI service is running on port 5001

### Frontend Issues
- Clear browser cache
- Check browser console for errors
- Verify API proxy in vite.config.js

### Backend Issues
- Check node_modules installation
- Verify environment variables
- Check MongoDB credentials

## 📚 API Documentation

### POST /api/analyze

**Request:**
```json
{
  "jobDescription": "Full job description text...",
  "recruiterEmail": "recruiter@company.com",
  "phoneNumber": "+1 (555) 123-4567",
  "companyName": "Company Inc",
  "companyWebsite": "www.company.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "6507...",
    "riskScore": 45,
    "riskLevel": "Medium",
    "redFlags": ["Email uses personal domain"],
    "ruleBasedScore": 35,
    "aiProbability": 0.55,
    "suggestions": ["Verify company contact..."],
    "timestamp": "2024-04-07T12:34:56Z"
  }
}
```

## 📞 Support & Feedback

For issues, suggestions, or contributions:
- Create an issue on GitHub
- Email: support@fakejobdetector.com
- Visit: www.fakejobdetector.com

## 📄 License

MIT License - feel free to use this project

## 🙏 Acknowledgments

- Built with React, Node.js, and Python
- Machine learning models powered by scikit-learn
- Database: MongoDB Atlas
- Inspired by job security concerns

---

**Made with ❤️ to protect job seekers from scams**
