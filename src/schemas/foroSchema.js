const Joi = require('joi');

const createPublicacionSchema = Joi.object({
  id_categoria: Joi.number().required(),
  contenido: Joi.string().required(),
});

module.exports = {
  createPublicacionSchema,
};