import { body, validationResult } from 'express-validator';

// Sanitize and validate job data
export const validateJobInput = [
  body('jobDescription')
    .trim()
    .isLength({ min: 20, max: 5000 })
    .withMessage('Job description must be between 20 and 5000 characters'),

  body('recruiterEmail')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email format'),

  body('phoneNumber')
    .trim()
    .matches(/^[\d\s\-\+\(\)]{7,15}$/)
    .withMessage('Invalid phone number format'),

  body('companyName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),

  body('companyWebsite')
    .optional()
    .trim()
    .custom(value => {
      if (value === '' || value === null) return true;
      try {
        new URL(value.startsWith('http') ? value : `https://${value}`);
        return true;
      } catch (e) {
        throw new Error('Invalid website URL');
      }
    })
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Input sanitization utilities
export const sanitizeInput = (text) => {
  if (!text) return '';
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateURL = (url) => {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch (e) {
    return false;
  }
};
