# 🔌 Plan de Integración Frontend-Backend

## ✅ Completado

### 1. Autenticación
- ✅ Configuración de axios actualizada (puerto 5000)
- ✅ Servicio de autenticación conectado a API real
- ✅ Endpoints implementados:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/forgot-password`
  - `GET /api/auth/verify`
  - `POST /api/auth/logout`

## 📋 Pendiente - Módulos a Implementar en Backend

### 2. Módulo de Lotes

**Modelos de BD necesarios:**
```sql
CREATE TABLE lotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  area_hectareas DECIMAL(10,2) NOT NULL,
  perimetro_metros DECIMAL(10,2),
  altitud_msnm INT,
  cultivo_id INT,
  estado ENUM('EN_CRECIMIENTO', 'EN_COSECHA', 'EN_MANTENIMIENTO', 'INACTIVO') DEFAULT 'EN_CRECIMIENTO',
  tipo_suelo ENUM('ARCILLOSO', 'ARENOSO', 'LIMOSO', 'FRANCO', 'HUMIFERO'),
  ph_suelo DECIMAL(3,1),
  topografia ENUM('PLANO', 'ONDULADO', 'MONTAÑOSO'),
  sistema_riego ENUM('GOTEO', 'ASPERSION', 'GRAVEDAD', 'NINGUNO'),
  tiene_cerca BOOLEAN DEFAULT FALSE,
  tiene_sombra BOOLEAN DEFAULT FALSE,
  acceso_vehicular BOOLEAN DEFAULT FALSE,
  notas TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  fecha_ultima_actividad TIMESTAMP,
  proxima_actividad VARCHAR(255),
  FOREIGN KEY (cultivo_id) REFERENCES cultivos(id)
);

CREATE TABLE lote_coordenadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  latitud DECIMAL(10, 8) NOT NULL,
  longitud DECIMAL(11, 8) NOT NULL,
  orden INT NOT NULL,
  FOREIGN KEY (lote_id) REFERENCES lotes(id) ON DELETE CASCADE
);
```

**Endpoints requeridos:**
- `GET /api/lotes` - Listar todos los lotes
- `GET /api/lotes/:id` - Obtener un lote específico
- `POST /api/lotes` - Crear nuevo lote
- `PUT /api/lotes/:id` - Actualizar lote
- `DELETE /api/lotes/:id` - Eliminar lote
- `GET /api/lotes/estadisticas` - Estadísticas generales

### 3. Módulo de Cultivos

**Modelos de BD necesarios:**
```sql
CREATE TABLE cultivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  nombre_cientifico VARCHAR(255),
  tipo ENUM('HORTALIZA', 'FRUTA', 'CEREAL', 'LEGUMINOSA', 'TUBERCULO', 'FLOR', 'OTRO') NOT NULL,
  ciclo_dias INT NOT NULL,
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Endpoints requeridos:**
- `GET /api/cultivos` - Listar todos los cultivos
- `GET /api/cultivos/activos` - Listar cultivos activos
- `GET /api/cultivos/:id` - Obtener un cultivo específico
- `POST /api/cultivos` - Crear nuevo cultivo
- `PUT /api/cultivos/:id` - Actualizar cultivo
- `DELETE /api/cultivos/:id` - Eliminar (soft delete) cultivo

### 4. Módulo de Planificación

**Modelos de BD necesarios:**
```sql
CREATE TABLE actividades_planificadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  tipo ENUM('SIEMBRA', 'RIEGO', 'FUMIGACION', 'FERTILIZACION', 'COSECHA', 'MANTENIMIENTO', 'PODA', 'CONTROL_PLAGAS', 'OTRO') NOT NULL,
  prioridad ENUM('BAJA', 'MEDIA', 'ALTA', 'URGENTE') NOT NULL,
  estado ENUM('PENDIENTE', 'EN_PROGRESO', 'COMPLETADA', 'ATRASADA', 'CANCELADA') DEFAULT 'PENDIENTE',
  fecha_inicio_planificada DATE NOT NULL,
  fecha_fin_planificada DATE NOT NULL,
  duracion_estimada_horas INT NOT NULL,
  periodo ENUM('DIA', 'SEMANA', 'QUINCENAL', 'MES') NOT NULL,
  fecha_inicio_real DATE,
  fecha_fin_real DATE,
  duracion_real_horas INT,
  progreso_porcentaje INT DEFAULT 0,
  lote_id INT,
  cultivo_id INT,
  responsable_id INT,
  desviacion_tiempo_dias INT DEFAULT 0,
  requiere_atencion BOOLEAN DEFAULT FALSE,
  notas TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  creado_por INT,
  FOREIGN KEY (lote_id) REFERENCES lotes(id),
  FOREIGN KEY (cultivo_id) REFERENCES cultivos(id),
  FOREIGN KEY (responsable_id) REFERENCES usuarios(id),
  FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

CREATE TABLE actividad_trabajadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actividad_id INT NOT NULL,
  trabajador_id INT NOT NULL,
  horas_trabajadas DECIMAL(5,2) DEFAULT 0,
  horas_planificadas DECIMAL(5,2) NOT NULL,
  eficiencia_porcentaje INT DEFAULT 0,
  tareas_completadas INT DEFAULT 0,
  tareas_asignadas INT DEFAULT 0,
  FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
  FOREIGN KEY (trabajador_id) REFERENCES usuarios(id)
);

CREATE TABLE actividad_metas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actividad_id INT NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  valor_objetivo DECIMAL(10,2) NOT NULL,
  valor_actual DECIMAL(10,2) DEFAULT 0,
  unidad VARCHAR(50) NOT NULL,
  cumplida BOOLEAN DEFAULT FALSE,
  porcentaje_cumplimiento INT DEFAULT 0,
  fecha_cumplimiento DATE,
  FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE
);

CREATE TABLE alertas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actividad_id INT NOT NULL,
  tipo ENUM('RETRASO', 'BAJO_RENDIMIENTO', 'ACTIVIDAD_VENCIDA', 'DESVIACION_TIEMPO', 'DESVIACION_RECURSOS', 'CLIMA_ADVERSO', 'FALTA_RECURSOS') NOT NULL,
  severidad ENUM('INFO', 'WARNING', 'ERROR', 'CRITICAL') NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  leida BOOLEAN DEFAULT FALSE,
  resuelta BOOLEAN DEFAULT FALSE,
  fecha_resolucion TIMESTAMP,
  FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE
);
```

