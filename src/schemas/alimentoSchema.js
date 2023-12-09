// alimentoSchema.js
const Joi = require('joi');

const createAlimentoSchema = Joi.object({
  id_usuario: Joi.number().integer().optional(),
  nombre: Joi.string().required(),
  kcalorias: Joi.number().integer().required(),
  proteinas: Joi.number().required(),
  grasas: Joi.number().required(),
  hidratos: Joi.number().required(),
});

// Puedes agregar más validaciones según sea necesario

module.exports = {
  createAlimentoSchema,
  // Agrega más validaciones según sea necesario
};