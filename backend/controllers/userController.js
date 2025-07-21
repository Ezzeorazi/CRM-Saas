// Controlador de usuarios. Gestiona el modelo User para el Dashboard
const User = require('../models/User');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ empresaId: req.empresaId }).select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

// Crear nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const nuevoUsuario = new User({ nombre, email, contraseña, rol, empresaId: req.empresaId });
    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findOne({ _id: req.params.id, empresaId: req.empresaId }).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuario', error: error.message });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await User.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, {
      new: true,
      runValidators: true,
    }).select('-contraseña');

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await User.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
