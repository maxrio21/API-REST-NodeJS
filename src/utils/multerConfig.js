// utils/multerConfig.js
const multer = require('multer');
const path = require('path');
const logger = require('./logger');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = './src/uploads/';
    logger.info(`Guardando archivo en: ${destinationPath}`);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    logger.info(`Nombre del archivo: ${fileName}`);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
