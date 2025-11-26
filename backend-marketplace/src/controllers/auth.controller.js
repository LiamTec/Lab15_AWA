const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const Role = require('../models/Role');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: 'username y password requeridos' });

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ success: false, message: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);

    // buscar rol por nombre, si no existe usar CUSTOMER
    let roleRecord = null;
    if (role) roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) roleRecord = await Role.findOne({ where: { name: 'CUSTOMER' } });

    const user = await User.create({ username, password: hashed, roleId: roleRecord ? roleRecord.id : null });

    res.status(201).json({ success: true, message: 'Usuario creado', data: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al crear usuario' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: 'username y password requeridos' });

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    // Obtener rol
    const roleRecord = await Role.findByPk(user.roleId);
    const roleName = roleRecord ? roleRecord.name : null;

    const payload = { id: user.id, username: user.username, role: roleName };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });

    res.json({ success: true, message: 'Autenticado', data: { token, user: payload } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al autenticar' });
  }
};
