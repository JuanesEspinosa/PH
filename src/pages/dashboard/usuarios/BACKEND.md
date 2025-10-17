# 🗄️ Backend - Módulo de Usuarios

## Schema de Base de Datos

```sql
CREATE TABLE usuarios (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
  departamento VARCHAR(255),
  telefono VARCHAR(50),
  avatar VARCHAR(500),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultimo_acceso TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_usuarios_estado ON usuarios(estado);
CREATE INDEX idx_usuarios_search ON usuarios(nombre, email, departamento);
```

---

## Implementación Node.js/Express

```javascript
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { authenticateToken, requireAdmin } = require('../middleware/auth')

// LISTAR USUARIOS
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { q, page = 1, limit = 50, rol, estado } = req.query
    
    let query = {}
    
    // Búsqueda
    if (q) {
      query = {
        $or: [
          { nombre: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
          { departamento: { $regex: q, $options: 'i' } }
        ]
      }
    }
    
    // Filtros
    if (rol) query.rol = rol
    if (estado) query.estado = estado
    
    const skip = (page - 1) * limit
    
    const usuarios = await Usuario.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ fecha_creacion: -1 })
    
    const total = await Usuario.countDocuments(query)
    
    res.json({
      data: usuarios,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

// OBTENER POR ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password')
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    
    // Usuario normal solo puede ver su propio perfil
    if (req.user.rol !== 'admin' && req.user.id !== usuario.id) {
      return res.status(403).json({ message: 'Sin permisos' })
    }
    
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

// CREAR USUARIO
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { nombre, email, password, rol, estado, departamento, telefono, avatar } = req.body
    
    // Validaciones
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: 'Campos requeridos faltantes' })
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Contraseña debe tener mínimo 6 caracteres' })
    }
    
    // Verificar email único
    const existe = await Usuario.findOne({ email })
    if (existe) {
      return res.status(409).json({ message: 'Email ya registrado' })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
      estado: estado || 'activo',
      departamento,
      telefono,
      avatar
    })
    
    // No retornar password
    const usuarioSinPassword = usuario.toObject()
    delete usuarioSinPassword.password
    
    res.status(201).json(usuarioSinPassword)
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

// ACTUALIZAR USUARIO
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { nombre, email, password, rol, estado, departamento, telefono, avatar } = req.body
    
    // Verificar permisos
    if (req.user.rol !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Sin permisos' })
    }
    
    const updates = {}
    
    if (nombre) updates.nombre = nombre
    if (email) {
      // Verificar que email sea único
      const existe = await Usuario.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      })
      if (existe) {
        return res.status(409).json({ message: 'Email ya registrado' })
      }
      updates.email = email
    }
    if (password) {
      updates.password = await bcrypt.hash(password, 10)
    }
    if (rol && req.user.rol === 'admin') updates.rol = rol
    if (estado !== undefined) updates.estado = estado
    if (departamento !== undefined) updates.departamento = departamento
    if (telefono !== undefined) updates.telefono = telefono
    if (avatar !== undefined) updates.avatar = avatar
    
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password')
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

// ELIMINAR USUARIO
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // No permitir eliminar al propio usuario
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: 'No puedes eliminarte a ti mismo' })
    }
    
    const usuario = await Usuario.findByIdAndDelete(req.params.id)
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    
    res.json({ 
      message: 'Usuario eliminado exitosamente',
      id: req.params.id
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

module.exports = router
```

---

## Middleware requireAdmin

```javascript
function requireAdmin(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Requiere permisos de administrador' })
  }
  next()
}

module.exports = { requireAdmin }
```

---

## ✅ Checklist

- [ ] Tabla `usuarios` creada
- [ ] Índices creados (email, rol, estado)
- [ ] GET `/api/usuarios` (lista)
- [ ] GET `/api/usuarios/:id` (detalle)
- [ ] POST `/api/usuarios` (crear)
- [ ] PUT `/api/usuarios/:id` (actualizar)
- [ ] DELETE `/api/usuarios/:id` (eliminar)
- [ ] Búsqueda implementada
- [ ] Paginación implementada
- [ ] Validación de email único
- [ ] Hash de contraseñas
- [ ] Control de permisos
- [ ] Tests unitarios
- [ ] Soft delete (opcional)