**Endpoints requeridos:**
- `GET /api/planificacion` - Listar actividades (con filtros)
- `GET /api/planificacion/:id` - Obtener actividad específica
- `POST /api/planificacion` - Crear nueva actividad
- `PUT /api/planificacion/:id` - Actualizar actividad
- `DELETE /api/planificacion/:id` - Eliminar actividad
- `PUT /api/planificacion/:id/progreso` - Actualizar progreso
- `GET /api/planificacion/estadisticas` - Estadísticas generales
- `GET /api/planificacion/lote/:loteId` - Actividades de un lote específico
- `GET /api/planificacion/alertas` - Obtener alertas activas

### 5. Módulo de Usuarios

**Tabla existente (extender):**
```sql
-- Agregar campos a tabla usuarios existente
ALTER TABLE usuarios 
ADD COLUMN rol_id INT,
ADD COLUMN trabajador_id INT,
ADD COLUMN estado ENUM('ACTIVO', 'INACTIVO', 'BLOQUEADO') DEFAULT 'ACTIVO',
ADD COLUMN foto_perfil VARCHAR(500),
ADD COLUMN ultimo_acceso TIMESTAMP;
```

**Endpoints requeridos:**
- `GET /api/usuarios` - Listar todos los usuarios
- `GET /api/usuarios/:id` - Obtener usuario específico
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

## 📂 Estructura de Archivos a Crear en Backend

```
backend/src/
├── models/
│   ├── lote.model.ts          ✅ TODO
│   ├── cultivo.model.ts        ✅ TODO
│   ├── planificacion.model.ts  ✅ TODO
│   └── usuario.model.ts        (extender existente)
│
├── controllers/
│   ├── lotes.controller.ts     ✅ TODO
│   ├── cultivos.controller.ts  ✅ TODO
│   ├── planificacion.controller.ts ✅ TODO
│   └── usuarios.controller.ts  ✅ TODO
│
├── services/
│   ├── lotes.service.ts        ✅ TODO
│   ├── cultivos.service.ts     ✅ TODO
│   ├── planificacion.service.ts ✅ TODO
│   └── usuarios.service.ts     ✅ TODO
│
├── routes/
│   ├── lotes.routes.ts         ✅ TODO
│   ├── cultivos.routes.ts      ✅ TODO
│   ├── planificacion.routes.ts ✅ TODO
│   └── usuarios.routes.ts      ✅ TODO
│
├── middlewares/
│   └── authMiddleware.ts       (ya existe)
│
└── server.ts                   (actualizar para incluir nuevas rutas)
```

## 🔧 Pasos Siguientes

1. **Crear modelos de BD**
   - Ejecutar scripts SQL para crear tablas
   - Crear modelos TypeScript correspondientes

2. **Crear controllers**
   - Implementar lógica de manejo de peticiones
   - Validación de datos de entrada

3. **Crear services**
   - Lógica de negocio
   - Operaciones CRUD en BD
   - Cálculos y procesamiento de datos

4. **Crear routes**
   - Definir endpoints
   - Aplicar middlewares de autenticación
   - Conectar con controllers

5. **Actualizar server.ts**
   - Registrar nuevas rutas

6. **Actualizar servicios del frontend**
   - Reemplazar mock data con llamadas a API real
   - Adaptar mapeo de datos si es necesario

## 📝 Notas Importantes

- Todos los endpoints (excepto auth) requieren autenticación con JWT
- Usar el middleware `authMiddleware` existente
- Mantener consistencia en formato de respuestas
- Implementar manejo de errores adecuado
- Validar datos de entrada en cada endpoint
- Usar prepared statements para prevenir SQL injection
- Implementar paginación en listados grandes

## 🎯 Prioridad de Implementación

1. **ALTA** - Cultivos (más simple, sin dependencias)
2. **ALTA** - Lotes (depende de cultivos)
3. **MEDIA** - Planificación (depende de lotes y cultivos)
4. **BAJA** - Usuarios (extender existente)


