# 🗄️ Backend - Módulo de Autenticación

## Schema de Base de Datos

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'usuario') DEFAULT 'usuario',
  avatar VARCHAR(500),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

## Implementación Node.js/Express

```javascript
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    await user.update({ last_login: new Date() })
    
    res.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        avatar: user.avatar
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body
    
    const exists = await User.findOne({ where: { email } })
    if (exists) {
      return res.status(409).json({ message: 'Email ya registrado' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol: 'usuario'
    })
    
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    res.status(201).json({
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

module.exports = router
```

## Middleware de Autenticación

```javascript
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' })
    }
    req.user = user
    next()
  })
}

module.exports = { authenticateToken }
```

## ✅ Checklist

- [ ] Tabla `users` creada
- [ ] Hash de contraseñas con bcrypt
- [ ] JWT implementado
- [ ] POST `/api/auth/login`
- [ ] POST `/api/auth/register`
- [ ] POST `/api/auth/forgot-password`
- [ ] POST `/api/auth/reset-password`
- [ ] GET `/api/auth/verify`
- [ ] POST `/api/auth/logout`
- [ ] Middleware de autenticación
- [ ] Rate limiting en login
- [ ] Envío de emails
- [ ] Tests unitarios

