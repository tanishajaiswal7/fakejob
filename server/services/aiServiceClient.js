import axios from 'axios';

class AIServiceClient {
  constructor() {
    this.baseURL = process.env.AI_SERVICE_URL || 'http://localhost:5001';
    this.timeout = 10000;
  }

  async analyzeJobDescription(jobDescription) {
    try {
      const response = await axios.post(
        `${this.baseURL}/predict`,
        { job_description: jobDescription },
        { timeout: this.timeout }
      );

      return {
        aiProbability: response.data.fraud_probability || 0,
        aiConfidence: response.data.confidence || 0,
        success: true
      };
    } catch (error) {
      console.error('AI Service Error:', error.message);
      // Return neutral score if AI service fails
      return {
        aiProbability: 0.5,
        aiConfidence: 0,
        success: false,
        error: error.message
      };
    }
  }

  async healthCheck() {
    try {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: 5000
      });
      return response.data.status === 'ok';
    } catch (error) {
      console.error('AI Service Health Check Failed:', error.message);
      return false;
    }
  }
}

export default new AIServiceClient();
