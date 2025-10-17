# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a comenzar.

## 📋 Código de Conducta

Este proyecto y todos sus participantes están regidos por un código de conducta. Al participar, se espera que mantengas este código.

- Sé respetuoso y considerado
- Acepta las críticas constructivas
- Enfócate en lo que es mejor para la comunidad
- Muestra empatía hacia otros miembros

## 🚀 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug:

1. **Verifica** que no haya sido reportado antes en [Issues](https://github.com/tu-usuario/tu-repo/issues)
2. **Abre un nuevo issue** con:
   - Título descriptivo
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Versión del navegador y sistema operativo

**Template de Bug:**

```markdown
### Descripción
Una descripción clara del bug.

### Pasos para reproducir
1. Ir a '...'
2. Hacer click en '...'
3. Ver el error

### Comportamiento esperado
Lo que debería suceder.

### Comportamiento actual
Lo que realmente sucede.

### Screenshots
Si aplica.

### Entorno
- OS: [ej. Windows 10]
- Browser: [ej. Chrome 120]
- Versión: [ej. 1.0.0]
```

### Sugerir Mejoras

Para sugerir nuevas funcionalidades:

1. **Abre un issue** con etiqueta `enhancement`
2. Describe detalladamente tu idea
3. Explica por qué sería útil
4. Proporciona ejemplos si es posible

### Pull Requests

#### Proceso

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/nombre-de-tu-feature
   ```
3. **Haz tus cambios** siguiendo las guías de estilo
4. **Agrega tests** si aplica
5. **Actualiza la documentación** si es necesario
6. **Commit** tus cambios con mensajes descriptivos
7. **Push** a tu fork
8. **Abre un Pull Request** hacia `main`

#### Buenas Prácticas

**Commits:**
- Usa mensajes descriptivos en español
- Formato: `tipo: descripción breve`
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

```bash
feat: agregar autenticación con Google
fix: corregir error en validación de email
docs: actualizar README con nuevas instrucciones
style: formatear código según prettier
refactor: simplificar lógica del authStore
test: agregar tests para LoginPage
chore: actualizar dependencias
```

**Ramas:**
- `feature/nombre` - Nuevas funcionalidades
- `fix/nombre` - Corrección de bugs
- `docs/nombre` - Cambios en documentación
- `refactor/nombre` - Refactorización de código

**Código:**
- Sigue las guías de estilo del proyecto
- Escribe código limpio y legible
- Comenta código complejo cuando sea necesario
- Mantén funciones pequeñas y enfocadas

## 📝 Guías de Estilo

### TypeScript

```typescript
// ✅ BIEN - Tipado explícito
interface User {
  id: string
  name: string
  email: string
}

const getUser = (id: string): Promise<User> => {
  return api.get(`/users/${id}`)
}

// ❌ MAL - Sin tipos
const getUser = (id) => {
  return api.get(`/users/${id}`)
}
```

### React

```typescript
// ✅ BIEN - Componente funcional con tipos
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn('base-class', variant)}>
      {children}
    </button>
  )
}

// ❌ MAL - Sin tipos, sin export
function Button(props) {
  return <button>{props.children}</button>
}
```

### Nombres

```typescript
// ✅ BIEN
const getUserById = (id: string) => { }
const MAX_RETRIES = 3
interface UserProfile { }
function LoginPage() { }

// ❌ MAL
const getuser = (id) => { }
const maxretries = 3
interface userprofile { }
function loginpage() { }
```

### Importaciones

```typescript
// ✅ BIEN - Organizadas y con alias
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { User } from '@/types'

// ❌ MAL - Desordenadas
import { User } from '@/types'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
```

### Estilos (Tailwind)

```typescript
// ✅ BIEN - Clases organizadas
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
  Content
</div>

// ✅ También bien - Con cn()
<div className={cn(
  'flex items-center justify-between',
  'px-4 py-2',
  'bg-white rounded-lg shadow-md',
  isActive && 'border-2 border-blue-500'
)}>
  Content
</div>

// ❌ MAL - Desorganizado
<div className="bg-white flex px-4 hover:shadow-lg rounded-lg py-2 items-center shadow-md justify-between">
  Content
</div>
```

## 🧪 Tests

Aunque actualmente no hay tests implementados, al agregarlos:

```typescript
// Ejemplo de test esperado
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    screen.getByText('Click me').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

## 📚 Documentación

Si agregas una nueva funcionalidad:

1. **Actualiza el README** si es necesario
2. **Agrega comentarios** en el código para lógica compleja
3. **Actualiza CHANGELOG.md** con tus cambios
4. **Agrega ejemplos** de uso si aplica

Ejemplo de documentación de función:

```typescript
/**
 * Obtiene un usuario por su ID
 * @param id - El ID único del usuario
 * @returns Una promesa que resuelve con los datos del usuario
 * @throws Error si el usuario no existe
 * @example
 * const user = await getUserById('123')
 * console.log(user.name)
 */
async function getUserById(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`)
  return response.data
}
```

## 🔍 Review Process

Cuando abras un PR:

1. **Auto-review**: Revisa tu propio código antes de enviar
2. **CI/CD**: Espera que pasen todos los checks automáticos
3. **Code Review**: Un maintainer revisará tu código
4. **Cambios**: Implementa los cambios solicitados si hay
5. **Merge**: Una vez aprobado, se hará merge

### Checklist para PRs

- [ ] El código compila sin errores
- [ ] No hay warnings de linting
- [ ] Los tests pasan (cuando los haya)
- [ ] La documentación está actualizada
- [ ] CHANGELOG.md está actualizado
- [ ] El código sigue las guías de estilo
- [ ] Los commits tienen mensajes descriptivos
- [ ] No hay console.logs innecesarios
- [ ] No hay código comentado sin usar

## 🎯 Áreas para Contribuir

### Funcionalidades Prioritarias

- [ ] Implementar tests unitarios y de integración
- [ ] Agregar modo oscuro completo
- [ ] Implementar i18n (internacionalización)
- [ ] Mejorar accesibilidad (a11y)
- [ ] Agregar más ejemplos en documentación
- [ ] Optimizar rendimiento
- [ ] Agregar más componentes UI

### Documentación

- [ ] Tutoriales paso a paso
- [ ] Videos explicativos
- [ ] Ejemplos de casos de uso
- [ ] Traducciones a otros idiomas
- [ ] Diagramas de arquitectura

### Bugs Conocidos

Revisa los [Issues](https://github.com/tu-usuario/tu-repo/issues) con etiqueta `bug`.

## 🏆 Reconocimiento

Los contribuidores serán reconocidos en:
- La sección de Contributors de GitHub
- El archivo README.md (para contribuciones significativas)
- Las notas de la release correspondiente

## 💬 ¿Preguntas?

Si tienes preguntas:
- Abre un issue con etiqueta `question`
- Revisa la documentación existente
- Contacta a los maintainers

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto (MIT License).

---

**¡Gracias por contribuir! 🎉**

Tu ayuda hace que este proyecto sea mejor para todos.


