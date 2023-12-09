// alimentoService.js
const Alimento = require('../models/alimentoModel');
const axios = require('axios');
const logger = require('../utils/logger');

const externalFoodFormatter = (jsonExterno) => {
  return {
    nombre: jsonExterno.name,
    kcalorias: jsonExterno.calories,
    proteinas: jsonExterno.protein_g,
    grasas: jsonExterno.fat_total_g,
    hidratos: jsonExterno.carbohydrates_total_g,
  };
};

const getLocalAlimentos = async () => {
  try {
    const result = await Alimento.getAllAlimentos();
    logger.info('getLocalAlimentos ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en getLocalAlimentos: ${error.message}`);
    throw error;
  }
};

const getLocalAlimentosByName = async (name) => {
  try {
    const result = await Alimento.getAlimentosByName(name);
    logger.info(`getLocalAlimentosByName ejecutado exitosamente para name: ${name}`);
    return result;
  } catch (error) {
    logger.error(`Error en getLocalAlimentosByName: ${error.message}`);
    throw error;
  }
};

const getLocalAlimentosByUserId = async (id_usuario) => {
  try {
    const result = await Alimento.getAlimentosByUserId(id_usuario);
    logger.info(`getLocalAlimentosByUserId ejecutado exitosamente para id_usuario: ${id_usuario}`);
    return result;
  } catch (error) {
    logger.error(`Error en getLocalAlimentosByUserId: ${error.message}`);
    throw error;
  }
};

const getLocalAlimentosByNameAndUserId = async (name, id_usuario) => {
  try {
    const result = await Alimento.getAlimentosByNameAndUserId(name, id_usuario);
    logger.info(`getLocalAlimentosByNameAndUserId ejecutado exitosamente para name: ${name} y id_usuario: ${id_usuario}`);
    return result;
  } catch (error) {
    logger.error(`Error en getLocalAlimentosByNameAndUserId: ${error.message}`);
    throw error;
  }
};

const getExternalAlimentos = async (query) => {
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
      headers: {
        'X-Api-Key': process.env.API_KEY
      },
    });

    const tranformedAlimentos = response.data.map(externalFoodFormatter);
    logger.info(`getExternalAlimentos ejecutado exitosamente para query: ${query}`);
    return tranformedAlimentos;
  } catch (error) {
    logger.error(`Error en getExternalAlimentos: ${error.message}`);
    throw error;
  }
};

const getOneAlimento = async (alimentoId) => {
  try {
    const result = await Alimento.getOneAlimento(alimentoId);
    logger.info(`getOneAlimento ejecutado exitosamente para alimentoId: ${alimentoId}`);
    return result;
  } catch (error) {
    logger.error(`Error en getOneAlimento: ${error.message}`);
    throw error;
  }
};

const createAlimento = async (alimentoData) => {
  try {
    const result = await Alimento.createAlimento(alimentoData);
    logger.info('createAlimento ejecutado exitosamente');
    return result;
  } catch (error) {
    logger.error(`Error en createAlimento: ${error.message}`);
    throw error;
  }
};

const updateAlimento = async (alimentoId, updatedAlimentoData) => {
  try {
    const result = await Alimento.updateAlimento(alimentoId, updatedAlimentoData);
    logger.info(`updateAlimento ejecutado exitosamente para alimentoId: ${alimentoId}`);
    return result;
  } catch (error) {
    logger.error(`Error en updateAlimento: ${error.message}`);
    throw error;
  }
};

const deleteAlimento = async (alimentoId) => {
  try {
    const result = await Alimento.deleteAlimento(alimentoId);
    logger.info(`deleteAlimento ejecutado exitosamente para alimentoId: ${alimentoId}`);
    return result;
  } catch (error) {
    logger.error(`Error en deleteAlimento: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getLocalAlimentos,
  getLocalAlimentosByName,
  getLocalAlimentosByUserId,
  getLocalAlimentosByNameAndUserId,
  getExternalAlimentos,
  getOneAlimento,
  createAlimento,
  updateAlimento,
  deleteAlimento,
};