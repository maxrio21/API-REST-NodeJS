// alimentoRoutes.js
const express = require('express');
const router = express.Router();
const alimentoController = require('../../controllers/alimentoController');
const { authenticateAndExtractUserId } = require('../../auth/middlewareAuthentication');  

router
  .get('/local', alimentoController.getAllLocalAlimentos)
  .get('/', authenticateAndExtractUserId, alimentoController.getAllAlimentos)
  .get('/:alimentoId', alimentoController.getOneAlimento)
  .post('/', authenticateAndExtractUserId, alimentoController.createNewAlimento)
  .put('/:alimentoId', authenticateAndExtractUserId, alimentoController.updateOneAlimento)
  .delete('/:alimentoId', authenticateAndExtractUserId, alimentoController.deleteOneAlimento);
module.exports = router;