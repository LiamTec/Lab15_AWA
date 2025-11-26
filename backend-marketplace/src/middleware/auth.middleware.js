const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ success: false, message: 'Formato de token inválido' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload; // { id, username, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'No autenticado' });
    const role = req.user.role;
    if (!role) return res.status(403).json({ success: false, message: 'Rol no disponible' });

    // ADMIN puede acceder a cualquier ruta
    if (role === 'ADMIN') return next();
    // Si no es ADMIN, debe coincidir exactamente con el rol requerido
    if (role === requiredRole) return next();
    return res.status(403).json({ success: false, message: 'Acceso denegado' });
  };
}

module.exports = { verifyToken, authorizeRole };
