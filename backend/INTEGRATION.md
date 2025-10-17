# 🔗 Integración con Frontend

Guía para conectar el backend con tu aplicación React.

## 📋 Configuración del Frontend

### 1. Actualizar la configuración de Axios

Edita el archivo `src/lib/axios.ts` en tu frontend:

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 Actualiza esta URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### 2. Actualizar el servicio de autenticación

Archivo: `src/pages/auth/services/authService.ts`

```typescript
import axios from '@/lib/axios';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post('/auth/register', data);
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await axios.post('/auth/reset-password', { token, password });
    return response.data;
  },

  verifyToken: async (): Promise<any> => {
    const response = await axios.get('/auth/verify');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post('/auth/logout');
  },
};
```

### 3. Actualizar el store de autenticación

Archivo: `src/stores/authStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'usuario';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### 4. Hook de React Query para autenticación

Archivo: `src/pages/auth/hooks/useAuthQuery.ts`

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast({
        title: '¡Bienvenido!',
        description: `Hola ${data.user.nombre}`,
      });
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: 'Error al iniciar sesión',
        description: error.response?.data?.message || 'Credenciales incorrectas',
        variant: 'destructive',
      });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast({
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada exitosamente',
      });
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: 'Error al registrarse',
        description: error.response?.data?.message || 'Error al crear la cuenta',
        variant: 'destructive',
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate('/login');
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente',
      });
    },
  });
};

export const useVerifyToken = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['verify-token'],
    queryFn: authService.verifyToken,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
```

---

## 🔐 Manejo de Autenticación

### Componente ProtectedRoute

Archivo: `src/components/auth/ProtectedRoute.tsx`

```typescript
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.rol !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
```

### Uso en rutas

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  {/* Rutas protegidas */}
</Route>

{/* Ruta solo para admins */}
<Route
  path="/admin"
  element={
    <ProtectedRoute requireAdmin>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

---

## 🧪 Probar la integración

### 1. Asegúrate de que el backend esté corriendo

```bash
cd backend
npm run dev
```

### 2. Inicia el frontend

```bash
cd ../
npm run dev
```

### 3. Prueba el flujo completo

1. ✅ Ir a `/register` y crear una cuenta
2. ✅ Login automático después del registro
3. ✅ Navegar por el dashboard
4. ✅ Cerrar sesión
5. ✅ Login con las credenciales creadas
6. ✅ Probar recuperación de contraseña

---

## 📝 Variables de entorno del Frontend

Crea un archivo `.env.local` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Sistema Agrícola
```

Luego actualiza axios:

```typescript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});
```

---

## 🚨 Manejo de errores común

```typescript
// Hook personalizado para manejo de errores
export const useApiError = () => {
  const { toast } = useToast();

  const handleError = (error: any) => {
    const message = error.response?.data?.message || 'Algo salió mal';
    const status = error.response?.status;

    switch (status) {
      case 400:
        toast({
          title: 'Datos inválidos',
          description: message,
          variant: 'destructive',
        });
        break;
      case 401:
        toast({
          title: 'No autorizado',
          description: 'Por favor inicia sesión nuevamente',
          variant: 'destructive',
        });
        break;
      case 403:
        toast({
          title: 'Acceso denegado',
          description: 'No tienes permisos para esta acción',
          variant: 'destructive',
        });
        break;
      case 404:
        toast({
          title: 'No encontrado',
          description: message,
          variant: 'destructive',
        });
        break;
      case 409:
        toast({
          title: 'Conflicto',
          description: message,
          variant: 'destructive',
        });
        break;
      default:
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
    }
  };

  return { handleError };
};
```

---

## ✅ Checklist de integración

- [ ] Backend corriendo en `http://localhost:5000`
- [ ] Frontend corriendo en `http://localhost:5173`
- [ ] Base de datos creada y tablas configuradas
- [ ] Archivo `.env` configurado en el backend
- [ ] URL del backend actualizada en axios
- [ ] Store de autenticación configurado
- [ ] ProtectedRoute implementado
- [ ] Interceptores de axios configurados
- [ ] Manejo de errores implementado
- [ ] CORS habilitado en el backend

---

## 🎯 Próximos pasos

Una vez que la autenticación funcione, puedes:

1. Implementar módulo de Usuarios
2. Implementar módulo de Cultivos
3. Implementar módulo de Lotes
4. Implementar módulo de Planificación

Cada módulo seguirá el mismo patrón:
- Service (llamadas a la API)
- Hooks (React Query)
- Types (TypeScript)
- Components/Views (UI)

---

## 📚 Referencias

- [README.md](./README.md) - Documentación del backend
- [API_DOCS.md](./API_DOCS.md) - Documentación de endpoints
- [QUICK_START.md](./QUICK_START.md) - Inicio rápido

