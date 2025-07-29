const Empresa = require('../models/Empresa');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'logos'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.empresaId}${ext}`);
  }
});

const uploadLogo = multer({ storage });

const crearEmpresaDemo = async (req, res) => {
  const { nombre, plan, colorPrimario, nombreUsuario, emailUsuario, contraseña } = req.body;

  try {
    const empresa = new Empresa({ nombre, plan, colorPrimario });
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

const subirLogo = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.empresaId);
    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }
    if (req.file) {
      const logoPath = `/uploads/logos/${req.file.filename}`;
      empresa.logoUrl = logoPath;
      await empresa.save();
    }
    res.json({ logoUrl: empresa.logoUrl });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al subir logo', error: error.message });
  }
};

module.exports = { crearEmpresaDemo, subirLogo, uploadLogo };
