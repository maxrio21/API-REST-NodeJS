//usuarioSchema
const Joi = require('joi');

const createUserSchema = Joi.object({
  nombre: Joi.string().required(),
  nickname: Joi.string().required(),
  contrasenya: Joi.string().required(),
  email: Joi.string().email().required(),
  admin: Joi.boolean(),
  fecha_registro: Joi.string(),
  ultima_conexion: Joi.string(),
  avatar: Joi.string(),
  fecha_nac: Joi.date(),
});

const updateUserSchema = Joi.object({
  nombre: Joi.string(),
  nickname: Joi.string(),
  contrasenya: Joi.string(),
  email: Joi.string().email(),
  admin: Joi.boolean(),
  fecha_registro: Joi.string(),
  ultima_conexion:Joi.string(),
  avatar: Joi.string(),
  fecha_nac: Joi.date(),
});

module.exports = {
  createUserSchema,
  updateUserSchema
};