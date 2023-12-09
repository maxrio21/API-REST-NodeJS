// usuarioController.js
const usuarioService = require('../services/usuarioService');
const perfilService = require('../services/perfilService');
const { createUserSchema } = require('../schemas/usuarioSchema');
const { updateUserSchema } = require('../schemas/usuarioSchema');
const multerConfig = require('../utils/multerConfig');
const logger = require('../utils/logger'); // Asegúrate de ajustar la ruta correctamente

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await usuarioService.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    logger.error(`Error al obtener todos los usuarios: ${error.message}`);
    res.status(500).send(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await usuarioService.getOneUser(req.params.userId);
    res.json(user);
  } catch (error) {
    logger.error(`Error al obtener el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send(`Error al obtener el usuario ${req.params.userId}`);
  }
};


const createNewUser = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validación fallida al crear un nuevo usuario: ${error.message}`);
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const createdUser = await usuarioService.createNewUser(value);

    if (createdUser && createdUser.id) {
      const objetivoData = {
        objetivo_calorias: 0,
        porcentaje_proteinas: 30,
        porcentaje_grasas: 30,
        porcentaje_hidratos: 40,
        objetivo_peso: 0,
        perdida_semanal: 0,
        tipo_objetivo: 'Bajar peso',
      };

      const preferenciaData = {
        tipo_dieta: 'Dieta equilibrada',
        actividad: 'Moderada',
        peso_actual: 0,
        notificaciones: true,
        desayuno: true,
        almuerzo: true,
        comida: true,
        merienda: true,
        cena: true,
      };

      await Promise.all([
        perfilService.createObjetivoForUser(createdUser.id, objetivoData),
        perfilService.createPreferenciaForUser(createdUser.id, preferenciaData)
      ]);      
      
      res.json(createdUser);
    } else {
      // Manejar el caso en que createdUser.id es nulo
      res.status(500).send('El usuario a registrar y existe');
    }

  } catch (error) {
    logger.error(`Error al crear un nuevo usuario: ${error.message}`);
    res.status(500).send('Error al crear un nuevo usuario');
  }
};

const updateOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { error: validationError, value: validatedData } = updateUserSchema.validate(req.body, { abortEarly: false });

    if (validationError) {
      logger.warn(`Validación fallida al actualizar el usuario ${userId}: ${validationError.message}`);
      return res.status(400).json({ errors: validationError.details.map(detail => detail.message) });
    }

    logger.info("Validated Data:", validatedData);

    const multerUpload = multerConfig.single('avatar');

    multerUpload(req, res, async function (err) {
      if (err) {
        logger.error(`Error al subir la imagen para el usuario ${userId}: ${err.message}`);
        return res.status(500).send('Error al subir la imagen');
      }

      const newImagePath = req.file ? req.file.filename : null;

      logger.info("New Image Path:", newImagePath);

      const updatedUser = await usuarioService.updateOneUser(userId, validatedData, newImagePath);

      logger.info("Updated User:", updatedUser);

      res.json(updatedUser);
    });
  } catch (error) {
    logger.error(`Error al actualizar el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send('Error al actualizar el usuario');
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await Promise.all([
      usuarioService.deleteOneUser(userId),
      perfilService.deleteObjetivoForUser(userId),
      perfilService.deletePreferenciaForUser(userId)
    ]);

    res.send(`Usuario ${userId} eliminado correctamente`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al eliminar el usuario ${req.params.userId}`);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, contrasenya } = req.body;
    const result = await usuarioService.authenticateUser(email, contrasenya);

    if (result) {
      logger.info("Autenticación exitosa. Token:", result.token);
      res.json({ token: result.token, isAdmin: result.isAdmin });
    } else {
      logger.warn("Credenciales incorrectas. Autenticación fallida.");
      res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
    }
  } catch (error) {
    logger.error(`Error en la autenticación del usuario: ${error.message}`);
    res.status(500).send('Error en la autenticación del usuario');
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  authenticateUser
};