const Tarea = require('../models/Tarea');

const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ empresaId: req.empresaId });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tareas', error: error.message });
  }
};

const obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ _id: req.params.id, empresaId: req.empresaId });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tarea', error: error.message });
  }
};

const crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea({ ...req.body, empresaId: req.empresaId });
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tarea', error: error.message });
  }
};

const actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id, empresaId: req.empresaId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tarea', error: error.message });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tarea', error: error.message });
  }
};

module.exports = {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};
