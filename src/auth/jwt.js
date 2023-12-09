// jwt.js

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'contrasenyaProvisional';

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '10m' });
};

const verifyToken = (token) => {
  try {
    const tokenValue = token.split(' ')[1];
    return jwt.verify(tokenValue, secretKey);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      // Token inválido
      logger.error('Error en la verificación del token:', error.message);
    } else if (error.name === 'TokenExpiredError') {
      // Token expirado
      logger.error('Error en la verificación del token:', 'Token expirado');
    } else {
      logger.error('Error en la verificación del token:', error.message);
    }
    throw error;
  }
};

module.exports = { generateToken, verifyToken };