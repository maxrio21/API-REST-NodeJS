// MiModelo.js
const pool = require('../db/dbConfig');
const logger = require('../utils/logger');

const createConsumo = async (consumoData) => {
  try {
    console.log(consumoData)
    const result = await pool.query(
      'INSERT INTO CONSUMO (id_usuario, id_alimento, nombre_alimento, cantidad, tipo_comida, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [consumoData.id_usuario, consumoData.id_alimento, consumoData.nombre_alimento, consumoData.cantidad, consumoData.tipo_comida, consumoData.fecha]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en createConsumo: ${error.message}`);
    throw error;
  }
};

const getConsumoById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM CONSUMO WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getConsumoById: ${error.message}`);
    throw error;
  }
};

const getAllConsumos = async (idUsuario) => {
  try {
    const result = await pool.query('SELECT * FROM CONSUMO WHERE id_usuario = $1', [idUsuario]);
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAllConsumos: ${error.message}`);
    throw error;
  }
};
const updateConsumo = async (id, nuevoConsumo) => {
  try {
    const result = await pool.query(
      'UPDATE CONSUMO SET id_usuario = $1, id_alimento = $2, nombre_alimento = $3, cantidad = $4, tipo_comida = $5, fecha = $6 WHERE id = $7 RETURNING *',
      [...Object.values(nuevoConsumo), id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en updateConsumo: ${error.message}`);
    throw error;
  }
};

const deleteConsumo = async (id) => {
  try {
    await pool.query('DELETE FROM CONSUMO WHERE id = $1', [id]);
  } catch (error) {
    logger.error(`Error en deleteConsumo: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createConsumo,
  getConsumoById,
  getAllConsumos,
  updateConsumo,
  deleteConsumo,
};
