// alimentoModel.js
const pool = require('../db/dbConfig');
const logger = require('../utils/logger');

const getAllAlimentos = async () => {
  try {
    const result = await pool.query('SELECT * FROM alimento');
    logger.info('getAllAlimentos ejecutado exitosamente');
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAllAlimentos: ${error.message}`);
    throw error;
  }
};

const getAlimentosByUserId = async (id_usuario) => {
  try {
    const result = await pool.query('SELECT * FROM alimento WHERE id_usuario = $1', [parseInt(id_usuario)]);
    logger.info(`getAlimentosByUserId ejecutado exitosamente para id_usuario: ${id_usuario}`);
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAlimentosByUserId: ${error.message}`);
    throw error;
  }
};

const getAlimentosByNameAndUserId = async (name, id_usuario) => {
  try {
    const result = await pool.query('SELECT * FROM alimento WHERE nombre ILIKE $1 AND id_usuario = $2', [`%${name}%`,id_usuario]);
    logger.info(`getAlimentosByNameAndUserId ejecutado exitosamente para nombre: ${name}, id_usuario: ${id_usuario}`);
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAlimentosByNameAndUserId: ${error.message}`);
    throw error;
  }
};

const getOneAlimento = async (alimentoId) => {
  try {
    const result = await pool.query('SELECT * FROM alimento WHERE id = $1', [alimentoId]);
    logger.info(`getOneAlimento ejecutado exitosamente para alimentoId: ${alimentoId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getOneAlimento: ${error.message}`);
    throw error;
  }
};

const createAlimento = async (alimentoData) => {
  try {
    const {
      id_usuario,
      nombre,
      kcalorias,
      proteinas,
      grasas,
      hidratos
    } = alimentoData;

    const result = await pool.query(
      'INSERT INTO alimento (id_usuario, nombre, kcalorias, proteinas, grasas, hidratos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id_usuario, nombre, kcalorias, proteinas, grasas, hidratos]
    );

    logger.info('createAlimento ejecutado exitosamente');
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en createAlimento: ${error.message}`);
    throw error;
  }
};

const updateAlimento = async (alimentoId, updatedAlimentoData) => {
  try {
    const result = await pool.query(
      'UPDATE alimento SET nombre = $1, kcalorias = $2, proteinas = $3, grasas = $4, hidratos = $5 WHERE id = $6 RETURNING *',
      [
        updatedAlimentoData.nombre,
        updatedAlimentoData.kcalorias,
        updatedAlimentoData.proteinas,
        updatedAlimentoData.grasas,
        updatedAlimentoData.hidratos,
        alimentoId
      ]
    );

    logger.info(`updateAlimento ejecutado exitosamente para alimentoId: ${alimentoId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en updateAlimento: ${error.message}`);
    throw error;
  }
};

const deleteAlimento = async (alimentoId) => {
  try {
    await pool.query('DELETE FROM alimento WHERE id = $1', [alimentoId]);
    logger.info(`deleteAlimento ejecutado exitosamente para alimentoId: ${alimentoId}`);
  } catch (error) {
    logger.error(`Error en deleteAlimento: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getAllAlimentos,
  getAlimentosByUserId,
  getAlimentosByNameAndUserId,
  getOneAlimento,
  createAlimento,
  updateAlimento,
  deleteAlimento,
};