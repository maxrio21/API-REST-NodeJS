// foroRoutes.js
const express = require('express');
const router = express.Router();
const foroController = require('../../controllers/foroController');
const { authenticateAndExtractUserId } = require('../../auth/middlewareAuthentication');

// Middleware para autenticación en todas las rutas de publicaciones
router.use(authenticateAndExtractUserId);

router
  .get('/', foroController.getAllPublicaciones)
  .get('/:publicacionId', foroController.getOnePublicacion)
  .get('/usuario/:userId', foroController.getAllPublicacionesByUser)
  .post('/', foroController.createPublicacion)
  .delete('/:publicacionId', foroController.deletePublicacion);

module.exports = router;