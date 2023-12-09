// nutricionSchema.js
const Joi = require('joi');

const createConsumoSchema = Joi.object({
  id_usuario: Joi.number().integer().optional(),
  id_alimento: Joi.number().integer().required(),
  nombre_alimento: Joi.string().required(),
  cantidad: Joi.number().required(),
  tipo_comida: Joi.string().required(),
  fecha: Joi.date().required(),
});

const updateConsumoSchema = Joi.object({
  id_usuario: Joi.number().integer(),
  id_alimento: Joi.number().integer(),
  nombre_alimento: Joi.string(),
  cantidad: Joi.number(),
  tipo_comida: Joi.string(),
  fecha: Joi.date(),
});

module.exports = {
  createConsumoSchema,
  updateConsumoSchema,
};
