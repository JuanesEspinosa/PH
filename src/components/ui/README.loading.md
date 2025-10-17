# Loading Component

Componente de loading reutilizable con animación de taza de café. Incluye diferentes variantes y tamaños para adaptarse a diferentes casos de uso.

## Características

- 🎨 **3 Variantes**: overlay, inline, button
- 📏 **3 Tamaños**: sm, md, lg
- 🎭 **Animación suave**: Expansión de taza con humo animado
- ⚡ **TypeScript**: Totalmente tipado
- 🎯 **Flexible**: Props configurables para diferentes casos de uso
- 📱 **Responsive**: Se adapta a diferentes tamaños de pantalla

## Instalación

El componente ya está incluido en el proyecto. Solo necesitas importarlo:

```tsx
import Loading from '@/components/ui/loading'
```

## Uso Básico

### 1. Loading Overlay (Pantalla Completa)

Para operaciones que bloquean toda la UI:

```tsx
import { useState } from 'react'
import Loading from '@/components/ui/loading'

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async () => {
    setIsLoading(true)
    await fetchData()
    setIsLoading(false)
  }

  return (
    <>
      <button onClick={handleAction}>Cargar Datos</button>
      {isLoading && (
        <Loading
          variant="overlay"
          size="lg"
          text="Cargando datos..."
        />
      )}
    </>
  )
}
```

### 2. Loading Inline (Dentro de Contenedores)

Para secciones específicas de la página:

```tsx
import Loading from '@/components/ui/loading'

function DataSection() {
  const { data, isLoading } = useQuery('data', fetchData)

  return (
    <div className="container">
      {isLoading ? (
        <Loading
          variant="inline"
          size="md"
          text="Cargando contenido..."
        />
      ) : (
        <DataDisplay data={data} />
      )}
    </div>
  )
}
```

### 3. Loading en Botones

Para mostrar loading dentro de botones durante operaciones:

```tsx
import { useLoading } from '@/hooks/use-loading'
import Loading from '@/components/ui/loading'
import { Button } from '@/components/ui/button'

function SaveButton() {
  const { isLoading, withLoading } = useLoading()

  const handleSave = async () => {
    await withLoading(async () => {
      await api.saveData(formData)
    })
  }

  return (
    <Button onClick={handleSave} disabled={isLoading}>
      {isLoading ? (
        <Loading variant="button" size="sm" />
      ) : (
        'Guardar Cambios'
      )}
    </Button>
  )
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'overlay' \| 'inline' \| 'button'` | `'inline'` | Tipo de visualización del loading |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del loading |
| `text` | `string \| undefined` | `undefined` | Texto a mostrar debajo del loading |
| `overlayColor` | `string` | `'rgba(0, 0, 0, 0.8)'` | Color del fondo (solo para variant='overlay') |
| `overlayOpacity` | `number` | `0.8` | Opacidad del fondo (solo para variant='overlay') |
| `className` | `string` | `''` | Clases CSS adicionales |

## Variantes

### Overlay
```tsx
<Loading variant="overlay" size="lg" text="Procesando..." />
```
- Cubre toda la pantalla
- Fondo oscuro con blur
- z-index alto (9999)
- Ideal para operaciones críticas

### Inline
```tsx
<Loading variant="inline" size="md" text="Cargando..." />
```
- Se integra en el flujo del contenedor
- No bloquea otros elementos
- Ideal para secciones de página

### Button
```tsx
<Loading variant="button" size="sm" />
```
- Tamaño optimizado para botones
- Sin texto (más compacto)
- Ideal para estados de submit

## Tamaños

| Tamaño | Dimensiones | Uso Recomendado |
|--------|-------------|-----------------|
| `sm` | 30x30px | Botones, iconos pequeños |
| `md` | 100x80px | Cards, secciones medianas |
| `lg` | 150x120px | Overlays, pantallas completas |

## Ejemplos Avanzados

### Con React Query

```tsx
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/ui/loading'

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  })

  if (isLoading) {
    return (
      <Loading
        variant="inline"
        size="md"
        text="Cargando perfil..."
      />
    )
  }

  if (error) return <ErrorMessage error={error} />

  return <UserData user={data} />
}
```

### Con Custom Hook

```tsx
import { useLoading } from '@/hooks/use-loading'
import Loading from '@/components/ui/loading'

function FormComponent() {
  const { isLoading, withLoading } = useLoading()

  const handleSubmit = async (data: FormData) => {
    await withLoading(async () => {
      await api.submit(data)
      toast.success('Datos guardados')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* campos del formulario */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loading variant="button" size="sm" />
        ) : (
          'Enviar'
        )}
      </Button>
    </form>
  )
}
```

### En un Card

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Loading from '@/components/ui/loading'

function StatsCard() {
  const { data, isLoading } = useStats()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        {isLoading ? (
          <Loading variant="inline" size="md" />
        ) : (
          <StatsDisplay data={data} />
        )}
      </CardContent>
    </Card>
  )
}
```

### Loading Global con Context

```tsx
// contexts/LoadingContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import Loading from '@/components/ui/loading'

interface LoadingContextType {
  showLoading: (text?: string) => void
  hideLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState<string>()

  const showLoading = (loadingText?: string) => {
    setText(loadingText)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
    setText(undefined)
  }

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <Loading
          variant="overlay"
          size="lg"
          text={text}
        />
      )}
    </LoadingContext.Provider>
  )
}

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useGlobalLoading must be used within LoadingProvider')
  }
  return context
}
```

## Personalización

### Cambiar colores del overlay

```tsx
<Loading
  variant="overlay"
  overlayColor="rgba(0, 0, 100, 0.9)"
  overlayOpacity={0.95}
/>
```

### Agregar clases personalizadas

```tsx
<Loading
  variant="inline"
  size="md"
  className="my-custom-class"
/>
```

### Modificar estilos CSS

Puedes sobrescribir los estilos en tu CSS global o crear un CSS module:

```css
/* En tu archivo CSS global */
.loading-container.my-custom-loading {
  /* tus estilos personalizados */
}
```

## Hook useLoading

El proyecto incluye un hook personalizado para manejar estados de loading:

```tsx
import { useLoading } from '@/hooks/use-loading'

const { isLoading, startLoading, stopLoading, withLoading } = useLoading()

// Opción 1: Manual
startLoading()
await someAsyncOperation()
stopLoading()

// Opción 2: Automático (recomendado)
await withLoading(async () => {
  await someAsyncOperation()
})
```

## Mejores Prácticas

1. **Usa `variant="overlay"`** solo para operaciones críticas que requieran atención completa del usuario
2. **Usa `variant="button"`** para operaciones que se ejecutan desde un botón
3. **Usa `variant="inline"`** para cargas de contenido parcial
4. **Proporciona texto descriptivo** cuando sea posible para mejorar la UX
5. **Usa el hook `useLoading`** para manejar estados de loading de forma consistente
6. **Deshabilita los botones** cuando `isLoading` sea `true` para prevenir múltiples submits

## Troubleshooting

### El loading no se muestra

Verifica que:
- El componente esté importado correctamente
- El archivo CSS esté siendo cargado
- La condición de visibilidad sea correcta

### El overlay no cubre toda la pantalla

Asegúrate de que el overlay esté renderizado fuera de contenedores con `overflow: hidden` o usa un portal:

```tsx
import { createPortal } from 'react-dom'

{isLoading && createPortal(
  <Loading variant="overlay" size="lg" />,
  document.body
)}
```

### Animación cortada o no visible

Verifica que el contenedor padre tenga suficiente altura y no esté ocultando el overflow.

