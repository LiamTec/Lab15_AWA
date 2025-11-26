#!/usr/bin/env node
// scripts/load-init.js
// Lee src/config/init.sql y ejecuta las sentencias contra la DB usando mysql2

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

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
    // Ejecuta el archivo completo. Si tu init.sql contiene SELECT/SHOW,
    // mysql2 devolverá resultados que aquí ignoramos salvo errores.
    const [results] = await connection.query(sql);
    console.log('SQL ejecutado correctamente');
    // Para ver un resumen simple de resultados de INSERT/UPDATE/DELETE:
    if (Array.isArray(results)) {
      console.log('Resultados:', results.length, 'sentencias procesadas');
    }
  } catch (err) {
    console.error('Error ejecutando SQL:', err.message || err);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

main();
