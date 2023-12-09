// nutricionController.js
const nutricionService = require('../services/nutricionService');
const { createConsumoSchema, updateConsumoSchema } = require('../schemas/nutricionSchema');

const createConsumo = async (req, res) => {
  try {
    const consumoData = req.body;
    // Agregar el ID del usuario al objeto de consumoData
    consumoData.id_usuario = req.usuario.id;

    // Validar los datos de entrada
    const validatedData = await createConsumoSchema.validateAsync(consumoData);

    const nuevoConsumo = await nutricionService.createConsumo(validatedData);
    res.json(nuevoConsumo);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al crear el consumo');
  }
};

const getConsumoById = async (req, res) => {
  try {
    const { id } = req.params;
    const consumo = await nutricionService.getConsumoById(id);
    res.json(consumo);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al obtener el consumo con id ${req.params.id}`);
  }
};

const getAllConsumos = async (req, res) => {
  try {
    // Obtener el ID de usuario del token
    const idUsuario = req.usuario.id;

    // Llamada al servicio para obtener los consumos del usuario
    const consumos = await nutricionService.getAllConsumos(idUsuario);
    res.json(consumos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener todos los consumos del usuario');
  }
};

const updateConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevoConsumo = req.body;
    // Validar los datos de entrada
    const validatedData = await updateConsumoSchema.validateAsync(nuevoConsumo);

    const consumoActualizado = await nutricionService.updateConsumo(id, validatedData);
    res.json(consumoActualizado);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error al actualizar el consumo con id ${req.params.id}`);
  }
};

const deleteConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    await nutricionService.deleteConsumo(id);
    res.send(`Consumo con id ${id} eliminado correctamente`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al eliminar el consumo con id ${req.params.id}`);
  }
};

module.exports = {
  createConsumo,
  getConsumoById,
  getAllConsumos,
  updateConsumo,
  deleteConsumo,
};
