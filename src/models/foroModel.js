const pool = require('../db/dbConfig');
const logger = require('../utils/logger');

const getAllPublicaciones = async () => {
  try {
    const result = await pool.query('SELECT * FROM PUBLICACION');
    logger.info('getAllPublicaciones ejecutado exitosamente');
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAllPublicaciones: ${error.message}`);
    throw error;
  }
};

const getOnePublicacion = async (publicacionId) => {
  try {
    const result = await pool.query('SELECT * FROM PUBLICACION WHERE id = $1', [publicacionId]);
    logger.info(`getOnePublicacion ejecutado exitosamente para publicacionId: ${publicacionId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getOnePublicacion: ${error.message}`);
    throw error;
  }
};

const getAllPublicacionesByUser = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM PUBLICACION WHERE id_usuario = $1', [userId]);
    logger.info(`getAllPublicacionesByUser ejecutado exitosamente para userId: ${userId}`);
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAllPublicacionesByUser: ${error.message}`);
    throw error;
  }
};

const createPublicacion = async (publicacionData, userId) => {
  try {
    const { contenido, id_categoria } = publicacionData;

    const result = await pool.query(
      'INSERT INTO PUBLICACION (id_usuario, id_categoria, contenido, fecha_publicacion) VALUES ($1, $2, $3, current_timestamp) RETURNING *',
      [userId, id_categoria, contenido]
    );

    logger.info('createPublicacion ejecutado exitosamente');
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en createPublicacion: ${error.message}`);
    throw error;
  }
};

const deletePublicacion = async (publicacionId) => {
  try {
    await pool.query('DELETE FROM PUBLICACION WHERE id = $1', [publicacionId]);
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
