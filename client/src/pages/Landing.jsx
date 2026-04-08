import React from 'react';
import { Link } from '../App';
import '../styles/landing.css';

export default function Landing({ navigate, auth }) {
  const handleStartClick = () => {
    if (auth) {
      navigate('/analyze');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Detect Fake Jobs & Internships Instantly</h1>
            <p className="hero-subtitle">
              Protect yourself from employment scams with AI-powered analysis. 
              Get real-time risk scores and actionable insights.
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={handleStartClick}
            >
              {auth ? 'Start Analyzing' : 'Get Started Free'}
            </button>
            {!auth && (
              <p className="hero-note">✓ No credit card required · ✓ Free account · ✓ Instant analysis</p>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Offers Analyzed</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps grid grid-3">
            <div className="step-card card">
              <div className="step-icon">📝</div>
              <h3>1. Input Details</h3>
              <p>Enter the job description, recruiter info, and company details</p>
            </div>
            <div className="step-card card">
              <div className="step-icon">🔍</div>
              <h3>2. AI Analysis</h3>
              <p>Our AI scans for fraud patterns and red flags automatically</p>
            </div>
            <div className="step-card card">
              <div className="step-icon">📊</div>
              <h3>3. Get Results</h3>
              <p>Receive a detailed risk score and safety recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Why Use JobShield AI?</h2>
          <div className="features-grid grid grid-2">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h3>AI-Powered Detection</h3>
              <p>Advanced machine learning models trained on thousands of job postings</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h3>Real-Time Analysis</h3>
              <p>Instant results with detailed breakdowns of detected issues</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h3>Red Flag Detection</h3>
              <p>Identifies suspicious patterns like payment requests and unrealistic offers</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h3>Safety Tips</h3>
              <p>Personalized recommendations to protect yourself from scams</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h3>Job History</h3>
              <p>Track your analysis history and identify patterns</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h3>100% Free</h3>
              <p>No registration required, no hidden costs, completely confidential</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Red Flags */}
      <section className="red-flags">
        <div className="container">
          <h2>Watch Out for These Red Flags</h2>
          <div className="flags-list">
            <div className="flag">
              <span className="flag-emoji">💰</span>
              <p><strong>Payment Requests:</strong> "Registration fee", "Training cost", "Deposit required"</p>
            </div>
            <div className="flag">
              <span className="flag-emoji">📧</span>
              <p><strong>Wrong Email Domain:</strong> Using gmail.com instead of company domain</p>
            </div>
            <div className="flag">
              <span className="flag-emoji">💸</span>
              <p><strong>Unrealistic Salary:</strong> Too-good-to-be-true compensation packages</p>
            </div>
            <div className="flag">
              <span className="flag-emoji">⏰</span>
              <p><strong>Urgency Tactics:</strong> "Limited time", "Act now", "Urgent hiring"</p>
            </div>
            <div className="flag">
              <span className="flag-emoji">🌐</span>
              <p><strong>No Company Website:</strong> Legitimate companies have online presence</p>
            </div>
            <div className="flag">
              <span className="flag-emoji">📝</span>
              <p><strong>Poor Grammar:</strong> Multiple spelling and grammar errors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Users Say</h2>
          <div className="testimonials-grid grid grid-3">
            <div className="testimonial card">
              <p className="testimonial-text">"This tool saved me from a scam! The detailed analysis helped me identify red flags instantly."</p>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Student</span>
              </div>
            </div>
            <div className="testimonial card">
              <p className="testimonial-text">"Fast, accurate, and easy to use. I've recommended it to all my friends looking for jobs."</p>
              <div className="testimonial-author">
                <strong>John D.</strong>
                <span>Job Seeker</span>
              </div>
            </div>
            <div className="testimonial card">
              <p className="testimonial-text">"Great resource for students! The explanations are clear and the risk scoring is spot on."</p>
              <div className="testimonial-author">
                <strong>Emma R.</strong>
                <span>Recent Graduate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box card">
            <h2>Ready to Protect Yourself?</h2>
            <p>Analyze your next job offer before you apply</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/analyze')}
            >
              Start Free Analysis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
