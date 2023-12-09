//usuarioService.js
const Usuario = require('../models/usuarioModel');
const pool = require('../db/dbConfig');
const bcryptUtils = require('../utils/bcryptUtils');
const jwt = require('../auth/jwt');
const fs = require('fs').promises;
const logger = require('../utils/logger');

const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../../dev.env')
})

const getAllUsers = async () => {
  try {
    const result = await Usuario.getAllUsers();
    logger.info('getAllUsers ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en getAllUsers: ${error.message}`);
    throw error;
  }
};

const getOneUser = async (userId) => {
  try {
    const result = await Usuario.getOneUser(userId);
    logger.info(`getOneUser ejecutado exitosamente para userID: ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en getOneUser: ${error.message}`);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await Usuario.getUserByEmail(email);
    logger.info(`getUserByEmail ejecutado exitosamente para email: ${email}`);
    return result;
  } catch (error) {
    logger.error(`Error en getUserByEmail: ${error.message}`);
    throw error;
  }
};

const getUserByNicknameOrEmail = async (nickname, email) => {
  try {
    const result = await Usuario.getUserByNicknameOrEmail(nickname, email);
    return result;
  } catch (error) {
    logger.error(`Error en getUserByNicknameOrEmail: ${error.message}`);
    throw error;
  }
};

const createNewUser = async (userData) => {
  try {
    const existingUser = await getUserByNicknameOrEmail(userData.nickname, userData.email);

    if (existingUser) {
      logger.warn('Ya existe un usuario con el mismo nickname o correo.');
      return { message: 'El usuario ya existe. Por favor, elija un nickname o correo diferente.', user: null };
    }

    // Hash de la contraseña
    const hashedPassword = await bcryptUtils.generateHash(userData.contrasenya);

    // Resto del código para la creación del usuario
    const result = await Usuario.createNewUser({
      ...userData,
      contrasenya: hashedPassword,
    });

    logger.info('createNewUser ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en createNewUser: ${error.message}`);
    throw error;
  }
};

const updateOneUser = async (userId, updatedUserData, newImagePath) => {
  try {
    logger.info(`updateOneUser - Actualizando Usuario - ID de Usuario: ${userId}`);
    logger.info(`Datos Actualizados del Usuario: ${JSON.stringify(updatedUserData)}`);
    logger.info(`Nueva Ruta de la Imagen: ${newImagePath}`);

    const oldImagePath = await getOldImagePath(userId);

    if (oldImagePath !== "./uploads/null") {
      await deleteOldImage(oldImagePath);
    }

    const result = await Usuario.updateOneUser(userId, updatedUserData, newImagePath);

    logger.info('updateOneUser ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en updateOneUser: ${error.message}`);
    throw error;
  }
};

const deleteOneUser = async (userId) => {
  try {
    const oldImagePath = await getOldImagePath(userId);

    await deleteOldImage(oldImagePath);

    const result = await Usuario.deleteOneUser(userId);
    logger.info(`deleteOneUser ejecutado exitosamente para userID: ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en deleteOneUser: ${error.message}`);
    throw error;
  }
};

const getOldImagePath = async (userId) => {
  try {
    const result = await pool.query('SELECT avatar FROM usuario WHERE id = $1', [userId]);
    return result.rows[0] ? process.env.UPLOADS + result.rows[0].avatar : null;
  } catch (error) {
    logger.error(`Error en getOldImagePath: ${error.message}`);
    throw error;
  }
};

const deleteOldImage = async (oldImagePath) => {
  if (oldImagePath && oldImagePath !== null) {
    try {
      logger.info(`Eliminando la imagen anterior - Ruta: ${oldImagePath}`);
      await fs.unlink(oldImagePath);
      logger.info('Imagen anterior eliminada exitosamente');
    } catch (error) {
      logger.error(`Error al eliminar la imagen anterior: ${error.message}`);
    }
  }
};

const authenticateUser = async (email, contrasenya) => {
  try {
    const usuario = await Usuario.getUserByEmail(email);

    if (!usuario) {
      logger.info("Usuario no encontrado en la base de datos");
    }

    if (usuario && await bcryptUtils.comparePassword(contrasenya, usuario.contrasenya)) {
      const isAdmin = usuario.admin === true;
      const token = jwt.generateToken({ id: usuario.id, email: usuario.email, isAdmin });
      logger.info("Autenticación exitosa");
      return { token, isAdmin };
    }

    logger.info("Autenticación fallida");
    return null;
  } catch (error) {
    logger.error(`Error en authenticateUser: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getUserByEmail,
  getUserByNicknameOrEmail,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  authenticateUser
};