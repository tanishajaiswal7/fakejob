import React, { useState } from 'react';
import { analyzeJob } from '../utils/api';
import '../styles/form.css';

export default function AnalysisForm({ navigate }) {
  const [formData, setFormData] = useState({
    jobDescription: '',
    recruiterEmail: '',
    phoneNumber: '',
    companyName: '',
    companyWebsite: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    } else if (formData.jobDescription.trim().length < 20) {
      newErrors.jobDescription = 'Job description must be at least 20 characters';
    }

    if (!formData.recruiterEmail.trim()) {
      newErrors.recruiterEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.recruiterEmail)) {
      newErrors.recruiterEmail = 'Invalid email format';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{7,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name too short';
    }

    if (formData.companyWebsite.trim()) {
      try {
        new URL(formData.companyWebsite.startsWith('http') ? formData.companyWebsite : `https://${formData.companyWebsite}`);
      } catch (e) {
        newErrors.companyWebsite = 'Invalid website URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const result = await analyzeJob(formData);
      if (result.success) {
        setSuccessMessage('Analysis complete! Redirecting to results...');
        setTimeout(() => {
          navigate('/results', { result: result.data });
        }, 1500);
      } else {
        setErrors({ submit: result.message || 'Analysis failed' });
      }
    } catch (error) {
      setErrors({ 
        submit: error.message || 'Failed to analyze job offer. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      jobDescription: '',
      recruiterEmail: '',
      phoneNumber: '',
      companyName: '',
      companyWebsite: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-wrapper">
          <div className="form-header">
            <h1>Analyze Job Offer</h1>
            <p>Enter the details below to check if a job or internship is legitimate</p>
          </div>

          {successMessage && (
            <div className="success-message">✓ {successMessage}</div>
          )}

          {errors.submit && (
            <div className="error-message">✗ {errors.submit}</div>
          )}

          <form onSubmit={handleSubmit} className="analysis-form">
            <div className="form-group">
              <label htmlFor="jobDescription">
                Job Description <span className="required">*</span>
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the complete job description here..."
                value={formData.jobDescription}
                onChange={handleChange}
                disabled={loading}
                className={errors.jobDescription ? 'error' : ''}
              />
              {errors.jobDescription && (
                <span className="field-error">{errors.jobDescription}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="e.g., Google, Microsoft"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.companyName ? 'error' : ''}
                />
                {errors.companyName && (
                  <span className="field-error">{errors.companyName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="companyWebsite">
                  Company Website <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="companyWebsite"
                  name="companyWebsite"
                  placeholder="e.g., www.company.com"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.companyWebsite ? 'error' : ''}
                />
                {errors.companyWebsite && (
                  <span className="field-error">{errors.companyWebsite}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="recruiterEmail">
                  Recruiter Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="recruiterEmail"
                  name="recruiterEmail"
                  placeholder="recruiter@company.com"
                  value={formData.recruiterEmail}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.recruiterEmail ? 'error' : ''}
                />
                {errors.recruiterEmail && (
                  <span className="field-error">{errors.recruiterEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+1 (555) 123-456"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.phoneNumber ? 'error' : ''}
                />
                {errors.phoneNumber && (
                  <span className="field-error">{errors.phoneNumber}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader-inline"></span> Analyzing...
                  </>
                ) : (
                  'Analyze Job Offer'
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-large"
                onClick={handleReset}
                disabled={loading}
              >
                Clear Form
              </button>
            </div>
          </form>

          <div className="form-info">
            <h3>💡 Tips for Better Results:</h3>
            <ul>
              <li>Copy the entire job description from the source</li>
              <li>Include the exact email and phone used for contact</li>
              <li>Provide the company website if available</li>
              <li>Be accurate with company names</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
