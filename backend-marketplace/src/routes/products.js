const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller'); // Ruta relativa al controlador

router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un nuevo producto
router.post('/', productController.createProduct);

// PUT /api/products/:id - Actualizar un producto por ID
router.put('/:id', productController.updateProduct);


router.delete('/:id', productController.deleteProduct);

module.exports = router;