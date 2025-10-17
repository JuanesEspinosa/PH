# ✅ Módulo de Cultivos - Implementado

## 🎉 Completado

El módulo de **Cultivos** ha sido completamente implementado y conectado entre frontend y backend.

## 📁 Archivos Creados

### Backend
- ✅ `src/models/cultivo.model.ts` - Modelo de datos y queries SQL
- ✅ `src/services/cultivos.service.ts` - Lógica de negocio
- ✅ `src/controllers/cultivos.controller.ts` - Manejo de peticiones HTTP
- ✅ `src/routes/cultivos.routes.ts` - Definición de endpoints
- ✅ `src/config/tables.sql` - Script SQL para crear todas las tablas

### Frontend
- ✅ `src/pages/dashboard/cultivos/services/cultivosService.ts` - Actualizado para usar API real
- ✅ `src/lib/axios.ts` - Configurado para puerto 5000

### Configuración
- ✅ `backend/src/server.ts` - Rutas registradas

## 🔌 Endpoints Implementados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cultivos` | Obtener todos los cultivos |
| GET | `/api/cultivos/activos` | Obtener cultivos activos |
| GET | `/api/cultivos/:id` | Obtener cultivo específico |
| POST | `/api/cultivos` | Crear nuevo cultivo |
| PUT | `/api/cultivos/:id` | Actualizar cultivo |
| DELETE | `/api/cultivos/:id` | Eliminar (soft delete) cultivo |

## 🗄️ Tabla de Base de Datos

```sql
CREATE TABLE cultivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  nombre_cientifico VARCHAR(255),
  tipo ENUM('Hortaliza', 'Fruta', 'Cereal', 'Leguminosa', 'Tubérculo', 'Flor', 'Otro') NOT NULL,
  ciclo_dias INT NOT NULL,
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Cómo Ejecutar

### 1. Configurar Base de Datos

```bash
cd backend
npm run db:setup
```

Esto creará todas las tablas necesarias incluyendo datos de ejemplo.

### 2. Iniciar Backend

```bash
cd backend
npm run dev
```

El servidor estará en `http://localhost:5000`

### 3. Iniciar Frontend

```bash
cd ..
yarn dev
```

El frontend estará en `http://localhost:5173`

## 🧪 Probar el Módulo

1. **Login** en la aplicación
2. Ir a **Dashboard → Cultivos**
3. Crear, editar, ver y eliminar cultivos
4. Los datos ahora se guardan en la base de datos real

## ✨ Características

- ✅ CRUD completo
- ✅ Validaciones en backend y frontend
- ✅ Soft delete (no se eliminan físicamente)
- ✅ Manejo de errores
- ✅ Autenticación JWT requerida
- ✅ Tipos TypeScript completos
- ✅ Filtrado de cultivos activos/inactivos
- ✅ Datos de ejemplo incluidos

## 📝 Próximos Módulos

1. **Lotes** - Depende de Cultivos ✅
2. **Planificación** - Depende de Lotes y Cultivos
3. **Usuarios** - Extender módulo existente

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
- Verificar que MySQL esté corriendo
- Verificar credenciales en `.env`
- Ejecutar `npm run db:setup`

### Error: "Cultivo no encontrado"
- Asegurarse de que hay datos en la BD
- Ejecutar el script SQL con datos de ejemplo

### Error 401 en las peticiones
- El token JWT ha expirado
- Volver a hacer login

## 📊 Datos de Ejemplo

El script SQL incluye 5 cultivos de ejemplo:
- Café (Coffea arabica)
- Banano (Musa paradisiaca)
- Maíz (Zea mays)
- Papa (Solanum tuberosum)
- Tomate (Solanum lycopersicum)


