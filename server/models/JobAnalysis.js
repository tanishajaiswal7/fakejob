import mongoose from 'mongoose';

const jobAnalysisSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recruiterEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    companyWebsite: {
      type: String,
      trim: true,
      default: null
    },
    ruleBasedScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    aiProbability: {
      type: Number,
      min: 0,
      max: 1,
      default: 0
    },
    finalRiskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    redFlags: {
      type: [String],
      default: []
    },
    userIP: {
      type: String,
      default: null
    },
    isProcessed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('JobAnalysis', jobAnalysisSchema);
