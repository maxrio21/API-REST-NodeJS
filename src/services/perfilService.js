// objetivoService.js
const Objetivo = require('../models/perfilModel');
const Preferencia = require('../models/perfilModel');

const logger = require('../utils/logger');

const createObjetivoForUser = async (userId, objetivoData) => {
  try {
    const result = await Objetivo.createObjetivoForUser(userId, objetivoData);
    logger.info(`createObjetivoForUser ejecutado exitosamente para el usuario ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en createObjetivoForUser: ${error.message}`);
    throw error;
  }
};

const getObjetivoForUser = async (userId) => {
  try {
    const result = await Objetivo.getObjetivoForUser(userId);
    logger.info(`getObjetivoForUser ejecutado exitosamente para el usuario ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en getObjetivoForUser: ${error.message}`);
    throw error;
  }
};

const updateObjetivoForUser = async (userId, updatedObjetivoData) => {
  try {
    const result = await Objetivo.updateObjetivoForUser(userId, updatedObjetivoData);
    logger.info(`updateObjetivoForUser ejecutado exitosamente para el usuario ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en updateObjetivoForUser: ${error.message}`);
    throw error;
  }
};

const deleteObjetivoForUser = async (userId) => {
  try {
    await Objetivo.deleteObjetivoForUser(userId);
    logger.info(`deleteObjetivoForUser ejecutado exitosamente para el usuario ${userId}`);
  } catch (error) {
    logger.error(`Error en deleteObjetivoForUser: ${error.message}`);
    throw error;
  }
};

//Preferencias
const createPreferenciaForUser = async (userId, preferenciaData) => {
  try {
    const result = await Preferencia.createPreferenciaForUser(userId, preferenciaData);
    logger.info(`createPreferenciaForUser ejecutado exitosamente para el usuario ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en createPreferenciaForUser: ${error.message}`);
    throw error;
  }
};

const getPreferenciaForUser = async (userId) => {
  try {
    const result = await Preferencia.getPreferenciaForUser(userId);
    logger.info(`getPreferenciaForUser ejecutado exitosamente para el usuario ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en getPreferenciaForUser: ${error.message}`);
    throw error;
  }
};

const updatePreferenciaForUser = async (userId, updatedPreferenciaData) => {
  try {
    const result = await Preferencia.updatePreferenciaForUser(userId, updatedPreferenciaData);
    logger.info(`updatePreferenciaForUser ejecutado exitosamente para el usuario ${userId}`);
    return result;
  } catch (error) {
    logger.error(`Error en updatePreferenciaForUser: ${error.message}`);
    throw error;
  }
};

const deletePreferenciaForUser = async (userId) => {
  try {
    await Preferencia.deletePreferenciaForUser(userId);
    logger.info(`deletePreferenciaForUser ejecutado exitosamente para el usuario ${userId}`);
  } catch (error) {
    logger.error(`Error en deletePreferenciaForUser: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createObjetivoForUser,
  createPreferenciaForUser,
  getObjetivoForUser,
  getPreferenciaForUser,
  updateObjetivoForUser,
  updatePreferenciaForUser,
  deleteObjetivoForUser,
  deletePreferenciaForUser
};
