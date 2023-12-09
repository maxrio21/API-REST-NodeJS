const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usuarioController');
const { authenticateAndExtractUserId } = require('../../auth/middlewareAuthentication');

// Aplicar middleware a todas las rutas excepto a POST /authenticate
router.use((req, res, next) => {
  if ((
    req.path !== '/authenticate' || req.method !== 'POST') && (
    req.path !== '/' || req.method !== 'POST')) {
    authenticateAndExtractUserId(req, res, next);  
  } else {
    next();
  }
});

router
  .get('/', userController.getAllUsers)
  .get('/:userId', userController.getOneUser)
  .post('/', userController.createNewUser)
  .post('/authenticate', userController.authenticateUser)
  .put('/:userId', userController.updateOneUser)
  .delete('/:userId', userController.deleteOneUser);

module.exports = router;