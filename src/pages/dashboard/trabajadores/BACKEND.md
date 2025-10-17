# Guía de Implementación del Backend - Módulo de Trabajadores

Esta guía proporciona ejemplos de implementación del backend para el módulo de trabajadores.

## Modelo de Base de Datos

### Esquema SQL (PostgreSQL)

```sql
CREATE TABLE trabajadores (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    documento VARCHAR(50) NOT NULL UNIQUE,
    tipo_documento VARCHAR(20) NOT NULL CHECK (tipo_documento IN ('DNI', 'Pasaporte', 'Cédula', 'Otro')),
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cargo VARCHAR(100) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'vacaciones', 'licencia')),
    direccion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES usuarios(id),
    updated_by INTEGER REFERENCES usuarios(id),
    
    CONSTRAINT fecha_ingreso_no_futura CHECK (fecha_ingreso <= CURRENT_DATE)
);

-- Índices
CREATE INDEX idx_trabajadores_email ON trabajadores(email);
CREATE INDEX idx_trabajadores_documento ON trabajadores(documento);
CREATE INDEX idx_trabajadores_estado ON trabajadores(estado);
CREATE INDEX idx_trabajadores_deleted_at ON trabajadores(deleted_at);
CREATE INDEX idx_trabajadores_cargo ON trabajadores(cargo);

-- Trigger para actualizar ultima_modificacion
CREATE OR REPLACE FUNCTION update_ultima_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ultima_modificacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ultima_modificacion
    BEFORE UPDATE ON trabajadores
    FOR EACH ROW
    EXECUTE FUNCTION update_ultima_modificacion();
```

### Esquema MongoDB

```javascript
{
  "_id": ObjectId,
  "nombres": String,
  "apellidos": String,
  "documento": String, // unique
  "tipoDocumento": String, // enum: ['DNI', 'Pasaporte', 'Cédula', 'Otro']
  "telefono": String,
  "email": String, // unique
  "cargo": String,
  "fechaIngreso": Date,
  "estado": String, // enum: ['activo', 'inactivo', 'vacaciones', 'licencia']
  "direccion": String,
  "fechaCreacion": Date,
  "ultimaModificacion": Date,
  "deletedAt": Date,
  "createdBy": ObjectId,
  "updatedBy": ObjectId
}

// Índices
db.trabajadores.createIndex({ "email": 1 }, { unique: true });
db.trabajadores.createIndex({ "documento": 1 }, { unique: true });
db.trabajadores.createIndex({ "estado": 1 });
db.trabajadores.createIndex({ "deletedAt": 1 });
```

## Ejemplos de Implementación

### Node.js + Express + PostgreSQL

