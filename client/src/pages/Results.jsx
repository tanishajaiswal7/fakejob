import React, { useEffect, useState } from 'react';
import '../styles/results.css';

export default function Results({ result, navigate }) {
  const [displayResult, setDisplayResult] = useState(result);

  useEffect(() => {
    if (!result) {
      navigate('/analyze');
    }
  }, [result, navigate]);

  if (!displayResult) {
    return (
      <div className="results-page">
        <div className="container">
          <div className="loading">
            <div className="loader"></div>
            <p>Loading results...</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    riskScore,
    riskLevel,
    redFlags,
    suggestions,
    ruleBasedScore,
    aiProbability,
    id
  } = displayResult;

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'High':
        return '#dc2626';
      case 'Medium':
        return '#f59e0b';
      case 'Low':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  const getRiskLevelEmoji = (level) => {
    switch (level) {
      case 'High':
        return '🔴';
      case 'Medium':
        return '🟡';
      case 'Low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-wrapper">
          {/* Risk Score Card */}
          <div className={`risk-card card risk-${riskLevel.toLowerCase()}`}>
            <div className="risk-header">
              <div className="risk-emoji">
                {getRiskLevelEmoji(riskLevel)}
              </div>
              <div className="risk-info">
                <h1 className="risk-title">{riskLevel} Risk Level</h1>
                <p className="risk-subtitle">
                  {riskLevel === 'High' && 'This job offer shows multiple warning signs'}
                  {riskLevel === 'Medium' && 'This job offer requires careful verification'}
                  {riskLevel === 'Low' && 'This job offer appears to be legitimate'}
                </p>
              </div>
            </div>

            <div className="risk-score">
              <div className="score-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={getRiskLevelColor(riskLevel)}
                    strokeWidth="8"
                    strokeDasharray={`${(riskScore / 100) * 283} 283`}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                  />
                </svg>
                <div className="score-text">
                  <span className="score-number">{riskScore}</span>
                  <span className="score-label">Risk Score</span>
                </div>
              </div>

              <div className="score-breakdown">
                <div className="breakdown-item">
                  <div className="breakdown-label">Rule-Based Analysis</div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${ruleBasedScore}%` }}
                    ></div>
                  </div>
                  <div className="breakdown-value">{ruleBasedScore}%</div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-label">AI Detection</div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${(aiProbability * 100).toFixed(0)}%` }}
                    ></div>
                  </div>
                  <div className="breakdown-value">{(aiProbability * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="results-content">
            {/* Red Flags */}
            {redFlags.length > 0 && (
              <div className="red-flags-section card">
                <h2>🚨 Detected Red Flags ({redFlags.length})</h2>
                <ul className="red-flags-list">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="red-flag-item">
                      <span className="flag-icon">⚠️</span>
                      <span className="flag-text">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safety Suggestions */}
            <div className="suggestions-section card">
              <h2>💡 Safety Recommendations</h2>
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Do Next */}
            <div className="next-steps card">
              <h2>What to Do Next?</h2>
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Research the Company</h4>
                    <p>Search for the company on Google, check their official website, and verify the phone number</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Verify Contact Information</h4>
                    <p>Call the company's official number (not the one provided) and ask about the position</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Never Pay Upfront</h4>
                    <p>Legitimate employers never ask for registration or processing fees before hiring</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Trust Your Instincts</h4>
                    <p>If it feels wrong, it probably is. Take your time and don't rush into decisions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/analyze')}
              >
                Analyze Another Offer
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/history')}
              >
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
