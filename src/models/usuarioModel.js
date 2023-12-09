// usuarioModel.js
const pool = require('../db/dbConfig');
const bcryptUtils = require('../utils/bcryptUtils');
const { getCurrentDate } = require('../utils/dateUtils');
const logger = require('../utils/logger');

const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT id, nombre, nickname, email, admin, fecha_registro, ultima_conexion, fecha_nac FROM usuario');
    logger.info('getAllUsers ejecutado exitosamente');
    return result.rows;
  } catch (error) {
    logger.error(`Error en getAllUsers: ${error.message}`);
    throw error;
  }
};

const getOneUser = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [userId]);
    logger.info(`getOneUser ejecutado exitosamente para userId: ${userId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getOneUser: ${error.message}`);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM usuario WHERE email= $1', [email]);
    logger.info(`getUserByEmail ejecutado exitosamente para email: ${email}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getUserByEmail: ${error.message}`);
    throw error;
  }
};

const getUserByNicknameOrEmail = async (nickname, email) => {
  try {
    const result = await pool.query('SELECT * FROM usuario WHERE nickname = $1 OR email = $2', [nickname, email]);
    logger.info('getUserByNicknameOrEmail ejecutado exitosamente');
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en getUserByNicknameOrEmail: ${error.message}`);
    throw error;
  }
};

const createNewUser = async (userData) => {
  try {
    const {
      nombre, 
      nickname, 
      contrasenya, 
      email, 
      avatar, 
      fecha_nac 
    } = userData;

    const hashedPassword = await bcryptUtils.generateHash(contrasenya);

    const fecha_registro = getCurrentDate();
    const ultima_conexion = getCurrentDate();

    const result = await pool.query(
      'INSERT INTO usuario (nombre, nickname, contrasenya, email, admin, fecha_registro, ultima_conexion, avatar, fecha_nac) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nombre, nickname, hashedPassword, email, "false", fecha_registro, ultima_conexion, avatar, fecha_nac]
    );

    logger.info('createNewUser ejecutado exitosamente');
    return result.rows[0];
  } catch (error) {
    logger.error(`Error en createNewUser: ${error.message}`);
    throw error;
  }
};

const updateOneUser = async (userId, updatedUserData, newImagePath) => {
  try {
    logger.info(`updateOneUser - UserID: ${userId}`);
    logger.info(`Updated User Data: ${JSON.stringify(updatedUserData)}`);
    logger.info(`New Image Path: ${newImagePath}`);
    const { avatar, ...restUserData } = updatedUserData;

    // Verificar que haya al menos una propiedad en restUserData
    if (Object.keys(restUserData).length === 0) {
      throw new Error('No hay propiedades para actualizar.');
    }

    let setClause = '';

    Object.entries(restUserData).forEach(([key, value], index) => {
      setClause += `${key} = $${index + 1}, `;
    });

    if (newImagePath) {
      setClause += 'avatar = $' + (Object.keys(restUserData).length + 1);
    }

    setClause = setClause.replace(/,\s*$/, '');

    const updateQuery = `
      UPDATE usuario
      SET ${setClause}
      WHERE id = $${Object.keys(restUserData).length + 2}
      RETURNING *`;

    const values = [...Object.values(restUserData), newImagePath, userId];

    logger.info('Update Query:', updateQuery);
    logger.info('Values:', values);

    const result = await pool.query(updateQuery, values);

    return result.rows[0];
  } catch (error) {
    logger.error(`Error en updateOneUser: ${error.message}`);
    throw error;
  }
};

/*
const updateOneUser = async (userId, updatedUserData, newImagePath) => {
  try {
    // Deconstruir el objeto updatedUserData y excluir 'avatar'
    const { avatar, ...restUserData } = updatedUserData;

    // Construir la cláusula SET dinámicamente
    const setClause = Object.keys(restUserData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    // Agregar 'avatar' a la cláusula SET si newImagePath está presente
    const setClauseWithAvatar = newImagePath
      ? `${setClause}, avatar = $${Object.keys(restUserData).length + 1}`
      : setClause;

    // Construir la consulta de actualización completa
    const updateQuery = `
      UPDATE usuario
      SET ${setClauseWithAvatar}
      WHERE id = $${Object.keys(restUserData).length + 2}
      RETURNING *`;

    // Crear un array de valores para la consulta
    const values = [...Object.values(restUserData), newImagePath, userId];

    // Ejecutar la consulta
    const result = await pool.query(updateQuery, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
*/

const deleteOneUser = async (userId) => {
  try {
    logger.info(`deleteOneUser - UserID: ${userId}`);
    await pool.query('DELETE FROM usuario WHERE id = $1', [userId]);
  } catch (error) {
    logger.error(`Error en deleteOneUser: ${error.message}`);
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
};