# JobShield AI - Form Data Examples

## Form Fields Explanation:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Job Description** | Required | Paste the complete job posting text | "Senior Software Engineer, 5+ years, Bangalore..." |
| **Company Name** | Required | Name of the company | "Microsoft India" or "TCS" |
| **Company Website** | Optional | Official company website URL | "https://www.microsoft.com" or leave empty |
| **Recruiter Email** | Required | Email address mentioned in posting | "careers@microsoft.com" |
| **Phone Number** | Required | Contact number from posting | "+91-9876543210" |

---

## TESTING DATA - Copy and Paste These:

### TEST #1: FAKE JOB (High Risk - Should show 85+/100)

**Job Description:**
```
Work from Home - Easy Money!

Hiring immediately for data entry operators!

Salary: ₹50,000 per month
Work: 2-3 hours per day from home
No experience required!

What you need to do:
- Copy data from images to Excel
- Simple and easy work
- Flexible hours

To start immediately:
1. Send ₹5,000 as registration fee
2. We send you training materials
3. Start earning TODAY!
```

**Company Name:** Premium Jobs India

**Company Website:** (leave empty)

**Recruiter Email:** premium.jobs.india@gmail.com

**Phone Number:** +91-9876543210

**Expected Result:** 🔴 HIGH RISK (85-90/100)
- Red flags: Registration fee required, generic email, no company website, unrealistic salary

---

### TEST #2: REAL JOB (Low Risk - Should show 10-15/100)

**Job Description:**
```
Microsoft India - Software Engineer (Entry Level)

Location: Bangalore, India
Experience: 0-2 years
Employment Type: Full-time

About the Role:
Microsoft is seeking talented software engineers to join our Bangalore development center. You will collaborate with experienced engineers on cutting-edge cloud and AI technologies.

Responsibilities:
- Develop and maintain software solutions using Java/Python/.NET
- Participate in code reviews and design discussions
- Contribute to product quality and performance
- Work with Agile development practices

Requirements:
- Bachelor's degree in Computer Science/Engineering
- Strong programming fundamentals
- Problem-solving skills
- Team collaboration abilities

Benefits:
- Competitive salary package
- Health insurance and wellness programs
- Professional development opportunities
- Stock options and performance bonus
```

**Company Name:** Microsoft India

**Company Website:** https://www.microsoft.com

**Recruiter Email:** careers-india@microsoft.com

**Phone Number:** +91-22-33445566

**Expected Result:** 🟢 LOW RISK (10-12/100)
- No red flags: Official domain, proper company website, detailed benefits, legitimate contact info

---

### TEST #3: FAKE JOB - Visa Scam (High Risk - Should show 88+/100)

**Job Description:**
```
URGENT: TCS is hiring for USA H1B Visa

Position: Senior Software Engineer
Location: USA (sponsorship provided)
Salary: $150,000 per year

We provide:
- Visa sponsorship certificate
- Flight tickets
- Accommodation in USA

Processing Required:
- Visa application fee: ₹75,000 (refundable)
- Document verification: ₹25,000
- Processing charges: ₹15,000

Apply now! Limited positions available.
```

**Company Name:** TCS

**Company Website:** (leave empty)

**Recruiter Email:** tcs.usajobs@gmail.com

**Phone Number:** +91-7654321098

**Expected Result:** 🔴 HIGH RISK (85-92/100)
- Red flags: Upfront payment, wrong email domain, visa scam pattern, pressure tactics (limited positions)

---

### TEST #4: REAL JOB - Goldman Sachs (Low Risk - Should show 11-14/100)

**Job Description:**
```
Goldman Sachs - Technology Analyst

Location: Bangalore, India
Experience: 0-2 years
Employment Type: Full-time

Position Overview:
Join Goldman Sachs' technology team and work on high-impact financial systems and infrastructure that power global markets.

Responsibilities:
- Develop robust software solutions for financial systems
- Test and debug applications
- Collaborate with senior engineers and stakeholders
- Participate in technology innovation

Requirements:
- Bachelor's degree in Computer Science or equivalent
- Strong programming skills (Java, C++, Python)
- Understanding of data structures and algorithms
- Excellent communication and analytical abilities

Compensation & Benefits:
- Highly competitive salary
- Sign-on bonus
- Comprehensive health coverage
- Pension and retirement plans
- Professional development budget
- Mentorship from senior technologists
```

**Company Name:** Goldman Sachs

**Company Website:** https://www.goldmansachs.com

**Recruiter Email:** india-careers@gs.com

**Phone Number:** +91-22-5500-5000

**Expected Result:** 🟢 LOW RISK (10-14/100)
- No red flags: Official domain, detailed benefits, legitimate structure

---