```javascript
// models/Trabajador.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Trabajador = sequelize.define('Trabajador', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    documento: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 50],
      },
    },
    tipoDocumento: {
      type: DataTypes.ENUM('DNI', 'Pasaporte', 'Cédula', 'Otro'),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    cargo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    fechaIngreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString().split('T')[0],
      },
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo', 'vacaciones', 'licencia'),
      allowNull: false,
      defaultValue: 'activo',
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 500],
      },
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ultimaModificacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'trabajadores',
    timestamps: false,
    paranoid: true,
  });

  return Trabajador;
};

// controllers/trabajadorController.js
const { Trabajador } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const trabajadores = await Trabajador.findAll({
      where: { deletedAt: null },
      order: [['fechaCreacion', 'DESC']],
    });
    res.json(trabajadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener trabajadores' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajador = await Trabajador.findByPk(id);
    
    if (!trabajador || trabajador.deletedAt) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }
    
    res.json(trabajador);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener trabajador' });
  }
};

exports.create = async (req, res) => {
  try {
    const trabajador = await Trabajador.create({
      ...req.body,
      createdBy: req.user.id,
    });
    
    res.status(201).json(trabajador);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        error: 'El email o documento ya existe' 
      });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validación fallida',
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ error: 'Error al crear trabajador' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajador = await Trabajador.findByPk(id);
    
    if (!trabajador || trabajador.deletedAt) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }
    
    await trabajador.update({
      ...req.body,
      updatedBy: req.user.id,
      ultimaModificacion: new Date(),
    });
    
    res.json(trabajador);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validación fallida',
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ error: 'Error al actualizar trabajador' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajador = await Trabajador.findByPk(id);
    
    if (!trabajador || trabajador.deletedAt) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }
    
    // Soft delete
    await trabajador.update({ deletedAt: new Date() });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar trabajador' });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    const { Op } = require('sequelize');
    
    const trabajadores = await Trabajador.findAll({
      where: {
        deletedAt: null,
        [Op.or]: [
          { nombres: { [Op.iLike]: `%${q}%` } },
          { apellidos: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
          { documento: { [Op.iLike]: `%${q}%` } },
          { cargo: { [Op.iLike]: `%${q}%` } },
        ],
      },
    });
    
    res.json(trabajadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar trabajadores' });
  }
};

// routes/trabajadores.js
const express = require('express');
const router = express.Router();
const trabajadorController = require('../controllers/trabajadorController');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/checkRole');

router.get('/', auth, trabajadorController.getAll);
router.get('/search', auth, trabajadorController.search);
router.get('/:id', auth, trabajadorController.getById);
router.post('/', auth, checkRole(['admin', 'rrhh']), trabajadorController.create);
router.put('/:id', auth, checkRole(['admin', 'rrhh']), trabajadorController.update);
router.delete('/:id', auth, checkRole(['admin']), trabajadorController.delete);

module.exports = router;
```

### Python + FastAPI + SQLAlchemy

