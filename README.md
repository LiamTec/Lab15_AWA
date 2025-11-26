# 🛒 Marketplace E-commerce - Lab15_AWA

Aplicación full-stack de e-commerce con autenticación, gestión de productos y roles de usuario.

## 🚀 Despliegue en Producción

- **Frontend**: https://lab15-frontend.vercel.app
- **Backend**: https://lab15-awa.onrender.com

---

## 👥 Usuarios de Prueba

### Admin
- **Username**: `admin`
- **Password**: `admin123`
- **Acceso**: Panel de administración, gestión de productos

### Customer
- **Username**: `customer`
- **Password**: `customer123`
- **Acceso**: Ver productos, filtrar por categoría

---

## 📋 Rutas del Sistema

### Frontend (Next.js)
| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Página de inicio con lista de productos | Público |
| `/login` | Página de inicio de sesión | Público |
| `/register` | Página de registro de nuevo usuario | Público |
| `/products/[id]` | Detalle de un producto | Público |
| `/admin` | Panel de administración | Solo ADMIN |
| `/admin/products` | Gestión de productos (crear, editar, eliminar) | Solo ADMIN |

### Backend API (Node.js/Express)
| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|----------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | No requerida |
| `POST` | `/api/auth/login` | Iniciar sesión | No requerida |
| `GET` | `/api/products` | Obtener todos los productos | No requerida |
| `GET` | `/api/products?category=1` | Filtrar por categoría | No requerida |
| `GET` | `/api/products/:id` | Obtener producto específico | No requerida |
| `POST` | `/api/products` | Crear producto | JWT + ADMIN |
| `PUT` | `/api/products/:id` | Editar producto | JWT + ADMIN |
| `DELETE` | `/api/products/:id` | Eliminar producto | JWT + ADMIN |
| `GET` | `/api/admin` | Verificar acceso admin | JWT + ADMIN |

---

## 📦 Productos Iniciales

La base de datos viene precargada con los siguientes productos:

| ID | Nombre | Precio | Categoría |
|-------|--------|--------|-----------|
| 1 | Laptop Lenovo IdeaPad 3 | $1,599.90 | Computación |
| 2 | Mouse Logitech M280 | $59.90 | Periféricos |
| 3 | Monitor Samsung 27" | $799.00 | Computación |
| 4 | Teclado Redragon Kumara K552 | $189.50 | Periféricos |
| 5 | Audífonos Sony WH-CH510 | $249.00 | Audio |

---

## 🏷️ Categorías

| ID | Nombre |
|----|--------|
| 1 | Computación |
| 2 | Periféricos |
| 3 | Audio |

---

## 🔐 Autenticación y Seguridad

### Roles y Permisos

**CUSTOMER** puede acceder a:
- `/` - Página de inicio
- `/products/[id]` - Detalles de producto
- Ver todos los productos

**ADMIN** puede acceder a:
- Todas las rutas de CUSTOMER
- `/admin` - Panel de administración
- `/admin/products` - Gestión de productos
- Crear, editar y eliminar productos

### JWT Token
- Válido por **8 horas**
- Se envía en header: `Authorization: Bearer {token}`
- Almacenado en `localStorage` del navegador

### Contraseñas
- Hasheadas con **bcrypt** (10 rondas de salt)
- Nunca se almacena en texto plano

---

## 💻 Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React
- **Axios** - Cliente HTTP
- **React Context API** - Gestión de estado de autenticación

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **bcrypt** - Hash de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **MySQL 8** - Base de datos

### DevOps
- **Vercel** - Hosting frontend
- **Render** - Hosting backend
- **Railway** - Base de datos MySQL
- **GitHub** - Control de versiones

---

## 🔄 Flujo de la Aplicación

### 1. Registro
```
Usuario → Formulario de Registro → Backend (validación)
→ Hash contraseña → Guardar en BD → Response éxito
```

### 2. Login
```
Usuario → Credenciales → Backend (validación)
→ Comparar bcrypt → Generar JWT → Response con token
→ Almacenar en localStorage → Redirigir a inicio
```

