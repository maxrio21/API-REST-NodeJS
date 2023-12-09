// objetivoModel.js
const pool = require('../db/dbConfig');
const logger = require('../utils/logger');

const createObjetivoForUser = async (userId, objetivoData) => {
  try {
    const result = await pool.query(
      'INSERT INTO objetivo (id, objetivo_calorias, porcentaje_proteinas, porcentaje_grasas, porcentaje_hidratos, objetivo_peso, perdida_semanal, tipo_objetivo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [userId, ...Object.values(objetivoData)]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en createObjetivoForUser: ${error.message}`);
    throw error;
  }
};

const getObjetivoForUser = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM objetivo WHERE id = $1', [userId]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getObjetivoForUser: ${error.message}`);
    throw error;
  }
};

const updateObjetivoForUser = async (userId, updatedObjetivoData) => {
  try {
    const { objetivo_calorias, porcentaje_proteinas, porcentaje_grasas, porcentaje_hidratos, objetivo_peso, perdida_semanal, tipo_objetivo } = updatedObjetivoData;

    const result = await pool.query(
      'UPDATE objetivo SET objetivo_calorias = $1, porcentaje_proteinas = $2, porcentaje_grasas = $3, porcentaje_hidratos = $4, objetivo_peso = $5, perdida_semanal = $6, tipo_objetivo = $7 WHERE id = $8 RETURNING *',
      [objetivo_calorias, porcentaje_proteinas, porcentaje_grasas, porcentaje_hidratos, objetivo_peso, perdida_semanal, tipo_objetivo, userId]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en updateObjetivoForUser: ${error.message}`);
    throw error;
  }
};

const deleteObjetivoForUser = async (userId) => {
  try {
    await pool.query('DELETE FROM objetivo WHERE id = $1', [userId]);
  } catch (error) {
    logger.error(`Error en deleteObjetivoForUser: ${error.message}`);
    throw error;
  }
};

//Preferencias

const createPreferenciaForUser = async (userId, preferenciaData) => {
  try {
    const result = await pool.query(
      'INSERT INTO preferencia (id, tipo_dieta, actividad, peso_actual, notificaciones, desayuno, almuerzo, comida, merienda, cena) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [userId, ...Object.values(preferenciaData)]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en createPreferenciaForUser: ${error.message}`);
    throw error;
  }
};

const getPreferenciaForUser = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM preferencia WHERE id = $1', [userId]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getPreferenciaForUser: ${error.message}`);
    throw error;
  }
};

const updatePreferenciaForUser = async (userId, updatedPreferenciaData) => {
  try {
    const {
      tipo_dieta,
      actividad,
      peso_actual,
      notificaciones,
      desayuno,
      almuerzo,
      comida,
      merienda,
      cena
    } = updatedPreferenciaData;

    const result = await pool.query(
      'UPDATE preferencia SET tipo_dieta = $1, actividad = $2, peso_actual = $3, notificaciones = $4, desayuno = $5, almuerzo = $6, comida = $7, merienda = $8, cena = $9 WHERE id = $10 RETURNING *',
      [tipo_dieta, actividad, peso_actual, notificaciones, desayuno, almuerzo, comida, merienda, cena, userId]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en updatePreferenciaForUser: ${error.message}`);
    throw error;
  }
};

const deletePreferenciaForUser = async (userId) => {
  try {
    await pool.query('DELETE FROM preferencia WHERE id = $1', [userId]);
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
  deletePreferenciaForUser,
};
