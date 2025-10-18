# 🚀 Guía de Inicio del Sistema Agrícola

## 📋 Pasos para ejecutar el sistema completo

### 1. **Configurar la Base de Datos**

```bash
# Navegar al directorio del backend
cd backend

# Crear archivo .env con la configuración de MySQL
echo "DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_aqui
DB_NAME=sistema_agricola
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173" > .env

# Instalar dependencias del backend
npm install

# Configurar la base de datos (crear tablas)
npx ts-node src/config/setupDatabase.ts
```

### 2. **Iniciar el Backend**

```bash
# En el directorio backend
npm run dev
# o
npx ts-node src/server.ts
```

### 3. **Iniciar el Frontend**

```bash
# En el directorio raíz del proyecto
npm install
npm run dev
```

### 4. **Verificar la Conexión**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

## 🔧 Configuración de MySQL

Si no tienes MySQL configurado:

### Opción A: XAMPP
1. Descargar e instalar XAMPP
2. Iniciar MySQL desde el panel de control
3. Usar las credenciales por defecto (usuario: root, sin contraseña)

### Opción B: MySQL Server
1. Instalar MySQL Server
2. Configurar usuario y contraseña
3. Actualizar el archivo .env con tus credenciales

## 📊 Endpoints Disponibles

### Trabajadores
- `GET /api/trabajadores` - Listar todos
- `GET /api/trabajadores/:id` - Obtener por ID
- `GET /api/trabajadores/search?q=query` - Buscar
- `POST /api/trabajadores` - Crear
- `PUT /api/trabajadores/:id` - Actualizar
- `DELETE /api/trabajadores/:id` - Eliminar

### Tipos de Labor
- `GET /api/tipos-labor` - Listar todos
- `GET /api/tipos-labor/:id` - Obtener por ID
- `GET /api/tipos-labor/search?q=query` - Buscar
- `POST /api/tipos-labor` - Crear
- `PUT /api/tipos-labor/:id` - Actualizar
- `DELETE /api/tipos-labor/:id` - Eliminar

### Labores Agrícolas
- `GET /api/labores` - Listar todas
- `GET /api/labores/:id` - Obtener por ID
- `GET /api/labores/search?q=query` - Buscar
- `GET /api/labores/fecha-rango?inicio=YYYY-MM-DD&fin=YYYY-MM-DD` - Por rango de fechas
- `GET /api/labores/trabajador/:trabajadorId` - Por trabajador
- `GET /api/labores/estadisticas` - Estadísticas
- `POST /api/labores` - Crear
- `PUT /api/labores/:id` - Actualizar
- `DELETE /api/labores/:id` - Eliminar

## 🐛 Solución de Problemas

### Error de conexión a MySQL
- Verificar que MySQL esté ejecutándose
- Comprobar credenciales en .env
- Verificar que el puerto 3306 esté disponible

### Error de CORS
- Verificar que FRONTEND_URL esté configurado correctamente
- Comprobar que el frontend esté ejecutándose en el puerto 5173

### Error 401 (No autorizado)
- Verificar que el token JWT esté presente en localStorage
- Comprobar que el usuario esté logueado

## 📝 Notas Importantes

1. **Soft Delete**: Los trabajadores se marcan como inactivos en lugar de eliminarse físicamente
2. **Validaciones**: Todas las validaciones están implementadas tanto en frontend como backend
3. **Búsqueda**: Funciona en tiempo real con debounce
4. **Filtros**: Por estado, nombre, cargo, etc.
5. **Notificaciones**: Toast notifications para todas las acciones
6. **Responsive**: Diseño adaptativo para móviles y desktop

## 🎯 Próximos Pasos

1. Implementar autenticación completa
2. Agregar más validaciones
3. Implementar paginación
4. Agregar exportación de datos
5. Implementar reportes avanzados
