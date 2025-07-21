const Empresa = require('../models/Empresa');
const User = require('../models/User');

const crearEmpresaDemo = async (req, res) => {
  const { nombre, plan, colorPrimario, subdominio, nombreUsuario, emailUsuario, contraseña } = req.body;

  try {
    const empresa = new Empresa({ nombre, plan, colorPrimario, subdominio });
    const empresaGuardada = await empresa.save();

    const user = new User({
      nombre: nombreUsuario,
      email: emailUsuario,
      contraseña,
      rol: 'admin',
      empresaId: empresaGuardada._id
    });
    await user.save();

    res.status(201).json({ mensaje: 'Empresa y usuario creados' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear empresa', error: error.message });
  }
};

module.exports = { crearEmpresaDemo };
