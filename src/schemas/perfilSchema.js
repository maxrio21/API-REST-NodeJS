// objetivoSchema.js
const Joi = require('joi');

const createObjetivoSchema = Joi.object({
  objetivo_calorias: Joi.number().required(),
  porcentaje_proteinas: Joi.number().required(),
  porcentaje_grasas: Joi.number().required(),
  porcentaje_hidratos: Joi.number().required(),
  objetivo_peso: Joi.number().required(),
  perdida_semanal: Joi.number().required(),
  tipo_objetivo: Joi.string().required(),
});

const createPreferenciaSchema = Joi.object({
  tipo_dieta: Joi.string().required(),
  actividad: Joi.string().required(),
  peso_actual: Joi.number().required(),
  notificaciones: Joi.boolean().required(),
  desayuno: Joi.boolean().required(),
  almuerzo: Joi.boolean().required(),
  comida: Joi.boolean().required(),
  merienda: Joi.boolean().required(),
  cena: Joi.boolean().required()
});

const updateObjetivoSchema = Joi.object({
  objetivo_calorias: Joi.number(),
  porcentaje_proteinas: Joi.number(),
  porcentaje_grasas: Joi.number(),
  porcentaje_hidratos: Joi.number(),
  objetivo_peso: Joi.number(),
  perdida_semanal: Joi.number(),
  tipo_objetivo: Joi.string(),
});

const updatePreferenciaSchema = Joi.object({
  tipo_dieta: Joi.string(),
  actividad: Joi.string(),
  peso_actual: Joi.number(),
  notificaciones: Joi.boolean(),
  desayuno: Joi.boolean(),
  almuerzo: Joi.boolean(),
  comida: Joi.boolean(),
  merienda: Joi.boolean(),
  cena: Joi.boolean()
}).min(1); 

module.exports = {
  createObjetivoSchema,
  createPreferenciaSchema,
  updateObjetivoSchema,
  updatePreferenciaSchema
};
