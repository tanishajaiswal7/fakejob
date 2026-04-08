// Rule-based detection engine for fake job offers

const SUSPICIOUS_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.com'];

const RED_FLAG_KEYWORDS = [
  'registration fee',
  'training fee',
  'deposit',
  'payment required',
  'upfront payment',
  'pay to apply',
  'buy our course',
  'investment required',
  'guarantee',
  'risk-free',
  'money back',
  'certified',
  'guaranteed job',
  'work from home easy money',
  'no experience needed',
  'make money fast',
  'urgent hiring',
  'limited time offer',
  'act now',
  'bitcoin',
  'cryptocurrency',
  'western union',
  'money transfer',
  'wire transfer'
];

const SALARY_RED_FLAGS = {
  intern: { min: 0, max: 25000 }, // Annual salary for internships
  entryLevel: { min: 20000, max: 60000 },
  midLevel: { min: 50000, max: 150000 },
  senior: { min: 80000, max: 300000 }
};

class RuleBasedDetector {
  analyzeJobOffer(jobData) {
    const redFlags = [];
    let score = 0;

    // 1. Check email domain
    const emailDomain = this.extractEmailDomain(jobData.recruiterEmail);
    if (SUSPICIOUS_EMAIL_DOMAINS.includes(emailDomain)) {
      redFlags.push('Email uses personal domain instead of company domain');
      score += 20;
    }

    // 2. Check for payment-related keywords
    const jobDescLower = jobData.jobDescription.toLowerCase();
    RED_FLAG_KEYWORDS.forEach(keyword => {
      if (jobDescLower.includes(keyword)) {
        redFlags.push(`Contains suspicious keyword: "${keyword}"`);
        score += 10;
      }
    });

    // 3. Check phone number format
    if (!this.isValidPhoneNumber(jobData.phoneNumber)) {
      redFlags.push('Phone number format appears invalid');
      score += 15;
    }

    // 4. Check for missing company website (for certain company sizes)
    if (!jobData.companyWebsite || jobData.companyWebsite.trim() === '') {
      redFlags.push('No company website provided');
      score += 10;
    } else if (!this.isValidURL(jobData.companyWebsite)) {
      redFlags.push('Company website format appears invalid');
      score += 15;
    }

    // 5. Check for unrealistic salary claims
    const salaryRange = this.extractSalaryRange(jobDescLower);
    if (salaryRange) {
      const isUnrealistic = this.isSalaryUnrealistic(salaryRange, jobDescLower);
      if (isUnrealistic) {
        redFlags.push(`Unrealistic salary for position: $${salaryRange.min}-$${salaryRange.max}`);
        score += 25;
      }
    }

    // 6. Check for vague company information
    if (jobData.companyName.length < 2) {
      redFlags.push('Company name too vague');
      score += 10;
    }

    // 7. Check for urgency/pressure tactics
    const urgencyKeywords = ['urgent', 'limited time', 'act now', 'apply immediately', 'limited positions'];
    let urgencyCount = 0;
    urgencyKeywords.forEach(keyword => {
      if (jobDescLower.includes(keyword)) urgencyCount++;
    });
    if (urgencyCount >= 2) {
      redFlags.push('Excessive urgency/pressure tactics detected');
      score += 15;
    }

    // 8. Check for common spelling errors
    const spellingErrors = this.detectCommonErrorPatterns(jobDescLower);
    if (spellingErrors > 3) {
      redFlags.push(`Multiple spelling/grammar errors detected (${spellingErrors} found)`);
      score += 10;
    }

    // Cap score at 100
    score = Math.min(score, 100);

    return {
      ruleBasedScore: score,
      redFlags: redFlags,
      flagCount: redFlags.length
    };
  }

  extractEmailDomain(email) {
    const parts = email.split('@');
    return parts.length === 2 ? parts[1].toLowerCase() : '';
  }

  isValidPhoneNumber(phone) {
    // Basic phone validation - at least 7 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  }

  isValidURL(url) {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch (e) {
      return false;
    }
  }

  extractSalaryRange(text) {
    // Look for salary patterns like "$50,000" or "50000-60000" or "$50k-$60k"
    const patterns = [
      /\$?([\d,]+(?:\.\d{2})?)\s*(?:-|to)\s*\$?([\d,]+(?:\.\d{2})?)\s*(?:per year|\/year|annually|p\.a\.)?/gi,
      /\$?([\d,]+)k\s*(?:-|to)\s*\$?([\d,]+)k/gi
    ];

    for (const pattern of patterns) {
      const match = pattern.exec(text);
      if (match) {
        let min = parseInt(match[1].replace(/,/g, ''));
        let max = parseInt(match[2].replace(/,/g, ''));

        // If in 'k' format, multiply by 1000
        if (match[0].includes('k')) {
          min *= 1000;
          max *= 1000;
        }

        return { min, max };
      }
    }
    return null;
  }

  isSalaryUnrealistic(salaryRange, jobDesc) {
    // Check if it's an internship
    const isInternship =
      jobDesc.includes('intern') ||
      jobDesc.includes('internship') ||
      jobDesc.includes('student');

    if (isInternship) {
      // Internships should be low paying
      if (salaryRange.max > 40000) {
        return true;
      }
    }

    // Check for extremely high entry-level positions
    if (jobDesc.includes('entry') || jobDesc.includes('junior')) {
      if (salaryRange.max > 100000) {
        return true;
      }
    }

    return false;
  }

  detectCommonErrorPatterns(text) {
    const commonErrors = [
      /\b(recieve|occured|begining|seperating|definately|succeded|occassion)\b/gi,
      /\s{2,}/g // Multiple spaces
    ];

    let errorCount = 0;
    commonErrors.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        errorCount += matches.length;
      }
    });

    return errorCount;
  }
}

export default new RuleBasedDetector();