### TEST #5: FAKE JOB - Phishing (High Risk - Should show 87+/100)

**Job Description:**
```
Amazon Customer Support - Work from Home

Position: Customer Service Executive
Company: Amazon
Salary: ₹35,000/month

Requirements:
- Basic English
- Computer
- Internet connection

Benefits:
- Free training
- Work from anywhere
- Instant payments

How to apply:
1. Download application form: bit.ly/amazon-apply
2. Pay ₹999 for training materials
3. Complete online test
4. Start working immediately!
```

**Company Name:** Amazon

**Company Website:** (leave empty)

**Recruiter Email:** amazon.support.in@outlook.com

**Phone Number:** +91-8765432101

**Expected Result:** 🔴 HIGH RISK (85-90/100)
- Red flags: Training fee required, personal email (outlook), bit.ly suspicious URL, phishing pattern

---

### TEST #6: REAL JOB - Accenture (Low Risk - Should show 12-15/100)

**Job Description:**
```
Accenture - Technology Analyst

Location: Pune, India
Experience: 0-2 years
Employment Type: Full-time

About the Role:
Accenture is a global technology and consulting company. We are looking for passionate technologists to join our growing technology team in India.

What You'll Do:
- Design and develop technology solutions
- Support global clients on digital transformation
- Learn emerging technologies and methodologies
- Build strong client relationships

Who We're Looking For:
- Bachelor's degree in any engineering discipline
- Strong analytical and problem-solving skills
- Excellent written and verbal communication
- Passion for technology

What We Offer:
- Competitive compensation
- Comprehensive health and wellness benefits
- Career development and learning opportunities
- Global exposure
- Work-life balance culture
```

**Company Name:** Accenture

**Company Website:** https://www.accenture.com/in-en

**Recruiter Email:** india.careers@accenture.com

**Phone Number:** +91-20-6730-0000

**Expected Result:** 🟢 LOW RISK (11-14/100)
- No red flags: Official company domain, proper structure, legitimate contact

---

### TEST #7: FAKE JOB - Freelance Scam (High Risk - Should show 90+/100)

**Job Description:**
```
Earn Money Online - Data Entry Work

Working from home opportunity!

Positions Available: 100+
Salary: ₹20,000 - ₹60,000 per project
Work Type: Part-time/Full-time

What You'll Do:
- Enter data from documents to database
- Copy information from images
- Simple clerical work
- No experience needed!

How to Get Started:
1. Send ₹2,000 as project registration fee
2. Receive training package (PDF)
3. Start receiving projects immediately
4. Earn ₹500-₹2000 per project!

Why Choose Us?
- Instant payments
- Work from home
- No interview needed
- Flexible hours
- Easy work!
```

**Company Name:** DataEntry Gurus

**Company Website:** (leave empty)

**Recruiter Email:** dataentry.work@gmail.com

**Phone Number:** +91-9876543210

**Expected Result:** 🔴 HIGH RISK (88-94/100)
- Red flags: Registration fee required, generic email, no website, unrealistic earnings, no interview needed

---

## Dashboard Quick Reference:

### To Show Your Teacher - Use This Order:

1. **First (FAKE):** Test #1 or #3 
   - Show HIGH RISK score
   - Point out red flags
   - Explain why it's a scam

2. **Second (REAL):** Test #4 or #6
   - Show LOW RISK score
   - Explain legitimate markers
   - Compare with fake job

3. **Third (FAKE):** Test #5 or #7
   - Show another HIGH RISK example
   - Different red flag pattern
   - Show diversity in detection

4. **Finally:** Click "History"
   - Show all tested analyses
   - Demonstrate data persistence
   - Show analysis summary

---

## Step-by-Step for Each Test:

1. Go to **http://localhost:5174/analyze**
2. **Copy the entire Job Description** (multi-line text)
3. **Paste into Job Description field**
4. **Fill Company Name** (exact name provided)
5. **Fill Company Website** (if provided, else leave empty)
6. **Fill Recruiter Email** (exact email from job posting)
7. **Fill Phone Number** (exact phone from job posting)
8. **Click "Analyze Job Offer"**
9. **Wait for result** - Should show Risk Score & Red Flags
10. **Click "View History"** - See all your analyses

---

## What to Show Your Teacher:

✅ **Risk Score Accuracy**
- Fake jobs: 85-94/100 ✓
- Real jobs: 10-15/100 ✓

✅ **Red Flag Detection**
- Upfront payment requests ✓
- Wrong email domains ✓
- Missing company websites ✓
- Unrealistic salaries ✓

✅ **Professional UI**
- Clean, modern interface
- Easy to use
- Professional branding ✓

✅ **Data Persistence**
- All analyses stored in database
- History page shows everything
- User authentication working ✓

---
