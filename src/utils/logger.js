const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path');

// Define el formato del log
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Configura los transportes (destinos) para los logs
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
  new winston.transports.File({ filename: path.join(__dirname, '../../logs/combined.log') }),
];

// Crea el logger de Winston
const logger = winston.createLogger({
  format: combine(
    label({ label: 'Log' }),
    timestamp(),
    logFormat
  ),
  transports: transports,
});

module.exports = logger;
