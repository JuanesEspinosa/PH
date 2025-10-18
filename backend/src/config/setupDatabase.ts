import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  let connection;
  
  try {
    // Conectar sin especificar base de datos
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('📦 Iniciando configuración de base de datos...');

    // Crear base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'sistema_agricola'}`);
    console.log(`✅ Base de datos '${process.env.DB_NAME}' creada/verificada`);

    // Usar la base de datos
    await connection.query(`USE ${process.env.DB_NAME || 'sistema_agricola'}`);

    // Crear tabla de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(255) NOT NULL,
        avatar VARCHAR(500),
        reset_token VARCHAR(255),
        reset_token_expiry DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_reset_token (reset_token)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla usuarios creada/verificada');

    // Crear tabla de roles
    await connection.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_nombre (nombre)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla roles creada/verificada');

    // Crear tabla de tokens (opcional, para blacklist de tokens)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS token_blacklist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        token VARCHAR(500) NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        INDEX idx_token (token),
        INDEX idx_user_id (user_id),
        FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla token_blacklist creada/verificada');

    // Crear tabla de cultivos
    await connection.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla cultivos creada/verificada');

    // Insertar datos de ejemplo de cultivos
    await connection.query(`
      INSERT IGNORE INTO cultivos (id, nombre, nombre_cientifico, tipo, ciclo_dias, descripcion) VALUES
      (1, 'Café', 'Coffea arabica', 'Otro', 1825, 'Café arábigo de alta calidad para exportación'),
      (2, 'Banano', 'Musa paradisiaca', 'Fruta', 365, 'Banano tipo exportación'),
      (3, 'Maíz', 'Zea mays', 'Cereal', 120, 'Maíz amarillo para consumo'),
      (4, 'Papa', 'Solanum tuberosum', 'Tubérculo', 150, 'Papa criolla'),
      (5, 'Tomate', 'Solanum lycopersicum', 'Hortaliza', 90, 'Tomate chonto para mesa')
    `);
    console.log('✅ Datos de ejemplo de cultivos insertados');

    // Crear tabla de lotes
    await connection.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla lotes creada/verificada');

    // Crear tabla de coordenadas de lotes
    await connection.query(`
      CREATE TABLE IF NOT EXISTS lote_coordenadas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lote_id INT NOT NULL,
        latitud DECIMAL(10, 8) NOT NULL,
        longitud DECIMAL(11, 8) NOT NULL,
        orden INT NOT NULL,
        FOREIGN KEY (lote_id) REFERENCES lotes(id) ON DELETE CASCADE,
        INDEX idx_lote (lote_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla lote_coordenadas creada/verificada');

    // Crear tabla de actividades planificadas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS actividades_planificadas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT NOT NULL,
        tipo ENUM('SIEMBRA', 'RIEGO', 'FUMIGACION', 'FERTILIZACION', 'COSECHA', 'MANTENIMIENTO', 'PODA', 'CONTROL_PLAGAS', 'OTRO') NOT NULL,
        prioridad ENUM('BAJA', 'MEDIA', 'ALTA', 'URGENTE') DEFAULT 'MEDIA',
        estado ENUM('PENDIENTE', 'EN_PROGRESO', 'COMPLETADA', 'ATRASADA', 'CANCELADA') DEFAULT 'PENDIENTE',
        fecha_inicio_planificada TIMESTAMP NOT NULL,
        fecha_fin_planificada TIMESTAMP NOT NULL,
        duracion_estimada_horas DECIMAL(8,2) NOT NULL,
        periodo ENUM('DIA', 'SEMANA', 'QUINCENAL', 'MES') NOT NULL,
        fecha_inicio_real TIMESTAMP NULL,
        fecha_fin_real TIMESTAMP NULL,
        duracion_real_horas DECIMAL(8,2) NULL,
        progreso_porcentaje INT DEFAULT 0,
        lote_id INT NULL,
        cultivo_id INT NULL,
        responsable_id INT NULL,
        desviacion_tiempo_dias INT DEFAULT 0,
        requiere_atencion BOOLEAN DEFAULT FALSE,
        notas TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        creado_por INT NULL,
        FOREIGN KEY (lote_id) REFERENCES lotes(id) ON DELETE SET NULL,
        FOREIGN KEY (cultivo_id) REFERENCES cultivos(id) ON DELETE SET NULL,
        FOREIGN KEY (responsable_id) REFERENCES usuarios(id) ON DELETE SET NULL,
        FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
        INDEX idx_estado (estado),
        INDEX idx_lote (lote_id),
        INDEX idx_fecha_inicio (fecha_inicio_planificada),
        INDEX idx_prioridad (prioridad)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla actividades_planificadas creada/verificada');

    // Crear tabla de trabajadores asignados a actividades
    await connection.query(`
      CREATE TABLE IF NOT EXISTS actividad_trabajadores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        actividad_id INT NOT NULL,
        trabajador_id INT NOT NULL,
        horas_planificadas DECIMAL(8,2) DEFAULT 0,
        horas_reales DECIMAL(8,2) DEFAULT 0,
        FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
        FOREIGN KEY (trabajador_id) REFERENCES usuarios(id) ON DELETE CASCADE,
        INDEX idx_actividad (actividad_id),
        INDEX idx_trabajador (trabajador_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla actividad_trabajadores creada/verificada');

    // Crear tabla de metas de actividades
    await connection.query(`
      CREATE TABLE IF NOT EXISTS actividad_metas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        actividad_id INT NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        valor_objetivo DECIMAL(10,2) NOT NULL,
        valor_actual DECIMAL(10,2) DEFAULT 0,
        unidad VARCHAR(50) NOT NULL,
        cumplida BOOLEAN DEFAULT FALSE,
        porcentaje_cumplimiento INT DEFAULT 0,
        fecha_cumplimiento TIMESTAMP NULL,
        FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
        INDEX idx_actividad (actividad_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla actividad_metas creada/verificada');

    // Crear tabla de alertas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS alertas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        actividad_id INT NOT NULL,
        tipo ENUM('RETRASO', 'BAJO_RENDIMIENTO', 'ACTIVIDAD_VENCIDA', 'DESVIACION_TIEMPO', 'DESVIACION_RECURSOS', 'CLIMA_ADVERSO', 'FALTA_RECURSOS') NOT NULL,
        severidad ENUM('INFO', 'WARNING', 'ERROR', 'CRITICAL') DEFAULT 'INFO',
        titulo VARCHAR(255) NOT NULL,
        mensaje TEXT NOT NULL,
        fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        leida BOOLEAN DEFAULT FALSE,
        resuelta BOOLEAN DEFAULT FALSE,
        fecha_resolucion TIMESTAMP NULL,
        FOREIGN KEY (actividad_id) REFERENCES actividades_planificadas(id) ON DELETE CASCADE,
        INDEX idx_actividad (actividad_id),
        INDEX idx_resuelta (resuelta),
        INDEX idx_fecha (fecha_generacion)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla alertas creada/verificada');

    console.log('🎉 Base de datos configurada exitosamente');
    
  } catch (error) {
    console.error('❌ Error configurando base de datos:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default setupDatabase;

