-- ============================================================================
-- TABLAS DEL SISTEMA AGRÍCOLA
-- ============================================================================

-- 1. TABLA DE CULTIVOS
CREATE TABLE IF NOT EXISTS cultivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  nombre_cientifico VARCHAR(255),
  tipo ENUM('Hortaliza', 'Fruta', 'Cereal', 'Leguminosa', 'Tubérculo', 'Flor', 'Otro') NOT NULL,
  ciclo_dias INT NOT NULL,
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tipo (tipo),
  INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. TABLA DE LOTES
CREATE TABLE IF NOT EXISTS lotes (
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
  FOREIGN KEY (cultivo_id) REFERENCES cultivos(id) ON DELETE SET NULL,
  INDEX idx_codigo (codigo),
  INDEX idx_estado (estado),
  INDEX idx_cultivo (cultivo_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TABLA DE COORDENADAS DE LOTES
CREATE TABLE IF NOT EXISTS lote_coordenadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  latitud DECIMAL(10, 8) NOT NULL,
  longitud DECIMAL(11, 8) NOT NULL,
  orden INT NOT NULL,
  FOREIGN KEY (lote_id) REFERENCES lotes(id) ON DELETE CASCADE,
  INDEX idx_lote (lote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. TABLA DE ACTIVIDADES PLANIFICADAS
CREATE TABLE IF NOT EXISTS actividades_planificadas (
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
  FOREIGN KEY (lote_id) REFERENCES lotes(id) ON DELETE SET NULL,
  FOREIGN KEY (cultivo_id) REFERENCES cultivos(id) ON DELETE SET NULL,
  FOREIGN KEY (responsable_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_estado (estado),
  INDEX idx_lote (lote_id),
  INDEX idx_tipo (tipo),
  INDEX idx_fechas (fecha_inicio_planificada, fecha_fin_planificada)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TABLA DE TRABAJADORES ASIGNADOS A ACTIVIDADES
CREATE TABLE IF NOT EXISTS actividad_trabajadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actividad_id INT NOT NULL,
  trabajador_id INT NOT NULL,
  horas_trabajadas DECIMAL(5,2) DEFAULT 0,
  horas_planificadas DECIMAL(5,2) NOT NULL,
  eficiencia_porcentaje INT DEFAULT 0,
  tareas_completadas INT DEFAULT 0,
  tareas_asignadas INT DEFAULT 0,
  FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
  FOREIGN KEY (trabajador_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_actividad (actividad_id),
  INDEX idx_trabajador (trabajador_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. TABLA DE METAS DE ACTIVIDADES
CREATE TABLE IF NOT EXISTS actividad_metas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actividad_id INT NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  valor_objetivo DECIMAL(10,2) NOT NULL,
  valor_actual DECIMAL(10,2) DEFAULT 0,
  unidad VARCHAR(50) NOT NULL,
  cumplida BOOLEAN DEFAULT FALSE,
  porcentaje_cumplimiento INT DEFAULT 0,
  fecha_cumplimiento DATE,
  FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
  INDEX idx_actividad (actividad_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. TABLA DE ALERTAS
CREATE TABLE IF NOT EXISTS alertas (
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
  FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
  INDEX idx_actividad (actividad_id),
  INDEX idx_severidad (severidad),
  INDEX idx_leida (leida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================================================

-- Insertar cultivos de ejemplo
INSERT INTO cultivos (nombre, nombre_cientifico, tipo, ciclo_dias, descripcion) VALUES
('Café', 'Coffea arabica', 'Otro', 1825, 'Café arábigo de alta calidad para exportación'),
('Banano', 'Musa paradisiaca', 'Fruta', 365, 'Banano tipo exportación'),
('Maíz', 'Zea mays', 'Cereal', 120, 'Maíz amarillo para consumo'),
('Papa', 'Solanum tuberosum', 'Tubérculo', 150, 'Papa criolla'),
('Tomate', 'Solanum lycopersicum', 'Hortaliza', 90, 'Tomate chonto para mesa')
ON DUPLICATE KEY UPDATE nombre = nombre;

