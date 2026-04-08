import React, { useState } from 'react';
import { API } from '../utils/api';
import '../styles/auth-fancy.css';

export default function Signup({ navigate, setAuth }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { name, email, password, confirmPassword } = formData;

      if (!name || !email || !password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await API.post('/auth/register', {
        name,
        email,
        password,
        confirmPassword
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuth(response.data.user);
        navigate('/analyze');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup failed');
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
            <div className="auth-logo">🚀</div>
            <h1 className="text-gradient">Create Account</h1>
            <p>Join us to protect yourself from fake job offers</p>
          </div>

          {/* Error Alert with Animation */}
          {error && (
            <div className="alert alert-danger animate-slide-in-right">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="auth-form">
            {/* Name Field */}
            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
              <label htmlFor="name">👤 Full Name</label>
              <div className="input-wrapper">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className="form-input"
                  required
                />
                <div className="input-border"></div>
              </div>
            </div>

            {/* Email Field */}
            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
              <label htmlFor="email">📧 Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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
              <small className="form-helper">Minimum 6 characters</small>
            </div>

            {/* Confirm Password Field */}
            <div className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
              <label htmlFor="confirmPassword">✓ Confirm Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
                <div className="input-border"></div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary btn-lg auth-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner-sm"></span>
                  Creating account...
                </>
              ) : (
                '🎯 Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Footer - Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-button text-gradient-button"
                onClick={() => navigate('/login')}
              >
                Sign in here
              </button>
            </p>
            <p className="auth-disclaimer">
              We'll never share your data with anyone
            </p>
          </div>
        </div>

        {/* Side Illustration */}
        <div className="auth-illustration">
          <div className="illustration-content animate-float">
            <div className="illustration-icon">🎓</div>
            <h3>Secure Your Future</h3>
            <p>Join thousands protecting their careers</p>
            <div className="features-list">
              <div className="feature-item">✓ Real-time alerts</div>
              <div className="feature-item">✓ Instant verification</div>
              <div className="feature-item">✓ Always free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
