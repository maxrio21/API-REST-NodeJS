const Publicacion = require('../models/foroModel');
const logger = require('../utils/logger');

const getAllPublicaciones = async () => {
  try {
    const result = await Publicacion.getAllPublicaciones();
    logger.info('getAllPublicaciones ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en getAllPublicaciones: ${error.message}`);
    throw error;
  }
};

const getOnePublicacion = async (publicacionId) => {
  try {
    const result = await Publicacion.getOnePublicacion(publicacionId);
    logger.info(`getOnePublicacion ejecutado exitosamente para publicacionId: ${publicacionId}`);
    return result;
  } catch (error) {
    logger.error(`Error en getOnePublicacion: ${error.message}`);
    throw error;
  }
};

const getAllPublicacionesByUser = async (userId) => {
  try {
    const result = await Publicacion.getAllPublicacionesByUser(userId);
    logger.info(`getAllPublicacionesByUser ejecutado exitosamente para userId: ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en getAllPublicacionesByUser: ${error.message}`);
    throw error;
  }
};

const createPublicacion = async (publicacionData, userId) => {
  try {
    const result = await Publicacion.createPublicacion(publicacionData, userId);
    logger.info('createPublicacion ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en createPublicacion: ${error.message}`);
    throw error;
  }
};

const deletePublicacion = async (publicacionId) => {
  try {
    await Publicacion.deletePublicacion(publicacionId);
    logger.info(`deletePublicacion ejecutado exitosamente para publicacionId: ${publicacionId}`);
  } catch (error) {
    logger.error(`Error en deletePublicacion: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getAllPublicaciones,
  getOnePublicacion,
  getAllPublicacionesByUser,
  createPublicacion,
  deletePublicacion,
};
