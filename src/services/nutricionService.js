// nutricionService.js
const Nutricion = require('../models/nutricionModel'); // Asegúrate de importar el modelo correcto

const createConsumo = async (consumoData) => {
  // Lógica para crear un nuevo consumo en la base de datos o servicios externos
  const nuevoConsumo = await Nutricion.createConsumo(consumoData);
  return nuevoConsumo;
};

const getConsumoById = async (id) => {
  // Lógica para obtener un consumo por su ID desde la base de datos o servicios externos
  const consumo = await Nutricion.getConsumoById(id);
  return consumo;
};

const getAllConsumos = async (idUsuario) => {
  // Lógica para obtener todos los consumos de un usuario desde la base de datos o servicios externos
  const consumos = await Nutricion.getAllConsumos(idUsuario);
  return consumos;
};

const updateConsumo = async (id, nuevoConsumo) => {
  // Lógica para actualizar un consumo en la base de datos o servicios externos
  const consumoActualizado = await Nutricion.updateConsumo(id, nuevoConsumo);
  return consumoActualizado;
};

const deleteConsumo = async (id) => {
  // Lógica para eliminar un consumo de la base de datos o servicios externos
  await Nutricion.deleteConsumo(id);
};

module.exports = {
  createConsumo,
  getConsumoById,
  getAllConsumos,
  updateConsumo,
  deleteConsumo,
};
