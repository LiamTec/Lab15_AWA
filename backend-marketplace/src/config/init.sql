-- Inicialización básica de la base de datos

-- Limpiar tablas si existen (en orden inverso por FK)
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS roles;

-- TABLAS: roles, users, categories, products

CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	roleId INT,
	createdAt DATETIME DEFAULT NOW(),
	updatedAt DATETIME DEFAULT NOW(),
	FOREIGN KEY (roleId) REFERENCES roles(id)
);

CREATE TABLE categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	createdAt DATETIME DEFAULT NOW(),
	updatedAt DATETIME DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	precio DECIMAL(10,2) NOT NULL,
	descripcion TEXT,
	imageUrl VARCHAR(255),
	categoryId INT,
	createdAt DATETIME DEFAULT NOW(),
	updatedAt DATETIME DEFAULT NOW(),
	FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- Inserciones iniciales
INSERT IGNORE INTO roles (id, name) VALUES (1, 'ADMIN'), (2, 'CUSTOMER');

INSERT IGNORE INTO categories (id, name) VALUES
	(1, 'Computación'),
	(2, 'Periféricos'),
	(3, 'Audio');

INSERT IGNORE INTO products (nombre, precio, descripcion, imageUrl, categoryId, createdAt, updatedAt) VALUES
('Laptop Lenovo IdeaPad 3', 1599.90, 'Laptop básica para estudio y oficina', NULL, 1, NOW(), NOW()),
('Mouse Logitech M280', 59.90, 'Mouse inalámbrico ergonómico', NULL, 2, NOW(), NOW()),
('Monitor Samsung 27"', 799.00, 'Monitor Full HD de 27 pulgadas', NULL, 1, NOW(), NOW()),
('Teclado Redragon Kumara K552', 189.50, 'Teclado mecánico con iluminación LED', NULL, 2, NOW(), NOW()),
('Audífonos Sony WH-CH510', 249.00, 'Audífonos inalámbricos con buena autonomía', NULL, 3, NOW(), NOW());

-- Nota: Los usuarios se crean desde el script `load-init.js` para hashear contraseñas correctamente.
