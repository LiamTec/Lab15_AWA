// src/controllers/Product.controller.js

const Product = require('../models/Product');

// 1. Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json({
      success: true,
      message: 'Productos obtenidos correctamente',
      data: products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      data: null
    });
  }
};

// 2. Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Producto obtenido correctamente',
      data: product
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      data: null
    });
  }
};

// 3. Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { nombre, precio, descripcion } = req.body;

  // Validación básica de campos requeridos
  if (!nombre || !precio) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y precio son requeridos',
      data: null
    });
  }

  // Validación de que el precio sea mayor o igual a 0
  if (precio < 0) {
    return res.status(400).json({
      success: false,
      message: 'El precio debe ser mayor o igual a 0',
      data: null
    });
  }

  try {
    const newProduct = await Product.create({ nombre, precio, descripcion });

    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: newProduct
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      data: null
    });
  }
};
// Continuación de src/controllers/Product.controller.js

// 4. Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    
    // 1. Buscar el producto por ID
    const product = await Product.findByPk(req.params.id);

    // Si el producto no existe
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        data: null
      });
    }

    // 2. Validación de que el precio, si se proporciona, no sea negativo
    if (precio !== undefined && precio < 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio debe ser mayor o igual a 0',
        data: null
      });
    }

    // 3. Actualizar el producto con los nuevos datos
    await product.update({ nombre, precio, descripcion });

    res.json({
      success: true,
      message: 'Producto actualizado correctamente',
      data: product
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      data: null
    });
  }
};

// 5. Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    // 1. Buscar el producto por ID
    const product = await Product.findByPk(req.params.id);

    // Si el producto no existe
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        data: null
      });
    }

    // 2. Eliminar el producto
    await product.destroy();

    res.json({
      success: true,
      message: 'Producto eliminado correctamente',
      data: null // No se devuelve data en una eliminación exitosa
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      data: null
    });
  }
};