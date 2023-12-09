// perfilRoutes.js
const express = require('express');
const router = express.Router();
const perfilController = require('../../controllers/perfilController');

// Rutas relacionadas con los objetivos
router.post('/:userId', perfilController.createObjetivoForUser);
router.post('/:userId', perfilController.createPreferenciaForUser);

router.get('/:userId', perfilController.getObjetivoForUser);
router.get('/:userId', perfilController.getPreferenciaForUser);

router.put('/:userId', perfilController.updateObjetivoForUser);
router.put('/:userId', perfilController.updatePreferenciaForUser);

router.delete('/:userId', perfilController.deleteObjetivoForUser);  
router.delete('/:userId', perfilController.deletePreferenciaForUser);


module.exports = router;