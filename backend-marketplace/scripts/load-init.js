#!/usr/bin/env node
// scripts/load-init.js
// Lee src/config/init.sql y ejecuta las sentencias contra la DB usando mysql2
// También inserta usuarios de test con bcrypt

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function main() {
  const filePath = path.join(__dirname, '..', 'src', 'config', 'init.sql');

  if (!fs.existsSync(filePath)) {
    console.error('No se encontró', filePath);
    process.exit(1);
  }

  const sql = fs.readFileSync(filePath, 'utf8');

  // Conexión usando variables de .env
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  try {
    console.log('Ejecutando SQL desde', filePath);
    const [results] = await connection.query(sql);
    console.log('SQL ejecutado correctamente');
    if (Array.isArray(results)) {
      console.log('Resultados:', results.length, 'sentencias procesadas');
    }

    // Insertar usuarios de test con contraseña hasheada
    console.log('Insertando usuarios de test...');
    const adminPass = await bcrypt.hash('admin123', 10);
    const customerPass = await bcrypt.hash('customer123', 10);

    const userInserts = `
      INSERT IGNORE INTO users (username, password, roleId) VALUES 
      ('admin', '${adminPass}', 1),
      ('customer', '${customerPass}', 2);
    `;
    await connection.query(userInserts);
    console.log('Usuarios de test insertados');

  } catch (err) {
    console.error('Error ejecutando SQL:', err.message || err);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

main();
