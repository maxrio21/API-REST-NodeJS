const foroService = require('../services/foroService');
const { createPublicacionSchema } = require('../schemas/foroSchema');
const logger = require('../utils/logger');

const getAllPublicaciones = async (req, res) => {
  try {
    const allPublicaciones = await foroService.getAllPublicaciones();
    res.json(allPublicaciones);
  } catch (error) {
    logger.error(`Error al obtener todas las publicaciones: ${error.message}`);
    res.status(500).send('Error al obtener todas las publicaciones');
  }
};

const getOnePublicacion = async (req, res) => {
  try {
    const publicacion = await foroService.getOnePublicacion(req.params.publicacionId);
    res.json(publicacion);
  } catch (error) {
    logger.error(`Error al obtener la publicación ${req.params.publicacionId}: ${error.message}`);
    res.status(500).send(`Error al obtener la publicación ${req.params.publicacionId}`);
  }
};

const getAllPublicacionesByUser = async (req, res) => {
  try {
    const publicacionesByUser = await foroService.getAllPublicacionesByUser(req.params.userId);
    res.json(publicacionesByUser);
  } catch (error) {
    logger.error(`Error al obtener las publicaciones del usuario ${req.params.userId}: ${error.message}`);
    res.status(500).send(`Error al obtener las publicaciones del usuario ${req.params.userId}`);
  }
};

const createPublicacion = async (req, res) => {
  try {
    const { error, value } = createPublicacionSchema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validación fallida al crear una nueva publicación: ${error.message}`);
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const createdPublicacion = await foroService.createPublicacion(value, req.userId);

    res.json(createdPublicacion);
  } catch (error) {
    logger.error(`Error al crear una nueva publicación: ${error.message}`);
    res.status(500).send('Error al crear una nueva publicación');
  }
};

const deletePublicacion = async (req, res) => {
  try {
    await foroService.deletePublicacion(req.params.publicacionId);
    res.send(`Publicación ${req.params.publicacionId} eliminada correctamente`);
  } catch (error) {
    logger.error(`Error al eliminar la publicación ${req.params.publicacionId}: ${error.message}`);
    res.status(500).send(`Error al eliminar la publicación ${req.params.publicacionId}`);
  }
};

module.exports = {
  getAllPublicaciones,
  getOnePublicacion,
  getAllPublicacionesByUser,
  createPublicacion,
  deletePublicacion,
};
