# Push Project to GitHub

## Quick Steps

### Step 1: Initialize Git (One time)
```bash
cd "c:\Users\tanis\Desktop\Seminar Project"
git init
git add .
git commit -m "Initial commit - JobShield AI project"
```

### Step 2: Add Remote Repository
```bash
git remote add origin https://github.com/tanishajaiswal7/fakejob.git
```

### Step 3: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## Detailed Commands

Open **PowerShell** and run these commands one by one:

```bash
# Step 1: Navigate to project
cd "c:\Users\tanis\Desktop\Seminar Project"

# Step 2: Check git status
git status

# Step 3: Add all files
git add .

# Step 4: First commit
git commit -m "Initial commit - JobShield AI with frontend, backend, and AI service"

# Step 5: Add GitHub remote
git remote add origin https://github.com/tanishajaiswal7/fakejob.git

# Step 6: Rename branch to main
git branch -M main

# Step 7: Push to GitHub
git push -u origin main
```

---

## Complete Step-by-Step Guide

### 1. Open PowerShell

Press `Win + R` → Type `powershell` → Enter

### 2. Navigate to Project
```bash
cd "c:\Users\tanis\Desktop\Seminar Project"
```

### 3. Check if Git is Initialized
```bash
git status
```

If you see error "fatal: not a git repository", run:
```bash
git init
```

### 4. Configure Git (First Time Only)
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

Example:
```bash
git config user.name "Tanisha Jaiswal"
git config user.email "tanisha7@gmail.com"
```

### 5. Add All Files
```bash
git add .
```

### 6. Check What Will Be Committed
```bash
git status
```

You should see green "new file:" entries.

### 7. First Commit
```bash
git commit -m "Initial commit - JobShield AI full stack project"
```

### 8. Add GitHub Remote
```bash
git remote add origin https://github.com/tanishajaiswal7/fakejob.git
```

### 9. Push to GitHub
```bash
git push -u origin main
```

If you get error about branch, run:
```bash
git branch -M main
git push -u origin main
```

---

## What Gets Pushed

Your GitHub repo will have:
- ✅ `client/` - React frontend
- ✅ `server/` - Node.js backend  
- ✅ `ai-service/` - Python AI service
- ✅ All configuration files
- ✅ All documentation (DEPLOYMENT_GUIDE.md, etc.)
- ✅ package.json files
- ✅ Requirements.txt

---

## If Using GitHub Desktop (GUI)

Instead of terminal commands, you can use GitHub Desktop:

1. Download: https://desktop.github.com/
2. Sign in with GitHub account
3. Click "Add" → "Clone Repository"
4. Select https://github.com/tanishajaiswal7/fakejob.git
5. Choose local path
6. Make changes locally
7. Commit & Push from GUI

---

## Verify Push Success

1. Go to: https://github.com/tanishajaiswal7/fakejob
2. Refresh page
3. You should see all your files uploaded

---

## Files to Exclude (Optional - Create .gitignore)

Create file: `c:\Users\tanis\Desktop\Seminar Project\.gitignore`

Add:
```
node_modules/
__pycache__/
.env
.env.local
.env.*.local
dist/
build/
.DS_Store
*.log
.vscode/
.idea/
```

---

## Update After Changes

After making changes, run:
```bash
cd "c:\Users\tanis\Desktop\Seminar Project"
git add .
git commit -m "Update: [describe changes]"
git push
```

Example:
```bash
git add .
git commit -m "Fix: CORS configuration for deployment"
git push
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Please tell me who you are" | Run: `git config --global user.email "you@example.com"` |
| "Repository already exists" | Change remote: `git remote rm origin` then add new one |
| "Permission denied" | Use HTTPS instead of SSH, or add SSH key to GitHub |
| "Nothing to commit" | Run: `git add .` first |

---

## After Pushing to GitHub

You can now:
1. Deploy from GitHub using Vercel/Render
2. Share code with others
3. Track version history
4. Collaborate with team members
5. Make it public for your teacher

---
