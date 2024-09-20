const jwt = require('jsonwebtoken');

const generateJWT = (payload, options = {}) => {
  const secretKey = process.env.JWT_SECRET;
  const defaultOptions = {
    expiresIn: process.env.JWT_EXPIRATION || '1d'
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return jwt.sign(payload, secretKey, mergedOptions);
};

module.exports = generateJWT;