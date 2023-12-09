const jwt = require('./jwt');
const logger = require('../utils/logger');

const authenticateAndExtractUserId = (req, res, next) => {
  // Obtener el token del encabezado "Authorization"
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    logger.error('Acceso no autorizado. Falta el token.');
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Falta el token.' });
  }

  try {
    // Verificar el token y obtener la información del usuario autenticado
    const usuarioAutenticado = jwt.verifyToken(token);

    // Almacenar toda la información del usuario en req.usuario para su uso posterior
    req.usuario = usuarioAutenticado;

    // Llamar a la siguiente función en la cadena de middlewares
    next();
  } catch (error) {
    logger.error('Error en la verificación del token:', error);
    return res.status(401).json({ mensaje: 'Token inválido.' });
  }
};

module.exports = {
  authenticateAndExtractUserId,
};

// ... (código existente)
/*
const authenticateAndExtractUserId = (req, res, next) => {
  // Obtener el token del encabezado "Authorization"
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    logger.error('Acceso no autorizado. Falta el token.');
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Falta el token.' });
  }

  try {
    // Verificar el token y obtener la información del usuario autenticado
    const usuarioAutenticado = jwt.verifyToken(token);

    // Almacenar toda la información del usuario en req.usuario para su uso posterior
    req.usuario = usuarioAutenticado;

    // Llamar a la siguiente función en la cadena de middlewares
    next();
  } catch (error) {
    logger.error('Error en la verificación del token:', error);
    return res.status(401).json({ mensaje: 'Token inválido.' });
  }
};
*/

module.exports = {
  authenticateAndExtractUserId,
};
