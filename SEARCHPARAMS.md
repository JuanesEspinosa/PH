# 🔍 Guía de SearchParams

## 📋 Descripción

SearchParams permite mantener el estado de filtros y búsquedas en la URL.

## ✨ Beneficios

- ✅ Estado compartible via URL
- ✅ Se mantiene al recargar página
- ✅ Historial del navegador funciona
- ✅ SEO friendly
- ✅ Bookmarkable

## 🔧 Implementación

### Hook Básico

```typescript
// src/pages/dashboard/usuarios/hooks/useUsuariosQuery.ts
import { useSearchParams } from 'react-router-dom'

export function useUsuariosSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const setSearch = (query: string) => {
    if (query) {
      searchParams.set('q', query)
    } else {
      searchParams.delete('q')
    }
    setSearchParams(searchParams)
  }

  const clearSearch = () => {
    searchParams.delete('q')
    setSearchParams(searchParams)
  }

  return {
    searchQuery: searchParams.get('q') || '',
    setSearch,
    clearSearch,
  }
}
```

### Integración con React Query

```typescript
export function useUsuariosQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.usuarios.list(searchQuery), // Key cambia con query
    queryFn: async () => {
      if (searchQuery) {
        return usuariosService.search(searchQuery)
      }
      return usuariosService.getAll()
    },
  })
}
```

### En el Componente

```typescript
import { useUsuariosQuery, useUsuariosSearch } from '../hooks/useUsuariosQuery'

function UsuariosListView() {
  const { data: usuarios, isLoading } = useUsuariosQuery()
  const { searchQuery, setSearch, clearSearch } = useUsuariosSearch()
  const [searchInput, setSearchInput] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button type="submit">Buscar</Button>
        {searchQuery && (
          <Button onClick={clearSearch}>Limpiar</Button>
        )}
      </form>
      
      {searchQuery && <p>Buscando: {searchQuery}</p>}
      
      {/* Lista de usuarios */}
    </>
  )
}
```

## 🎯 Patrones Comunes

### Múltiples Parámetros

```typescript
export function useUsuariosFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const setFilter = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    searchParams.delete('q')
    searchParams.delete('rol')
    searchParams.delete('estado')
    setSearchParams(searchParams)
  }

  return {
    query: searchParams.get('q') || '',
    rol: searchParams.get('rol') || '',
    estado: searchParams.get('estado') || '',
    setFilter,
    clearFilters,
  }
}

// Uso:
const { query, rol, estado, setFilter, clearFilters } = useUsuariosFilters()

setFilter('q', 'juan')          // ?q=juan
setFilter('rol', 'admin')       // ?q=juan&rol=admin
setFilter('estado', 'activo')   // ?q=juan&rol=admin&estado=activo
```

### Paginación

```typescript
export function useUsuariosPagination() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1')

  const setPage = (newPage: number) => {
    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)
  }

  return { page, setPage }
}

// URL: /usuarios?page=2
```

### Ordenamiento

```typescript
export function useUsuariosSort() {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get('sortBy') || 'nombre'
  const sortOrder = searchParams.get('sortOrder') || 'asc'

  const setSort = (field: string) => {
    // Toggle order si es el mismo campo
    if (field === sortBy) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
      searchParams.set('sortOrder', newOrder)
    } else {
      searchParams.set('sortBy', field)
      searchParams.set('sortOrder', 'asc')
    }
    setSearchParams(searchParams)
  }

  return { sortBy, sortOrder, setSort }
}

// URL: /usuarios?sortBy=nombre&sortOrder=asc
```

## 🔗 Con React Query

### Query Key Reactiva

```typescript
export function useUsuariosQuery() {
  const [searchParams] = useSearchParams()
  
  // Serializar todos los params
  const filters = Object.fromEntries(searchParams.entries())
  
  return useQuery({
    queryKey: queryKeys.usuarios.list(JSON.stringify(filters)),
    queryFn: () => usuariosService.getAll(filters),
  })
}
```

### API Request

```typescript
// services/usuariosService.ts
export const usuariosService = {
  getAll: async (params?: Record<string, string>) => {
    const { data } = await api.get('/api/usuarios', { params })
    return data
  },
}

// Axios automáticamente convierte params a query string
// GET /api/usuarios?q=juan&rol=admin&page=1
```

## 💡 Tips

1. **Sincronizar con input local** - Usa `useState` para el input
2. **Submit al hacer búsqueda** - No en cada tecla
3. **Mostrar filtros activos** - Feedback visual
4. **Botón limpiar** - Fácil reset
5. **Query key incluye params** - Para caché correcto
6. **Default values** - Para params opcionales

## ⚠️ Cuidados

❌ **No hacer:**
```typescript
// Esto causa re-render en cada tecla
const [searchParams, setSearchParams] = useSearchParams()

<Input 
  onChange={(e) => {
    searchParams.set('q', e.target.value)
    setSearchParams(searchParams) // ❌
  }}
/>
```

✅ **Hacer:**
```typescript
// Estado local + submit
const [input, setInput] = useState('')

<Input onChange={(e) => setInput(e.target.value)} />
<Button onClick={() => setSearch(input)}>Buscar</Button>
```

## 📊 Ejemplo Completo

```typescript
// Hook personalizado
export function useUsuariosFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    q: searchParams.get('q') || '',
    rol: searchParams.get('rol') || '',
    estado: searchParams.get('estado') || '',
    page: parseInt(searchParams.get('page') || '1'),
  }

  const updateFilters = (updates: Partial<typeof filters>) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString())
      } else {
        searchParams.delete(key)
      }
    })
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return { filters, updateFilters, clearFilters }
}

// En componente
function UsuariosList() {
  const { filters, updateFilters, clearFilters } = useUsuariosFilters()
  const { data } = useUsuariosQuery()

  return (
    <>
      <Input 
        defaultValue={filters.q}
        onBlur={(e) => updateFilters({ q: e.target.value })}
      />
      <Select 
        value={filters.rol}
        onChange={(value) => updateFilters({ rol: value })}
      />
      <Button onClick={clearFilters}>Limpiar</Button>
    </>
  )
}
```

## 🔗 Recursos

- [React Router SearchParams](https://reactrouter.com/en/main/hooks/use-search-params)
- [URL Search Params MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

---

**SearchParams + React Query = Estado compartible y cacheable!**


