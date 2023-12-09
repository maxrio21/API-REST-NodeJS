// objetivoController.js
const perfilService = require('../services/perfilService');
const { 
  createObjetivoSchema, 
  createPreferenciaSchema,
  updateObjetivoSchema,
  updatePreferenciaSchema
 } = require('../schemas/perfilSchema');
const logger = require('../utils/logger');

const createObjetivoForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { error, value } = createObjetivoSchema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validación fallida al crear un nuevo objetivo para el usuario ${userId}: ${error.message}`);
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const createdObjetivo = await perfilService.createObjetivoForUser(userId, value);
    res.json(createdObjetivo);
  } catch (error) {
    logger.error(`Error al crear un nuevo objetivo para el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send('Error al crear un nuevo objetivo');
  }
};

const createPreferenciaForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { error, value } = createPreferenciaSchema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validación fallida al crear una nueva preferencia para el usuario ${userId}: ${error.message}`);
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const createdPreferencia = await perfilService.createPreferenciaForUser(userId, value);
    res.json(createdPreferencia);
  } catch (error) {
    logger.error(`Error al crear una nueva preferencia para el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send('Error al crear una nueva preferencia');
  }
};

const getObjetivoForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const objetivo = await perfilService.getObjetivoForUser(userId);
    res.json(objetivo);
  } catch (error) {
    logger.error(`Error al obtener el objetivo para el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send(`Error al obtener el objetivo para el usuario ${req.params.userId}`);
  }
};

const getPreferenciaForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const preferencia = await perfilService.getPreferenciaForUser(userId);
    res.json(preferencia);
  } catch (error) {
    logger.error(`Error al obtener la preferencia para el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send(`Error al obtener la preferencia para el usuario ${req.params.userId}`);
  }
};

const updateObjetivoForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { error, value } = updateObjetivoSchema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validación fallida al actualizar el objetivo para el usuario ${userId}: ${error.message}`);
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const updatedObjetivo = await perfilService.updateObjetivoForUser(userId, value);
    res.json(updatedObjetivo);
  } catch (error) {
    logger.error(`Error al actualizar el objetivo para el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send(`Error al actualizar el objetivo para el usuario ${req.params.userId}`);
  }
};

const updatePreferenciaForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { error, value } = updatePreferenciaSchema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validación fallida al actualizar la preferencia para el usuario ${userId}: ${error.message}`);
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const updatedPreferencia = await perfilService.updatePreferenciaForUser(userId, value);
    res.json(updatedPreferencia);
  } catch (error) {
    logger.error(`Error al actualizar la preferencia para el usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send(`Error al actualizar la preferencia para el usuario ${req.params.userId}`);
  }
};


const deleteObjetivoForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Llamar al servicio para eliminar el objetivo asociado al usuario
    await perfilService.deleteObjetivoForUser(userId);

    res.send(`Objetivo asociado al usuario ${userId} eliminado correctamente`);
  } catch (error) {
    res.status(500).send(`Error al eliminar el objetivo asociado al usuario ${req.params.userId}`);
  }
};

const deletePreferenciaForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Llamar al servicio para eliminar la preferencia asociada al usuario
    await perfilService.deletePreferenciaForUser(userId);

    res.send(`Preferencia asociada al usuario ${userId} eliminada correctamente`);
  } catch (error) {
    res.status(500).send(`Error al eliminar la preferencia asociada al usuario ${req.params.userId}`);
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
