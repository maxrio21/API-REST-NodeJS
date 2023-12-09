// alimentoController.js
const alimentoService = require('../services/alimentoService');
const { createAlimentoSchema } = require('../schemas/alimentoSchema');
const { authenticateAndExtractUserId } = require('../auth/middlewareAuthentication');
const logger = require('../utils/logger');
const path = require('path');
const translate = require('@iamtraction/google-translate');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../../dev.env')
})

const externalFoodFormatter = (jsonExterno) => {
  if (!jsonExterno) {
    console.error('El objeto externo es null o undefined.');
    return null;
  }

  return {
    nombre: jsonExterno.nombre ?? 'Nombre no disponible',
    kcalorias: jsonExterno.kcalorias ?? 0,
    proteinas: jsonExterno.proteinas ?? 0,
    grasas: jsonExterno.grasas ?? 0,
    hidratos: jsonExterno.hidratos ?? 0,
  };
};

const traducirTexto = async (texto, idiomaOrigen, idiomaDestino) => {
  try {
    const res = await translate(texto, { from: idiomaOrigen, to: idiomaDestino });
    return res.text;
  } catch (error) {
    console.error('Error de traducción:', error);
    throw error;
  }
};

const getAllLocalAlimentos = async (req, res) => {
  try {
    const localAlimentos = await alimentoService.getLocalAlimentos();

    res.json(localAlimentos);
  } catch (error) {
    logger.error(`Error en getAllLocalAlimentos: ${error.message}`);
    res.status(500).send(error);
  }
};

const getAllAlimentos = async (req, res) => {
  authenticateAndExtractUserId(req, res, async () => {
    try {
      const id_usuario = req.usuario.id;
      const query = req.query.query;

      if (query) {
        logger.info(`Buscando en la external API: ${query}`);
        const queryTraducida = await traducirTexto(query, 'es', 'en');
        const localAlimentos = await alimentoService.getLocalAlimentosByNameAndUserId(query, id_usuario);
        const externalAlimentos = await alimentoService.getExternalAlimentos(queryTraducida);
        const combinedResults = [...localAlimentos, ...externalAlimentos];

        const resultadosTraducidos = await Promise.all(
          combinedResults.map(async (alimento) => {
            alimento.nombre = await traducirTexto(alimento.nombre, 'en', 'es');
            return externalFoodFormatter(alimento); // Usa la función externalFoodFormatter aquí
          })
        );

        res.json(resultadosTraducidos);
      } else {
        const localAlimentos = await alimentoService.getLocalAlimentosByUserId(id_usuario);
        res.json(localAlimentos);
      }
    } catch (error) {
      logger.error(`Error en getAllAlimentos: ${error.message}`);
      res.status(500).send(error);
    }
  });
};

/*
const getAllAlimentos = async (req, res) => {
  authenticateAndExtractUserId(req, res, async () => {
    try {
      const id_usuario = req.usuario.id;
      const query = req.query.query;

      if (query) {
        logger.info(`Buscando en la external API: ${query}`);
        const localAlimentos = await alimentoService.getLocalAlimentosByNameAndUserId(query, id_usuario);
        const externalAlimentos = await alimentoService.getExternalAlimentos(query);
        const combinedResults = [...localAlimentos, ...externalAlimentos];
        res.json(combinedResults);
      } else {
        const localAlimentos = await alimentoService.getLocalAlimentosByUserId(id_usuario);
        res.json(localAlimentos);
      }
    } catch (error) {
      logger.error(`Error en getAllAlimentos: ${error.message}`);
      res.status(500).send(error);
    }
  });
};
*/
const getOneAlimento = async (req, res) => {
  try {
    const alimento = await alimentoService.getOneAlimento(req.params.alimentoId);
    res.json(alimento);
  } catch (error) {
    res.status(500).send(`Error al obtener el alimento ${req.params.alimentoId}`);
  }
};

const createNewAlimento = async (req, res) => {
  try {
    // Obtén id_usuario del objeto de solicitud (si el middleware de autenticación lo ha puesto allí)
    const id_usuario = req.usuario.id;

    const { error, value } = createAlimentoSchema.validate(
      { ...req.body, id_usuario }, // Incluye id_usuario en el objeto de validación
      { abortEarly: false }
    );

    if (error) {
      return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    const createdAlimento = await alimentoService.createAlimento(value);
    res.json(createdAlimento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear un nuevo alimento');
  }
};
const updateOneAlimento = async (req, res) => {
  try {
    const { alimentoId } = req.params;
    const updatedAlimento = await alimentoService.updateAlimento(alimentoId, req.body);
    res.json(updatedAlimento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el alimento');
  }
};

const deleteOneAlimento = async (req, res) => {
  try {
    await alimentoService.deleteAlimento(req.params.alimentoId);
    res.send(`Alimento ${req.params.alimentoId} eliminado correctamente`);
  } catch (error) {
    res.status(500).send(`Error al eliminar el alimento ${req.params.alimentoId}`);
  }
};

module.exports = {
  getAllLocalAlimentos,
  getAllAlimentos,
  getOneAlimento,
  createNewAlimento,
  updateOneAlimento,
  deleteOneAlimento,
};