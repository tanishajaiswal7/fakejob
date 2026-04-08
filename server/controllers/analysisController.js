import analysisService from '../services/analysisService.js';

export const analyzeJob = async (req, res, next) => {
  try {
    const {
      jobDescription,
      recruiterEmail,
      phoneNumber,
      companyName,
      companyWebsite
    } = req.body;

    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userId = req.user.id;

    const result = await analysisService.analyzeJobOffer(
      {
        jobDescription,
        recruiterEmail,
        phoneNumber,
        companyName,
        companyWebsite: companyWebsite || '',
        userId
      },
      userIP
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisHistory = async (req, res, next) => {
  try {
    const { limit = 10, riskLevel } = req.query;
    const userId = req.user.id;

    let analyses;
    if (riskLevel) {
      analyses = await analysisService.getAnalysisByRiskLevel(riskLevel, userId);
    } else {
      analyses = await analysisService.getAnalysisHistory(parseInt(limit), userId);
    }

    res.json({
      success: true,
      data: analyses
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await analysisService.getAnalysisById(id, userId);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const stats = await analysisService.getUserStats(userId);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

export const healthCheck = async (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy'
  });
};
