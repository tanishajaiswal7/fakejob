import ruleBasedDetector from './ruleBasedDetector.js';
import aiServiceClient from './aiServiceClient.js';
import JobAnalysis from '../models/JobAnalysis.js';

class AnalysisService {
  async analyzeJobOffer(jobData, userIP) {
    try {
      // Step 1: Run rule-based analysis
      const ruleBasedResult = ruleBasedDetector.analyzeJobOffer(jobData);

      // Step 2: Get AI prediction
      const aiResult = await aiServiceClient.analyzeJobDescription(
        jobData.jobDescription
      );

      // Step 3: Combine scores (50% rule-based, 50% AI)
      const aiScore = aiResult.aiProbability * 100;
      const finalRiskScore = (ruleBasedResult.ruleBasedScore * 0.5 + aiScore * 0.5);

      // Step 4: Determine risk level
      let riskLevel = 'Low';
      if (finalRiskScore >= 60) {
        riskLevel = 'High';
      } else if (finalRiskScore >= 40) {
        riskLevel = 'Medium';
      }

      // Step 5: Save to database
      const analysis = new JobAnalysis({
        jobDescription: jobData.jobDescription,
        userId: jobData.userId,
        recruiterEmail: jobData.recruiterEmail,
        phoneNumber: jobData.phoneNumber,
        companyName: jobData.companyName,
        companyWebsite: jobData.companyWebsite,
        ruleBasedScore: ruleBasedResult.ruleBasedScore,
        aiProbability: aiResult.aiProbability,
        finalRiskScore: Math.round(finalRiskScore),
        riskLevel: riskLevel,
        redFlags: ruleBasedResult.redFlags,
        userIP: userIP,
        isProcessed: true
      });

      await analysis.save();

      return {
        id: analysis._id,
        riskScore: Math.round(finalRiskScore),
        riskLevel: riskLevel,
        redFlags: ruleBasedResult.redFlags,
        ruleBasedScore: ruleBasedResult.ruleBasedScore,
        aiProbability: aiResult.aiProbability,
        aiConfidence: aiResult.aiConfidence,
        suggestions: this.generateSuggestions(riskLevel, ruleBasedResult.redFlags),
        timestamp: analysis.createdAt
      };
    } catch (error) {
      console.error('Analysis Error:', error);
      throw error;
    }
  }

  generateSuggestions(riskLevel, redFlags) {
    const baseSuggestions = [
      'Always verify company contact info independently',
      'Check the company website and contact them directly',
      'Never pay any upfront fees, deposits, or training costs',
      'Research the company on Glassdoor, LinkedIn, or Indeed',
      'Be wary of positions offering unusually high salaries'
    ];

    if (riskLevel === 'High') {
      return [
        '🚨 AVOID THIS OFFER - Multiple red flags detected',
        'Report this to the platform and job board',
        ...baseSuggestions,
        'Contact the company through official channels only',
        'Never share personal banking information'
      ];
    } else if (riskLevel === 'Medium') {
      return [
        '⚠️ PROCEED WITH CAUTION - Some concerns detected',
        'Ask for company references and verifiable information',
        ...baseSuggestions,
        'Request more details about the role and compensation'
      ];
    } else {
      return [
        '✅ APPEARS LEGITIMATE - Low risk indicators',
        'Still exercise standard job search best practices',
        ...baseSuggestions
      ];
    }
  }

  async getAnalysisHistory(limit = 10, userId) {
    try {
      const analyses = await JobAnalysis.find({ userId: userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-jobDescription -phoneNumber'); // Hide sensitive data in list
      return analyses;
    } catch (error) {
      console.error('History Error:', error);
      throw error;
    }
  }

  async getAnalysisByRiskLevel(riskLevel, userId) {
    try {
      const analyses = await JobAnalysis.find({ riskLevel: riskLevel, userId: userId })
        .sort({ createdAt: -1 })
        .select('-jobDescription -phoneNumber');
      return analyses;
    } catch (error) {
      console.error('Filter Error:', error);
      throw error;
    }
  }

  async getAnalysisById(id, userId) {
    try {
      const analysis = await JobAnalysis.findById(id);
      if (!analysis) {
        throw new Error('Analysis not found');
      }
      // Ensure user can only access their own analyses
      if (analysis.userId.toString() !== userId) {
        throw new Error('Not authorized to access this analysis');
      }
      return analysis;
    } catch (error) {
      console.error('Get Analysis Error:', error);
      throw error;
    }
  }

  async getUserStats(userId) {
    try {
      const analyses = await JobAnalysis.find({ userId: userId });
      const totalAnalysis = analyses.length;
      const highRisk = analyses.filter(a => a.riskLevel === 'High').length;
      const mediumRisk = analyses.filter(a => a.riskLevel === 'Medium').length;
      const lowRisk = analyses.filter(a => a.riskLevel === 'Low').length;
      const avgRiskScore = totalAnalysis > 0 
        ? Math.round(analyses.reduce((sum, a) => sum + a.finalRiskScore, 0) / totalAnalysis)
        : 0;

      return {
        totalAnalysis,
        highRisk,
        mediumRisk,
        lowRisk,
        avgRiskScore
      };
    } catch (error) {
      console.error('Stats Error:', error);
      throw error;
    }
  }
}

export default new AnalysisService();
