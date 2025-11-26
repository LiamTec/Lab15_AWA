const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/auth.middleware');

router.get('/', verifyToken, authorizeRole('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Bienvenido a la sección admin', data: null });
});

module.exports = router;
