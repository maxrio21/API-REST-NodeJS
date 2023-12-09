// nutricionRoutes.js
const express = require('express');
const router = express.Router();
const nutricionController = require('../../controllers/nutricionController');
const { authenticateAndExtractUserId } = require('../../auth/middlewareAuthentication');  

//router.get('/resumen', nutricionController.getResumen);
//router.get('/alimentacion', nutricionController.getAlimentacion);

router
    .post('/', authenticateAndExtractUserId, nutricionController.createConsumo)
    .get('/:id', authenticateAndExtractUserId, nutricionController.getConsumoById)
    .get('/', authenticateAndExtractUserId, nutricionController.getAllConsumos)
    .put('/:id', authenticateAndExtractUserId, nutricionController.updateConsumo)
    .delete('/:id', authenticateAndExtractUserId, nutricionController.deleteConsumo);


module.exports = router;
