# Dummy Data Documentation

## Overview
Successfully seeded MongoDB with **9 realistic job analyses** featuring Indian companies and both fake/real job postings.

---

## 📧 Test User Account

Use these credentials to login and view the seed data in your history:

```
Email: rajesh.kumar@example.com
Password: Test@1234
```

---

## 📊 Data Summary

### Risk Level Distribution
- **🔴 High Risk (5)** - Detected Fake/Scam Jobs
- **🟢 Low Risk (4)** - Legitimate Opportunities
- **🟡 Medium Risk (0)** - Requires Caution

---

## 🏢 Fake Job Postings (Red Flags Detected)

### 1. **TCS Visa Sponsorship Scam**
- **Company**: TCS (Tata Consultancy Services)
- **Recruiter**: tcs.recruitment@gmail.com (Wrong domain!)
- **Red Flags**: 
  - Registration fee: ₹50,000 for visa
  - Gmail account instead of @tcs.com
  - Unrealistic salary (₹25 LPA)
  - Pressure to apply immediately
- **Risk Score**: 88/100 ⚠️

### 2. **Infosys Data Entry Scam**
- **Company**: Infosys Limited
- **Recruiter**: infosys.opportunities@outlook.com
- **Red Flags**:
  - Registration fee: ₹5,000
  - Work-from-home with unrealistic pay (₹30K/month)
  - WhatsApp official communication
  - No experience required (Too good to be true)
- **Risk Score**: 94/100 🔴

### 3. **HCL Technologies Visa Fraud**
- **Company**: HCL Technologies
- **Recruiter**: hcl.usa.jobs@mail.com
- **Red Flags**:
  - Upfront visa fee: ₹75,000 (refundable claim)
  - H1B visa promise
  - Salary in USD ($120,000)
  - Limited positions pressure
- **Risk Score**: 89/100 ⚠️

### 4. **Amazon Phishing Attempt**
- **Company**: Amazon India
- **Recruiter**: amazon.hiring.india@ymail.com (Yahoo domain!)
- **Red Flags**:
  - Paid training material (₹999)
  - Suspicious bit.ly shortened URL
  - No experience needed with high pay
  - Quick approval promise
- **Risk Score**: 87/100 ⚠️

### 5. **Freelance Data Analyst Scam**
- **Company**: Unknown Company
- **Recruiter**: dataanalyst.work@gmail.com
- **Red Flags**:
  - Project access fee: ₹2,000
  - Vague company information
  - Immediate payment promises
  - Unrealistic earning claims
- **Risk Score**: 91/100 🔴

---

## ✅ Legitimate Job Postings (Safe & Real)

### 1. **TCS Official Posting**
- **Company**: Tata Consultancy Services
- **Email**: careers@tcs.com (Proper domain!)
- **Role**: Software Developer
- **Benefits**: 
  - Legitimate salary package
  - Insurance & health benefits
  - Career development programs
  - Proper application process on official website
- **Risk Score**: 12/100 ✅

### 2. **Accenture Technology Analyst**
- **Company**: Accenture India
- **Email**: india.careers@accenture.com
- **Experience**: 0-2 years (Entry-level)
- **Highlights**:
  - Global organization
  - Learning programs
  - Professional growth
  - No upfront fees
- **Risk Score**: 14/100 ✅

### 3. **Microsoft Entry-Level Position**
- **Company**: Microsoft India
- **Email**: msjobs-india@microsoft.com
- **Location**: Bangalore
- **Benefits**:
  - Stock options
  - Comprehensive health coverage
  - Professional development
  - Inclusive workplace
  - No payment required
- **Risk Score**: 10/100 ✅

### 4. **Goldman Sachs Technology Analyst**
- **Company**: Goldman Sachs
- **Email**: india-careers@gs.com
- **Experience**: 0-2 years
- **Highlights**:
  - Competitive compensation
  - Wellness programs
  - Mentorship opportunities
  - Transparent recruitment
- **Risk Score**: 11/100 ✅

---

## 🔍 How to Test the Data

### Login & View History
1. Visit: **http://localhost:5173**
2. Click "Sign In"
3. Enter test credentials above
4. Navigate to "History"
5. View all 9 job analyses with risk scores

### Key Features Demonstrated
- ✅ Risk scoring algorithm
- ✅ Red flag detection
- ✅ HTML generation for reports
- ✅ User history tracking
- ✅ Real vs Fake job comparison

---

## 🎯 Red Flag Patterns Used

### Common Scam Indicators in Dummy Data
1. **Wrong Email Domains** - Gmail, Yahoo instead of company domain
2. **Upfront Payment** - Registration/Training fees
3. **Too Good to Be True** - Salary too high, no experience needed
4. **Pressure Tactics** - "Limited positions", "Apply now"
5. **No Company Website** - Suspicious or missing
6. **Poor Communication** - Spelling errors, suspicious URLs
7. **Alternative Channels** - WhatsApp for official business
8. **Vague Details** - Missing company info

---

## 💾 Database Details

- **Database**: MongoDB Atlas
- **Records Created**: 9 Job Analyses + 1 User
- **Total Red Flags Found**: 34+ unique indicators
- **Analysis Success Rate**: 100%

---

## 🔄 Regenerating Seed Data

To refresh the database with new seed data, run:

```bash
cd server
node seedDatabase.js
```

⚠️ **Warning**: This will clear all existing data and recreate it.

---

## 📋 Data Structure

Each job analysis includes:
- Job Description
- Recruiter Information
- Company Details
- Risk Scores (Rule-based + AI)
- Final Risk Level
- List of Red Flags Detected
- Timestamps

---

## 🎓 Learning Scenarios

Use this data to:
1. **Learn red flags** - Compare fake vs real postings
2. **Test features** - Try search, filter, and analysis
3. **Demo analysis** - Show how the detection works
4. **Risk assessment** - Understand scoring system

---

**Status**: ✅ Seed Data Ready  
**Date Created**: April 8, 2026  
**Total Companies**: 7  
**Total Records**: 9 Analyses
