import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import JobAnalysis from './models/JobAnalysis.js';

dotenv.config();

const addSeedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Connected to MongoDB');

    // Get all existing users
    const users = await User.find();
    if (users.length === 0) {
      console.log('❌ No users found. Please create a user first.');
      process.exit(1);
    }

    console.log(`✅ Found ${users.length} user(s)`);

    // Delete only job analyses (keep users)
    await JobAnalysis.deleteMany({});
    console.log('🧹 Cleared existing analyses');

    // Dummy job analyses data with Indian companies
    const jobAnalysesTemplate = [
      // FAKE JOB: Visa sponsorship scam from TCS
      {
        jobDescription: `
          TCS Hiring - Senior Software Engineer
          Location: Bangalore, India
          
          We are looking for experienced software engineers for our Bangalore office.
          
          Requirements:
          - 5+ years experience in Java/Python
          - Bachelor's degree in CS
          
          Benefits:
          - Visa sponsorship available (Processing fee: ₹50,000 required upfront)
          - Salary up to ₹25 LPA
          - Free relocation assistance
          
          Apply now and get instant offer letter!
          Reply to this email: tcs.recruitment@gmail.com (not @tcs.com)`,
        recruiterEmail: 'tcs.recruitment@gmail.com',
        phoneNumber: '+91-8765432109',
        companyName: 'TCS (Tata Consultancy Services)',
        companyWebsite: '',
        ruleBasedScore: 85,
        aiProbability: 0.92,
        finalRiskScore: 88,
        riskLevel: 'High',
        redFlags: [
          'Payment request for visa sponsorship',
          'Email domain mismatch (Gmail instead of company domain)',
          'Unrealistic salary offer',
          'Pressure to apply immediately',
          'No company website provided',
          'Spelling errors in job description'
        ],
        isProcessed: true
      },

      // REAL JOB: Genuine TCS posting
      {
        jobDescription: `
          Tata Consultancy Services - Software Developer
          Location: Bangalore, India
          
          Tata Consultancy Services Limited is an IT services, consulting and business solutions organization.
          
          Job Description:
          TCS is hiring for Software Developer role across various technologies.
          
          Requirements:
          - Bachelor's degree in Engineering/Computer Science
          - Strong programming skills in Java/Python/C++
          - Problem solving abilities
          
          Benefits:
          - Competitive salary with performance bonus
          - Health insurance and medical facilities
          - Career development programs
          - Flexible work environment
          
          Application Process:
          1. Visit https://www.tcs.com/careers
          2. Upload your resume
          3. Complete online assessment
          4. Technical interview rounds
          
          Official email: careers@tcs.com`,
        recruiterEmail: 'careers@tcs.com',
        phoneNumber: '+91-9876543210',
        companyName: 'Tata Consultancy Services',
        companyWebsite: 'https://www.tcs.com',
        ruleBasedScore: 15,
        aiProbability: 0.05,
        finalRiskScore: 12,
        riskLevel: 'Low',
        redFlags: [],
        isProcessed: true
      },

      // FAKE JOB: Infosys impersonation with data entry
      {
        jobDescription: `
          URGENT HIRING - Infosys Data Entry Operator
          
          Work from home opportunity!
          Salary: ₹30,000 per month for part-time work
          
          What you need to do:
          1. Copy data from images to Excel sheets
          2. No experience required
          3. Flexible timings
          
          To start immediately:
          1. Send ₹5,000 as registration fee
          2. We will provide training material
          
          Contact: infosys.opportunities@outlook.com
          WhatsApp: https://wa.me/919876543210`,
        recruiterEmail: 'infosys.opportunities@outlook.com',
        phoneNumber: '+91-9876543210',
        companyName: 'Infosys Limited',
        companyWebsite: '',
        ruleBasedScore: 92,
        aiProbability: 0.95,
        finalRiskScore: 94,
        riskLevel: 'High',
        redFlags: [
          'Registration fee required',
          'Email domain is personal (outlook.com)',
          'Unrealistic salary for part-time work',
          'Too many red flags detected',
          'Uses WhatsApp for official communication',
          'Guarantees high pay with minimal qualifications'
        ],
        isProcessed: true
      },

      // FAKE JOB: HCL Technologies visa scam
      {
        jobDescription: `
          HCL Technologies - International Assignment
          
          Get hired and work in USA with H1B visa sponsorship!
          
          Position: Senior Developer
          Location: Initially India, then USA
          Salary: $120,000 per annum
          
          We handle everything:
          - Visa processing fee: ₹75,000 (refundable after 6 months)
          - Flight tickets
          - Accommodation
          
          Hurry! Only 5 positions left!
          
          Email: hcl.usa.jobs@mail.com
          Contact: +91-7654321098`,
        recruiterEmail: 'hcl.usa.jobs@mail.com',
        phoneNumber: '+91-7654321098',
        companyName: 'HCL Technologies',
        companyWebsite: '',
        ruleBasedScore: 88,
        aiProbability: 0.90,
        finalRiskScore: 89,
        riskLevel: 'High',
        redFlags: [
          'Upfront visa processing fee requested',
          'Email domain not official',
          'Pressure with limited positions claim',
          'Too good to be true salary offer',
          'No proper company verification',
          'International scam pattern detected'
        ],
        isProcessed: true
      },

      // REAL JOB: Genuine Accenture posting
      {
        jobDescription: `
          Accenture - Technology Analyst
          
          Join Accenture and grow your career!
          
          Location: Bangalore/Pune/Hyderabad, India
          Experience: 0-2 years
          
          About the role:
          - Work with latest technologies
          - Support global projects
          - Learn from industry experts
          - Career progression opportunities
          
          Requirements:
          - Bachelor's degree in any field
          - Strong communication skills
          - Passion for technology
          - Problem-solving mindset
          
          Benefits:
          - Competitive salary and benefits
          - Health insurance
          - Learning and development programs
          - Career growth in global organization
          
          How to apply:
          Visit: https://www.accenture.com/in-en/careers
          
          Contact: india.careers@accenture.com`,
        recruiterEmail: 'india.careers@accenture.com',
        phoneNumber: '+91-1234567890',
        companyName: 'Accenture India',
        companyWebsite: 'https://www.accenture.com/in-en',
        ruleBasedScore: 18,
        aiProbability: 0.08,
        finalRiskScore: 14,
        riskLevel: 'Low',
        redFlags: [],
        isProcessed: true
      },

      // FAKE JOB: Amazon phishing attempt
      {
        jobDescription: `
          Amazon India - Customer Service Executive
          
          Work from home - Part time
          Salary: ₹35,000 per month
          
          No experience needed!
          
          Job responsibilities:
          - Handle customer queries via email
          - Basic data entry
          - Flexible working hours
          
          To apply:
          1. Send your resume to: amazon.hiring.india@ymail.com
          2. Download training material from: bit.ly/amazon-training (₹999)
          3. Complete 2-hour test
          4. Start earning immediately!
          
          Urgent openings! Apply now!`,
        recruiterEmail: 'amazon.hiring.india@ymail.com',
        phoneNumber: '+91-8765432101',
        companyName: 'Amazon',
        companyWebsite: '',
        ruleBasedScore: 86,
        aiProbability: 0.88,
        finalRiskScore: 87,
        riskLevel: 'High',
        redFlags: [
          'Suspicious email domain',
          'Unrealistic salary with no experience',
          'Requires paid training material',
          'Shortening URL for training suspicious',
          'Lack of official company domain',
          'Phishing attempt detected'
        ],
        isProcessed: true
      },

      // REAL JOB: Microsoft genuine position
      {
        jobDescription: `
          Microsoft India - Software Engineer (Entry-Level)
          
          Location: Bangalore, India
          Experience: 0-1 years
          
          About Microsoft:
          Microsoft is a technology powerhouse with a mission to empower every person and organization on the planet to achieve more.
          
          Role Overview:
          We are looking for passionate software engineers to join our Bangalore development center.
          
          Responsibilities:
          - Develop software solutions using .NET/Java
          - Collaborate with cross-functional teams
          - Contribute to product development
          - Participate in code reviews
          
          Requirements:
          - Bachelor's degree in Computer Science or related field
          - Strong programming fundamentals
          - Problem-solving skills
          - Excellent communication
          
          Benefits:
          - Competitive salary and stock options
          - Comprehensive health coverage
          - Professional development opportunities
          - Inclusive workplace culture
          
          Apply at: https://careers.microsoft.com/us/en/search-results
          Email: msjobs-india@microsoft.com`,
        recruiterEmail: 'msjobs-india@microsoft.com',
        phoneNumber: '+91-2233445566',
        companyName: 'Microsoft India',
        companyWebsite: 'https://careers.microsoft.com',
        ruleBasedScore: 12,
        aiProbability: 0.03,
        finalRiskScore: 10,
        riskLevel: 'Low',
        redFlags: [],
        isProcessed: true
      },

      // FAKE JOB: Freelance scam
      {
        jobDescription: `
          Remote Data Analyst Work - Work from Home
          
          Hiring immediately!
          Pay: ₹20,000-₹50,000 per project
          
          What you'll do:
          - Analyze business data
          - Create reports
          - Part-time basis
          
          How it works:
          1. Send resume to: dataanalyst.work@gmail.com
          2. Pay ₹2,000 for project access
          3. Receive projects and earn!
          
          Benefits:
          - Flexible timings
          - Work from anywhere
          - Immediate payments
          
          Thousands are already earning with us!
          Don't miss out!`,
        recruiterEmail: 'dataanalyst.work@gmail.com',
        phoneNumber: '+91-6543210987',
        companyName: 'Unknown Company',
        companyWebsite: '',
        ruleBasedScore: 91,
        aiProbability: 0.91,
        finalRiskScore: 91,
        riskLevel: 'High',
        redFlags: [
          'Paid project access required',
          'Personal email domain used',
          'Vague about company details',
          'Pressure to apply immediately',
          'Unrealistic earning claims',
          'Classic freelance scam pattern'
        ],
        isProcessed: true
      },

      // REAL JOB: Goldman Sachs legitimate posting
      {
        jobDescription: `
          Goldman Sachs - Technology Analyst
          
          Location: Bangalore, India
          
          At Goldman Sachs, we are committed to investing in people and creating opportunities for professional growth.
          
          Position: Technology Analyst (Full-time)
          Experience: 0-2 years
          
          About the Role:
          - Work on high-impact technology projects
          - Develop and test software solutions
          - Collaborate with senior engineers
          - Contribute to our global technology platform
          
          Key Requirements:
          - Bachelor's degree in Computer Science/Engineering
          - Strong programming skills
          - Problem-solving capabilities
          - Excellent team collaboration skills
          
          What We Offer:
          - Competitive compensation package
          - Health and wellness benefits
          - Professional development programs
          - Mentorship from industry experts
          - Inclusive workplace culture
          
          Application Process:
          Visit: https://www.goldmansachs.com/careers
          Upload your resume and apply online
          
          Contact: india-careers@gs.com`,
        recruiterEmail: 'india-careers@gs.com',
        phoneNumber: '+91-2255667788',
        companyName: 'Goldman Sachs',
        companyWebsite: 'https://www.goldmansachs.com',
        ruleBasedScore: 16,
        aiProbability: 0.04,
        finalRiskScore: 11,
        riskLevel: 'Low',
        redFlags: [],
        isProcessed: true
      }
    ];

    // Create job analyses for each user
    let totalCreated = 0;
    for (const user of users) {
      const jobAnalyses = jobAnalysesTemplate.map(job => ({
        ...job,
        userId: user._id
      }));
      
      const createdAnalyses = await JobAnalysis.insertMany(jobAnalyses);
      totalCreated += createdAnalyses.length;
      
      // Update user analysis count
      user.analysisCount = createdAnalyses.length;
      await user.save();
      
      console.log(`✅ Added ${createdAnalyses.length} analyses to ${user.name}`);
    }

    console.log('\n📊 SEED DATA SUMMARY:');
    console.log('═══════════════════════════════════════════');
    console.log('✅ Total Records Created:');
    console.log(`   - Job Analyses: ${totalCreated}`);
    console.log(`   - Users Updated: ${users.length}`);
    console.log('\n📈 Breakdown by Risk Level:');
    console.log(`   - 🔴 High Risk: 5 (Fake Jobs)`);
    console.log(`   - 🟢 Low Risk: 4 (Legitimate Jobs)`);
    console.log('\n👥 Users with Data:');
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email})`);
    });
    console.log('\n🏢 Companies Represented:');
    console.log('   - TCS (Real + Fake)');
    console.log('   - Infosys (Fake)');
    console.log('   - HCL Technologies (Fake)');
    console.log('   - Accenture (Real)');
    console.log('   - Amazon (Fake)');
    console.log('   - Microsoft (Real)');
    console.log('   - Goldman Sachs (Real)');
    console.log('\n✨ Seed data added successfully!');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding seed data:', error);
    process.exit(1);
  }
};

addSeedData();