```python
# models.py
from sqlalchemy import Column, Integer, String, Date, DateTime, Enum, Text
from sqlalchemy.sql import func
from database import Base
import enum

class TipoDocumento(str, enum.Enum):
    DNI = "DNI"
    PASAPORTE = "Pasaporte"
    CEDULA = "Cédula"
    OTRO = "Otro"

class EstadoTrabajador(str, enum.Enum):
    ACTIVO = "activo"
    INACTIVO = "inactivo"
    VACACIONES = "vacaciones"
    LICENCIA = "licencia"

class Trabajador(Base):
    __tablename__ = "trabajadores"

    id = Column(Integer, primary_key=True, index=True)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100), nullable=False)
    documento = Column(String(50), unique=True, nullable=False, index=True)
    tipo_documento = Column(Enum(TipoDocumento), nullable=False)
    telefono = Column(String(20), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    cargo = Column(String(100), nullable=False)
    fecha_ingreso = Column(Date, nullable=False)
    estado = Column(Enum(EstadoTrabajador), nullable=False, default=EstadoTrabajador.ACTIVO)
    direccion = Column(Text, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    ultima_modificacion = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

# schemas.py
from pydantic import BaseModel, EmailStr, validator
from datetime import date, datetime
from typing import Optional

class TrabajadorBase(BaseModel):
    nombres: str
    apellidos: str
    documento: str
    tipo_documento: str
    telefono: str
    email: EmailStr
    cargo: str
    fecha_ingreso: date
    direccion: str

    @validator('nombres', 'apellidos')
    def validar_longitud_minima(cls, v):
        if len(v) < 2:
            raise ValueError('Debe tener al menos 2 caracteres')
        return v

    @validator('documento')
    def validar_documento(cls, v):
        if len(v) < 5:
            raise ValueError('El documento debe tener al menos 5 caracteres')
        return v

    @validator('fecha_ingreso')
    def validar_fecha_no_futura(cls, v):
        if v > date.today():
            raise ValueError('La fecha de ingreso no puede ser futura')
        return v

class TrabajadorCreate(TrabajadorBase):
    pass

class TrabajadorUpdate(BaseModel):
    nombres: Optional[str]
    apellidos: Optional[str]
    documento: Optional[str]
    tipo_documento: Optional[str]
    telefono: Optional[str]
    email: Optional[EmailStr]
    cargo: Optional[str]
    fecha_ingreso: Optional[date]
    estado: Optional[str]
    direccion: Optional[str]

class Trabajador(TrabajadorBase):
    id: int
    estado: str
    fecha_creacion: datetime
    ultima_modificacion: Optional[datetime]

    class Config:
        orm_mode = True

# routers/trabajadores.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Trabajador
from schemas import TrabajadorCreate, TrabajadorUpdate, Trabajador as TrabajadorSchema

router = APIRouter(prefix="/trabajadores", tags=["trabajadores"])

@router.get("/", response_model=List[TrabajadorSchema])
def get_trabajadores(db: Session = Depends(get_db)):
    return db.query(Trabajador).filter(Trabajador.deleted_at == None).all()

@router.get("/{id}", response_model=TrabajadorSchema)
def get_trabajador(id: int, db: Session = Depends(get_db)):
    trabajador = db.query(Trabajador).filter(
        Trabajador.id == id,
        Trabajador.deleted_at == None
    ).first()
    if not trabajador:
        raise HTTPException(status_code=404, detail="Trabajador no encontrado")
    return trabajador

@router.post("/", response_model=TrabajadorSchema, status_code=status.HTTP_201_CREATED)
def create_trabajador(trabajador: TrabajadorCreate, db: Session = Depends(get_db)):
    db_trabajador = Trabajador(**trabajador.dict())
    db.add(db_trabajador)
    try:
        db.commit()
        db.refresh(db_trabajador)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email o documento ya existe")
    return db_trabajador

@router.put("/{id}", response_model=TrabajadorSchema)
def update_trabajador(id: int, trabajador: TrabajadorUpdate, db: Session = Depends(get_db)):
    db_trabajador = db.query(Trabajador).filter(
        Trabajador.id == id,
        Trabajador.deleted_at == None
    ).first()
    if not db_trabajador:
        raise HTTPException(status_code=404, detail="Trabajador no encontrado")
    
    for field, value in trabajador.dict(exclude_unset=True).items():
        setattr(db_trabajador, field, value)
    
    db.commit()
    db.refresh(db_trabajador)
    return db_trabajador

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trabajador(id: int, db: Session = Depends(get_db)):
    db_trabajador = db.query(Trabajador).filter(
        Trabajador.id == id,
        Trabajador.deleted_at == None
    ).first()
    if not db_trabajador:
        raise HTTPException(status_code=404, detail="Trabajador no encontrado")
    
    db_trabajador.deleted_at = datetime.now()
    db.commit()
    return None

@router.get("/search/", response_model=List[TrabajadorSchema])
def search_trabajadores(q: str, db: Session = Depends(get_db)):
    return db.query(Trabajador).filter(
        Trabajador.deleted_at == None,
        (Trabajador.nombres.ilike(f"%{q}%")) |
        (Trabajador.apellidos.ilike(f"%{q}%")) |
        (Trabajador.email.ilike(f"%{q}%")) |
        (Trabajador.documento.ilike(f"%{q}%")) |
        (Trabajador.cargo.ilike(f"%{q}%"))
    ).all()
```

## Recomendaciones de Seguridad

1. **Validación de Entrada**: Valida todos los datos en el backend
2. **Sanitización**: Limpia inputs para prevenir SQL injection y XSS
3. **Rate Limiting**: Implementa límites de peticiones
4. **Autenticación**: Usa JWT o similar para autenticación
5. **Autorización**: Verifica permisos antes de cada operación
6. **Logs**: Registra todas las operaciones sensibles
7. **Encriptación**: Usa HTTPS en producción
8. **Backup**: Implementa respaldos automáticos de la base de datos

## Testing

Asegúrate de probar:
- Validaciones de todos los campos
- Unicidad de email y documento
- Soft delete funciona correctamente
- Búsqueda devuelve resultados correctos
- Autenticación y autorización
- Manejo de errores

