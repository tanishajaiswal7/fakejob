import React, { useState, useEffect } from 'react';
import { getAnalysisHistory } from '../utils/api';
import '../styles/history.css';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchHistory();
  }, [filter]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const riskLevel = filter === 'all' ? null : filter;
      const result = await getAnalysisHistory(50, riskLevel);
      if (result.success) {
        setHistory(result.data);
      } else {
        setError('Failed to load history');
      }
    } catch (err) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelClass = (level) => `risk-level-${level.toLowerCase()}`;
  const getRiskLevelEmoji = (level) => {
    switch (level) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-page">
      <div className="container">
        <div className="history-header">
          <h1>Analysis History</h1>
          <p>View all your previous job offer analyses</p>
        </div>

        <div className="filter-section">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Analyses
            </button>
            <button
              className={`filter-btn ${filter === 'Low' ? 'active' : ''}`}
              onClick={() => setFilter('Low')}
            >
              🟢 Low Risk
            </button>
            <button
              className={`filter-btn ${filter === 'Medium' ? 'active' : ''}`}
              onClick={() => setFilter('Medium')}
            >
              🟡 Medium Risk
            </button>
            <button
              className={`filter-btn ${filter === 'High' ? 'active' : ''}`}
              onClick={() => setFilter('High')}
            >
              🔴 High Risk
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {loading && (
          <div className="loading">
            <div className="loader"></div>
            <p>Loading history...</p>
          </div>
        )}

        {!loading && history.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No analyses found</h2>
            <p>Start analyzing job offers to build your history</p>
          </div>
        )}

        {!loading && history.length > 0 && (
          <div className="history-table-wrapper">
            <div className="history-stats">
              <div className="stat">
                <span className="stat-label">Total Analyses</span>
                <span className="stat-value">{history.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">High Risk</span>
                <span className="stat-value stat-danger">
                  {history.filter(h => h.riskLevel === 'High').length}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Medium Risk</span>
                <span className="stat-value stat-warning">
                  {history.filter(h => h.riskLevel === 'Medium').length}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Low Risk</span>
                <span className="stat-value stat-success">
                  {history.filter(h => h.riskLevel === 'Low').length}
                </span>
              </div>
            </div>

            <div className="history-list">
              {history.map((item) => (
                <div key={item._id} className={`history-item card ${getRiskLevelClass(item.riskLevel)}`}>
                  <div className="history-item-header">
                    <div className="history-item-title">
                      <span className="risk-emoji">{getRiskLevelEmoji(item.riskLevel)}</span>
                      <div>
                        <h3>{item.companyName}</h3>
                        <p className="history-date">{formatDate(item.createdAt)}</p>
                      </div>
                    </div>
                    <div className="history-item-score">
                      <span className={`risk-badge ${getRiskLevelClass(item.riskLevel)}`}>
                        {item.riskLevel} - {item.finalRiskScore}%
                      </span>
                    </div>
                  </div>

                  <div className="history-item-details">
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{item.recruiterEmail}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Red Flags:</span>
                      <span className="detail-value">{item.redFlags.length} detected</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Analysis:</span>
                      <span className="detail-value">
                        Rule-based: {item.ruleBasedScore}% | AI: {(item.aiProbability * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {item.redFlags.length > 0 && (
                    <div className="history-item-flags">
                      <strong>Flags:</strong>
                      <ul>
                        {item.redFlags.slice(0, 3).map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                        {item.redFlags.length > 3 && (
                          <li>...and {item.redFlags.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
