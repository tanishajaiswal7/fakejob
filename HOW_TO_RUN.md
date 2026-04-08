# How to Run the JobShield AI Project

## Prerequisites
- Node.js installed
- Python 3.8+ installed
- MongoDB Atlas account (already connected)

---

## Method 1: Run Everything (EASIEST)

Open **4 separate terminals** and run these commands:

### Terminal 1: Start Backend Server
```bash
cd "c:\Users\tanis\Desktop\Seminar Project\server"
npm start
```
**You should see:**
```
🚀 Server running on http://localhost:5002
✅ MongoDB connected
```

---

### Terminal 2: Start Frontend Server
```bash
cd "c:\Users\tanis\Desktop\Seminar Project\client"
npm run dev
```
**You should see:**
```
VITE ready in xxx ms
Local: http://localhost:5174
```

---

### Terminal 3: Start AI Service
```bash
cd "c:\Users\tanis\Desktop\Seminar Project\ai-service"
python app.py
```
**You should see:**
```
 * Running on http://localhost:5001
```

---

### Terminal 4: Keep for Testing (Optional)
Use this for any commands or checks

---

## Quick Check If Services Are Running:

```bash
# Open Terminal and run these to verify:

# Check Backend
curl http://localhost:5002/api/health

# Check if ports are in use
netstat -ano | findstr :5002
netstat -ano | findstr :5174
netstat -ano | findstr :5001
```

---

## Access the Application

Once all services are running:

1. **Open Browser**
2. **Go to:** http://localhost:5174
3. **Login with:**
   - Email: `tanisha7@gmail.com`
   - Password: `Tanisha@7`

---

## What Each Service Does:

| Service | Port | What It Does | Command |
|---------|------|-------------|---------|
| **Backend API** | 5002 | Handles authentication, data storage, analysis history | `npm start` |
| **Frontend UI** | 5174 | Web interface for users | `npm run dev` |
| **AI Service** | 5001 | Machine learning model for job analysis | `python app.py` |
| **Database** | Cloud | MongoDB Atlas stores all data | (Automatic) |

---

## Port Information:

- **5002** = Backend Server (Node.js + Express)
- **5174** = Frontend Application (React + Vite)
- **5001** = AI Service (Python + Flask)

If ports are already in use, they will auto-increment (5175, 5003, etc.)

---

## Troubleshooting:

### If Backend shows "Address already in use":
```bash
# Find and kill the process
netstat -ano | findstr :5002
taskkill /PID [PID_NUMBER] /F

# Then restart
npm start
```

### If Frontend shows network error:
- Make sure backend is running on 5002
- Refresh the browser (Ctrl+R or Cmd+R)

### If AI service won't start:
```bash
# Check if Python is installed
python --version

# Install requirements
cd ai-service
pip install -r requirements.txt

# Then run
python app.py
```

---

## Testing the Project:

1. **Login Page:**
   - Email: `tanisha7@gmail.com`
   - Password: `Tanisha@7`

2. **Analyze Job:**
   - Click "Analyze" button
   - Use test data from [FORM_DATA_GUIDE.md](FORM_DATA_GUIDE.md)
   - See risk scores and red flags

3. **View History:**
   - Click "History" 
   - See all previous analyses
   - Click on any to view details

---

## Production Ready Checklist:

✅ Frontend running on 5174
✅ Backend running on 5002  
✅ AI Service running on 5001
✅ MongoDB connected
✅ User authenticated
✅ History data visible
✅ Professional UI displayed
✅ All forms working

---

## For Your Teacher Demonstration:

**Open all 3 terminals, then:**

1. Open http://localhost:5174 in browser
2. Login with provided credentials
3. Go to "Analyze" page
4. Test with fake job posting → Show HIGH RISK
5. Test with real job posting → Show LOW RISK
6. Click "History" → Show data persistence
7. Explain red flags detected

---

## Quick Commands Summary:

```bash
# Start Backend
cd "c:\Users\tanis\Desktop\Seminar Project\server" && npm start

# Start Frontend  
cd "c:\Users\tanis\Desktop\Seminar Project\client" && npm run dev

# Start AI Service
cd "c:\Users\tanis\Desktop\Seminar Project\ai-service" && python app.py

# Test Backend Health
curl http://localhost:5002/api/health

# Kill process using port
taskkill /PID [NUMBER] /F
```

---
