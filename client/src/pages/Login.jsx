import React, { useState, useEffect } from 'react';
import { API } from '../utils/api';
import '../styles/auth-fancy.css';

export default function Login({ navigate, setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const response = await API.post('/auth/login', { email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuth(response.data.user);
        navigate('/analyze');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="auth-wrapper">
        <div className="auth-box animate-scale-in">
          {/* Animated Header */}
          <div className="auth-header">
            <div className="auth-logo">🛡️</div>
            <h1 className="text-gradient">Welcome Back</h1>
            <p>Sign in to continue protecting yourself</p>
          </div>

          {/* Error Alert with Animation */}
          {error && (
            <div className="alert alert-danger animate-slide-in-right">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="auth-form">
            {/* Email Field */}
            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
              <label htmlFor="email">📧 Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="form-input"
                  required
                />
                <div className="input-border"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
              <label htmlFor="password">🔐 Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
                <div className="input-border"></div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="link-button"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary btn-lg auth-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner-sm"></span>
                  Signing in...
                </>
              ) : (
                '🚀 Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Social Login (Optional) */}
          <div className="social-login">
            <button type="button" className="btn-social">
              <span>G</span>
            </button>
            <button type="button" className="btn-social">
              <span>f</span>
            </button>
            <button type="button" className="btn-social">
              <span>★</span>
            </button>
          </div>

          {/* Footer - Sign Up Link */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="link-button text-gradient-button"
                onClick={() => navigate('/signup')}
              >
                Create one now
              </button>
            </p>
            <p className="auth-disclaimer">
              By signing in, you agree to our{' '}
              <a href="#terms">Terms of Service</a> and{' '}
              <a href="#privacy">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Side Illustration */}
        <div className="auth-illustration">
          <div className="illustration-content animate-float">
            <div className="illustration-icon">🎯</div>
            <h3>Protect Your Career</h3>
            <p>Detect job scams before they strike</p>
            <div className="features-list">
              <div className="feature-item">✓ Real-time analysis</div>
              <div className="feature-item">✓ 99.8% accuracy</div>
              <div className="feature-item">✓ Instant results</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