### 3. Gestión de Productos (Admin)
```
Admin → Panel Admin → Click en "Gestionar Productos"
→ Ver tabla de productos → Click "Editar" o "Crear"
→ Rellenar formulario → Enviar con JWT → Backend
→ Verificar rol ADMIN → Actualizar/Crear/Eliminar en BD
→ Response éxito → Recargar tabla
```

### 4. Ver Productos (Todos)
```
Usuario → Inicio → Cargar productos → Filtrar por categoría
→ Click en producto → Ver detalles
```

---

## 📊 Estructura de Base de Datos

### Tabla: roles
```sql
- id (INT, PK)
- name (VARCHAR 50, UNIQUE)
```

### Tabla: users
```sql
- id (INT, PK)
- username (VARCHAR 100, UNIQUE)
- password (VARCHAR 255)
- roleId (INT, FK → roles.id)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

### Tabla: categories
```sql
- id (INT, PK)
- name (VARCHAR 100, UNIQUE)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

### Tabla: products
```sql
- id (INT, PK)
- nombre (VARCHAR 100)
- precio (DECIMAL 10,2)
- descripcion (TEXT)
- imageUrl (VARCHAR 255)
- categoryId (INT, FK → categories.id)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

---

## 🛠️ Instalación Local

### Backend
```bash
cd backend-marketplace
npm install
npm run dev
# Corre en http://localhost:3001
```

### Frontend
```bash
cd frontend-marketplace
npm install
npm run dev
# Corre en http://localhost:3000
```

---

## 📝 Variables de Entorno

### Backend (.env)
```
DB_HOST=centerbeam.proxy.rlwy.net
DB_PORT=22363
DB_NAME=railway
DB_USER=root
DB_PASSWORD=KENkxaPXEQaKlwKQIZBnQkuyViKVyhJg
JWT_SECRET=miSecretKey123!
NODE_ENV=production
PORT=3001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://lab15-awa.onrender.com/api
```

---

## ✅ Checklist de Funcionalidades

- [x] Autenticación con JWT
- [x] Registro de nuevos usuarios
- [x] Login con email/username
- [x] Roles (ADMIN y CUSTOMER)
- [x] Protección de rutas por rol
- [x] Visualización de productos
- [x] Filtrado por categoría
- [x] Crear productos (ADMIN)
- [x] Editar productos (ADMIN)
- [x] Eliminar productos (ADMIN)
- [x] Campos imageUrl y categoryId en productos
- [x] Middleware de autenticación
- [x] Logout
- [x] Diseño responsivo
- [x] Deploy en Vercel y Render

---

## 🎯 Casos de Uso

### Como Cliente (CUSTOMER)
1. Accedo a la página de inicio
2. Veo todos los productos disponibles
3. Filltro por categoría (Computación, Periféricos, Audio)
4. Hago click en un producto para ver detalles
5. Me puedo registrar y hacer login
6. Puedo hacer logout

### Como Administrador (ADMIN)
1. Me logeo con credenciales de admin
2. Veo botón "⚙️ Admin" en la barra de navegación
3. Entro al panel de administración
4. Accedo a "Gestionar Productos"
5. Veo tabla con todos los productos
6. Puedo crear nuevo producto (nombre, precio, descripción, categoría, imagen)
7. Puedo editar productos existentes
8. Puedo eliminar productos
9. Puedo hacer logout

---

## 🚨 Validaciones

### Registro
- Username no puede estar vacío
- Password no puede estar vacío
- Username debe ser único en la BD

### Login
- Ambos campos requeridos
- Validación de credenciales contra BD
- Generación de JWT si son correctas

### Productos
- Nombre requerido
- Precio requerido y debe ser > 0
- CategoryId es opcional
- ImageUrl es opcional

---

## 📞 Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio:
https://github.com/LiamTec/Lab15_AWA

---

**Desarrollado por**: LiamTec  
**Fecha**: Noviembre 2025  
**Versión**: 1.0.0
