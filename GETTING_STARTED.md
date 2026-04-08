# 🚀 Getting Started - FakeJobDetector

Step-by-step guide to get FakeJobDetector running on your machine.

## 📋 Prerequisites

Before you start, make sure you have:

### Required Software
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **Python** (v3.8+) - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)

### Optional but Recommended
- **MongoDB Compass** - GUI for MongoDB [Download](https://www.mongodb.com/products/compass)
- **Postman** - API testing tool [Download](https://www.postman.com/)
- **Visual Studio Code** - Code editor [Download](https://code.visualstudio.com/)

### Online Account
- **MongoDB Atlas** - Cloud database [https://www.mongodb.com/cloud/atlas]

---

## 🔧 Installation Steps

### Step 1: Clone or Download Project

```bash
# If using Git
git clone <your-repo-url> fake-job-detector
cd fake-job-detector

# OR manually download and extract the project
```

### Step 2: Setup MongoDB

1. **Sign up for MongoDB Atlas**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Sign Up" and create account
   - Login to dashboard

2. **Create a Cluster**:
   - Click "Create"
   - Select "Free" (M0) tier
   - Choose region closest to you
   - Click "Create Cluster"
   - Wait 1-3 minutes for cluster to deploy

3. **Create Database User**:
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Choose strong password (save it!)
   - Click "Add User"

4. **Get Connection String**:
   - Click "Clusters" in left sidebar
   - Click "Connect" button on your cluster
   - Select "Drivers" option
   - Copy the connection string
   - It should look like: `mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

5. **Allow Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow access from anywhere"
   - Confirm

✅ MongoDB is ready!

---

### Step 3: Setup Backend (Node.js + Express)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your MongoDB connection
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/fake_job_detector" >> .env
echo "AI_SERVICE_URL=http://localhost:5001" >> .env
echo "NODE_ENV=development" >> .env
```

**macOS/Linux alternative** (create file manually):
```bash
nano .env
# Paste this:
PORT=5000
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/fake_job_detector
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=development
```

✅ Backend is configured!

---

### Step 4: Setup AI Service (Python + Flask)

```bash
# Navigate to ai-service directory
cd ../ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "AI_PORT=5001" > .env
echo "FLASK_ENV=development" >> .env
```

✅ AI Service is configured!

---

### Step 5: Setup Frontend (React + Vite)

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Optional: Create .env.local for custom API URL
# (skip this if backend runs on default port)
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

✅ Frontend is configured!

---

## ▶️ Running the Application

### Terminal 1: Start MongoDB (if using local)
```bash
# If you have MongoDB installed locally
mongod
```

### Terminal 2: Start Backend

```bash
cd server
npm run dev
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
📝 API Documentation:
   POST   /api/analyze - Analyze a job offer
   GET    /api/history - Get analysis history
   GET    /api/analysis/:id - Get specific analysis
   GET    /api/stats - Get statistics
   GET    /api/health - Health check
```

### Terminal 3: Start AI Service

```bash
cd ai-service

# Activate virtual environment first
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Start Flask app
python app.py
```

Expected output:
```
✅ Model loaded/trained
🚀 Starting AI Service...
 * Running on http://0.0.0.0:5001
```

### Terminal 4: Start Frontend

```bash
cd client
npm run dev
```

Expected output:
```
  VITE v4.3.9  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## ✅ Verify Everything is Running

1. **Frontend**: Open http://localhost:5173
   - Should see beautiful landing page
   - No errors in console (F12)

2. **Backend**: Test API
   ```bash
   # In new terminal
   curl http://localhost:5000/api/health
   # Should return: {"success":true,"message":"API is healthy"}
   ```

3. **AI Service**: Test health
   ```bash
   # In new terminal
   curl http://localhost:5001/health
   # Should return: {"status":"ok","model_loaded":true}
   ```

---

## 🧪 Testing the Full Flow

1. Go to http://localhost:5173
2. Click "Start Analyzing" button
3. Fill out the form with test data:
   ```
   Job Description: "Make $5000 per week guaranteed. No experience needed. Registration fee: $99"
   Recruiter Email: contact@gmail.com
   Phone Number: +1 (555) 123-4567
   Company Name: FakeCompany Inc
   Website: (leave empty)
   ```
4. Click "Analyze Job Offer"
5. Should see results with HIGH risk score

✅ Application is working!

---

## 🛠️ Troubleshooting

### MongoDB Connection Error

**Problem**: `Error: connect ECONNREFUSED`

**Solutions**:
1. Verify MongoDB Atlas cluster is running
2. Check connection string in .env (correct username/password)
3. Ensure IP whitelist includes your IP (0.0.0.0/0 for development)
4. Network connectivity issue? Try again in 30 seconds

### AI Service Not Found

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5001`

**Solutions**:
1. Make sure `python app.py` is running in Terminal 3
2. Check Flask is listening on port 5001
3. Verify no firewall blocking port 5001

### Frontend Can't Connect to Backend

**Problem**: API calls failing, CORS errors

**Solutions**:
1. Ensure backend is running: `npm run dev` in server folder
2. Check VITE_API_URL in .env.local
3. Browser console should show actual error
4. Try clearing browser cache (Ctrl+Shift+Delete)

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::5000`

**Solutions**:
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000
# macOS/Linux:
lsof -i :5000

# Kill the process or change PORT in .env
PORT=5001
```

### Python Module Errors

**Problem**: `ModuleNotFoundError: No module named 'flask'`

**Solutions**:
1. Verify virtual environment is activated
2. Run `pip install -r requirements.txt` again
3. Check Python version: `python --version`

---

## 📝 Environment Variables Reference

### Backend (server/.env)
```env
PORT=5000                                                    # Server port
MONGODB_URI=mongodb+srv://...                               # MongoDB connection
AI_SERVICE_URL=http://localhost:5001                        # AI service URL
NODE_ENV=development                                        # Environment mode
```

### AI Service (ai-service/.env)
```env
AI_PORT=5001                                                # Flask port
FLASK_ENV=development                                       # Flask environment
```

### Frontend (client/.env.local)
```env
VITE_API_URL=http://localhost:5000/api                     # Backend API URL
```

---

## 🎯 Common Tasks

### Restart Everything
```bash
# Terminal 1 (Backend) - Ctrl+C then:
npm run dev

# Terminal 2 (AI Service) - Ctrl+C then:
python app.py

# Terminal 3 (Frontend) - Ctrl+C then:
npm run dev
```

### Clear Data and Start Fresh
```bash
# In MongoDB Atlas:
# 1. Go to Clusters
# 2. Click ... > Options > Delete Database
# 3. Type database name to confirm
```

### Build for Production
```bash
# Frontend
cd client
npm run build
# Creates dist/ folder

# Backend (no build needed, uses Node directly)

# AI Service (no build needed, uses Python directly)
```

### Reset Node Modules
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../client
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Learning Resources

### Frontend (React + Vite)
- React Hooks: https://react.dev/reference/react/hooks
- Axios: https://axios-http.com/
- Vite Guide: https://vitejs.dev/guide/

### Backend (Node.js + Express)
- Express.js: https://expressjs.com/
- MongoDB Driver: https://www.mongodb.com/docs/drivers/node/
- Schema Validation: https://docs.expressvalidator.org/

### AI Service (Python + Flask)
- Flask: https://flask.palletsprojects.com/
- Scikit-learn: https://scikit-learn.org/
- SpaCy: https://spacy.io/

### Database (MongoDB)
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas/
- MongoDB Query: https://docs.mongodb.com/manual/tutorial/query-documents/

---

## 🎓 Next Steps

1. **Understand the Code**
   - Read comments in each file
   - Explore different API endpoints
   - Play with the detection logic

2. **Make Your Changes**
   - Modify red flag keywords
   - Add new detection rules
   - Improve UI/UX

3. **Deploy Your App**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Get it live on the internet
   - Share with friends

4. **Learn More**
   - Add authentication
   - Implement notifications
   - Add more ML models
   - Create mobile app

---

## 🤝 Getting Help

- **Documentation**: Read README.md and DEPLOYMENT.md
- **Code Comments**: Check comments in source files
- **Error Messages**: Read browser console (F12) and terminal output
- **Stack Overflow**: Search for specific error messages
- **Community**: Ask in development forums

---

## 🎉 Congratulations!

You now have a fully functional FakeJobDetector running on your machine!

**Next time you need to run the app**:
1. Terminal 1: `mongod` or verify MongoDB Atlas is accessible
2. Terminal 2: `cd server && npm run dev`
3. Terminal 3: `cd ai-service && source venv/bin/activate && python app.py`
4. Terminal 4: `cd client && npm run dev`
5. Open http://localhost:5173

**Happy coding! 🚀**
