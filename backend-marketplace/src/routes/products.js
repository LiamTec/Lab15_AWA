const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller'); // Ruta relativa al controlador
const { verifyToken, authorizeRole } = require('../middleware/auth.middleware');

router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un nuevo producto
router.post('/', verifyToken, authorizeRole('ADMIN'), productController.createProduct);

// PUT /api/products/:id - Actualizar un producto por ID
router.put('/:id', verifyToken, authorizeRole('ADMIN'), productController.updateProduct);


router.delete('/:id', verifyToken, authorizeRole('ADMIN'), productController.deleteProduct);

module.exports = router;