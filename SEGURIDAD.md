# 🛡️ Guía de Seguridad y Buenas Prácticas

Esta guía contiene recomendaciones de seguridad esenciales para tu aplicación.

## 🔐 Autenticación y Autorización

### 1. Tokens JWT

**✅ Buenas Prácticas:**

- Almacena los tokens en `localStorage` solo para aplicaciones de confianza
- Para aplicaciones de alta seguridad, usa cookies HttpOnly
- Implementa refresh tokens para sesiones largas
- Establece tiempos de expiración apropiados (ej: 15 min para access token)

**Ejemplo de implementación segura:**

```typescript
// authStore.ts
login: (user, token) => {
  // Verificar token antes de guardarlo
  if (!token || token.length < 20) {
    throw new Error('Token inválido')
  }
  
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  
  set({
    user,
    token,
    isAuthenticated: true,
  })
}
```

### 2. Protección de Rutas

**Implementado en:** `src/components/auth/ProtectedRoute.tsx`

```typescript
// Siempre verifica autenticación en el servidor también
// El frontend es solo la primera línea de defensa
```

### 3. Validación de Contraseñas

**Requisitos mínimos recomendados:**

- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número
- Al menos un carácter especial

**Ejemplo de validación:**

```typescript
const validatePassword = (password: string) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  )
}
```

## 🔒 Seguridad de Datos

### 1. Sanitización de Inputs

**Siempre sanitiza y valida los inputs del usuario:**

```typescript
// ❌ MAL
const searchUsers = (query: string) => {
  api.get(`/users?search=${query}`) // Vulnerable a inyección
}

// ✅ BIEN
const searchUsers = (query: string) => {
  const sanitized = encodeURIComponent(query)
  api.get(`/users?search=${sanitized}`)
}
```

### 2. XSS (Cross-Site Scripting)

React previene XSS por defecto, pero ten cuidado con:

```typescript
// ❌ PELIGROSO
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SEGURO - Usa librerías de sanitización
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### 3. CSRF (Cross-Site Request Forgery)

**Implementa tokens CSRF en tu backend:**

```typescript
// Agrega el token CSRF a las peticiones
api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken()
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken
  }
  return config
})
```

## 🌐 Configuración de API

### 1. HTTPS en Producción

**Siempre usa HTTPS en producción:**

```env
# .env.production
VITE_API_URL=https://api.tudominio.com/api
```

### 2. CORS (Cross-Origin Resource Sharing)

**Configura CORS correctamente en tu backend:**

```javascript
// Backend (Express ejemplo)
app.use(cors({
  origin: 'https://tudominio.com',
  credentials: true,
}))
```

### 3. Rate Limiting

**Implementa limitación de peticiones:**

```typescript
// Ejemplo de implementación en el frontend
const rateLimiter = {
  requests: 0,
  maxRequests: 100,
  timeWindow: 60000, // 1 minuto
  
  canMakeRequest() {
    return this.requests < this.maxRequests
  }
}
```

## 🔑 Variables de Entorno

### 1. Manejo Seguro

**❌ NUNCA hagas esto:**

```typescript
const API_KEY = "12345-secret-key" // ¡Nunca en el código!
```

**✅ USA variables de entorno:**

```typescript
const API_KEY = import.meta.env.VITE_API_KEY
```

### 2. Variables Públicas vs Privadas

**En Vite, solo las variables con prefijo `VITE_` están disponibles en el cliente:**

```env
# ✅ Seguro - Solo en servidor
DATABASE_URL=postgresql://...

# ⚠️ Público - Visible en el cliente
VITE_API_URL=https://api.example.com
```

### 3. Archivo .env.example

**Mantén un ejemplo sin valores sensibles:**

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp
# No incluyas claves reales aquí
```

## 🚨 Manejo de Errores

### 1. No Expongas Información Sensible

**❌ MAL:**

```typescript
catch (error) {
  toast({
    title: 'Error',
    description: error.response.data.stack, // ¡Expone detalles del servidor!
  })
}
```

**✅ BIEN:**

```typescript
catch (error) {
  console.error('Error detallado:', error) // Solo en desarrollo
  toast({
    title: 'Error',
    description: 'Ocurrió un error. Por favor, intenta de nuevo.',
  })
}
```

### 2. Logging Seguro

```typescript
// ❌ No loguees información sensible
console.log('Password:', password)
console.log('Token:', token)

// ✅ Loguea solo información necesaria
console.log('Login attempt for user:', email)
console.log('Request failed:', error.message)
```

## 📱 Seguridad del Cliente

### 1. Dependencias

**Mantén las dependencias actualizadas:**

```bash
# Verifica vulnerabilidades
npm audit

# Arregla automáticamente
npm audit fix

# Actualiza dependencias
npm update
```

### 2. Content Security Policy (CSP)

**Agrega CSP headers en tu servidor:**

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 3. Subresource Integrity (SRI)

**Para CDNs externos:**

```html
<script src="https://cdn.example.com/library.js" 
        integrity="sha384-..." 
        crossorigin="anonymous"></script>
```

## 🔍 Auditoría y Monitoreo

### 1. Logging de Eventos Importantes

```typescript
// Registra eventos de seguridad
const logSecurityEvent = (event: string, details: any) => {
  api.post('/security/log', {
    event,
    timestamp: new Date().toISOString(),
    details: sanitizeForLogging(details),
  })
}

// Ejemplo de uso
logSecurityEvent('login_attempt', { email: user.email })
logSecurityEvent('password_reset', { email })
```

### 2. Monitoreo de Errores

**Usa herramientas como Sentry:**

```typescript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-dsn",
  environment: import.meta.env.MODE,
})
```

## ✅ Checklist de Seguridad

Antes de ir a producción, verifica:

- [ ] HTTPS habilitado
- [ ] Variables de entorno configuradas correctamente
- [ ] Tokens JWT con expiración
- [ ] Validación de inputs en frontend y backend
- [ ] CORS configurado correctamente
- [ ] Rate limiting implementado
- [ ] Dependencias actualizadas (sin vulnerabilidades)
- [ ] CSP headers configurados
- [ ] Logging de eventos de seguridad
- [ ] Manejo de errores sin exponer información sensible
- [ ] Contraseñas hasheadas en el backend (bcrypt, argon2)
- [ ] Protección contra XSS, CSRF, SQL Injection
- [ ] Backup y recuperación de datos configurados

## 📚 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/thinking-in-react#security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 🆘 En Caso de Incidente de Seguridad

1. **No entres en pánico**
2. **Documenta el incidente**
3. **Notifica al equipo de seguridad**
4. **Revoca credenciales comprometidas**
5. **Investiga el alcance**
6. **Implementa correcciones**
7. **Notifica a usuarios afectados**
8. **Aprende y mejora**

---

**Recuerda:** La seguridad es un proceso continuo, no un destino. Mantén tu aplicación actualizada y sigue las mejores prácticas siempre.


