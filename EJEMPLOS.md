# 💡 Ejemplos de Uso

Esta guía contiene ejemplos prácticos de cómo usar las diferentes partes del proyecto.

## 📑 Tabla de Contenidos

- [Autenticación](#autenticación)
- [Gestión de Estado](#gestión-de-estado)
- [Llamadas a API](#llamadas-a-api)
- [Componentes UI](#componentes-ui)
- [Rutas](#rutas)
- [Formularios](#formularios)
- [Notificaciones](#notificaciones)

## 🔐 Autenticación

### Login Programático

```typescript
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/authService'
import { useNavigate } from 'react-router-dom'

function LoginExample() {
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await authService.login({
        email: 'user@example.com',
        password: 'password123'
      })
      
      login(response.user, response.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return <button onClick={handleLogin}>Login</button>
}
```

### Logout

```typescript
function LogoutButton() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return <button onClick={handleLogout}>Cerrar Sesión</button>
}
```

### Verificar Autenticación

```typescript
function ProfileButton() {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Link to="/login">Iniciar Sesión</Link>
  }

  return <div>Hola, {user?.name}</div>
}
```

### Ruta Protegida Personalizada

```typescript
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />
  }

  return <>{children}</>
}

// Uso
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminPage />
    </AdminRoute>
  }
/>
```

## 🗂️ Gestión de Estado

### Crear un Nuevo Store

```typescript
// src/stores/cartStore.ts
import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    set((state) => ({
      items: [...state.items, item]
    }))
    get().calculateTotal()
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }))
    get().calculateTotal()
  },

  clearCart: () => {
    set({ items: [], total: 0 })
  },

  calculateTotal: () => {
    const items = get().items
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    set({ total })
  },
}))
```

### Usar el Store

```typescript
function Cart() {
  const { items, total, addItem, removeItem, clearCart } = useCartStore()

  return (
    <div>
      <h2>Carrito ({items.length} items)</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>Total: ${total}</div>
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  )
}
```

### Persistencia en LocalStorage

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'es',
      
      setTheme: (theme: string) => set({ theme }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: 'app-settings', // Nombre en localStorage
    }
  )
)
```

## 🌐 Llamadas a API

### GET Request

```typescript
import { useEffect, useState } from 'react'
import api from '@/lib/axios'

interface Post {
  id: string
  title: string
  content: string
}

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get<Post[]>('/posts')
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### POST Request

```typescript
const createPost = async (data: { title: string; content: string }) => {
  try {
    const response = await api.post('/posts', data)
    console.log('Post created:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Uso
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  await createPost({ title: 'Mi Post', content: 'Contenido...' })
}
```

### PUT/PATCH Request

```typescript
const updatePost = async (id: string, data: Partial<Post>) => {
  const response = await api.put(`/posts/${id}`, data)
  return response.data
}

// Uso
await updatePost('123', { title: 'Nuevo título' })
```

### DELETE Request

```typescript
const deletePost = async (id: string) => {
  await api.delete(`/posts/${id}`)
}

// Uso con confirmación
const handleDelete = async (id: string) => {
  if (confirm('¿Estás seguro?')) {
    await deletePost(id)
  }
}
```

### Request con Query Parameters

```typescript
const searchPosts = async (query: string, page: number = 1) => {
  const response = await api.get('/posts', {
    params: {
      search: query,
      page,
      limit: 10
    }
  })
  return response.data
}

// Uso
const results = await searchPosts('react', 2)
```

### Upload de Archivos

```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total!) * 100
      console.log(`Upload progress: ${progress}%`)
    }
  })

  return response.data
}
```

## 🎨 Componentes UI

### Button con variantes

```typescript
import { Button } from '@/components/ui/button'

function ButtonExamples() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      
      {/* Tamaños */}
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔥</Button>
      
      {/* Estados */}
      <Button disabled>Disabled</Button>
      <Button loading>Loading...</Button>
    </div>
  )
}
```

### Card completa

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Role: {user.role}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Profile</Button>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  )
}
```

### Dropdown Menu

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Opciones</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## 🔄 Rutas

### Rutas Anidadas

```typescript
// App.tsx
<Route path="/blog" element={<BlogLayout />}>
  <Route index element={<BlogList />} />
  <Route path="post/:id" element={<BlogPost />} />
  <Route path="create" element={<CreatePost />} />
</Route>

// BlogLayout.tsx
import { Outlet } from 'react-router-dom'

function BlogLayout() {
  return (
    <div>
      <nav>{/* Navegación del blog */}</nav>
      <main>
        <Outlet /> {/* Aquí se renderizará la ruta hija */}
      </main>
    </div>
  )
}
```

### Navegación Programática

```typescript
import { useNavigate, useParams } from 'react-router-dom'

function PostDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const handleBack = () => {
    navigate(-1) // Volver atrás
  }

  const handleHome = () => {
    navigate('/') // Ir a inicio
  }

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`, {
      state: { from: 'detail' } // Pasar estado
    })
  }

  return <div>{/* Contenido */}</div>
}
```

### Link con Estado

```typescript
import { Link, useLocation } from 'react-router-dom'

// Enviar
<Link to="/profile" state={{ from: 'homepage' }}>
  Ver Perfil
</Link>

// Recibir
function Profile() {
  const location = useLocation()
  const { from } = location.state || {}
  
  return <div>Viniste desde: {from}</div>
}
```

## 📝 Formularios

### Formulario Básico

```typescript
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sending:', formData)
    // Enviar datos
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="message">Mensaje</Label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border p-2"
          rows={4}
          required
        />
      </div>
      
      <Button type="submit">Enviar</Button>
    </form>
  )
}
```

### Validación de Formularios

```typescript
const [errors, setErrors] = useState<Record<string, string>>({})

const validate = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) {
    newErrors.name = 'El nombre es requerido'
  }

  if (!formData.email.includes('@')) {
    newErrors.email = 'Email inválido'
  }

  if (formData.message.length < 10) {
    newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  if (validate()) {
    // Enviar
  }
}

// En el JSX
<Input
  id="email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  className={errors.email ? 'border-red-500' : ''}
/>
{errors.email && (
  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
)}
```

## 🔔 Notificaciones

### Toast Básico

```typescript
import { useToast } from '@/hooks/use-toast'

function NotificationExample() {
  const { toast } = useToast()

  const showSuccess = () => {
    toast({
      title: '¡Éxito!',
      description: 'La operación se completó correctamente.',
    })
  }

  const showError = () => {
    toast({
      title: 'Error',
      description: 'Algo salió mal. Inténtalo de nuevo.',
      variant: 'destructive',
    })
  }

  const showWithAction = () => {
    toast({
      title: 'Elemento eliminado',
      description: 'El elemento ha sido eliminado.',
      action: (
        <Button variant="outline" size="sm">
          Deshacer
        </Button>
      ),
    })
  }

  return (
    <div className="space-x-2">
      <Button onClick={showSuccess}>Success</Button>
      <Button onClick={showError}>Error</Button>
      <Button onClick={showWithAction}>With Action</Button>
    </div>
  )
}
```

---

¿Necesitas más ejemplos? Revisa el código fuente o abre un issue con tu pregunta.

