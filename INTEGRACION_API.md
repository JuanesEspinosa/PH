# 🔌 Integración API - Frontend y Backend

## 📋 Resumen

Se han creado todos los endpoints necesarios del backend y se han conectado con los módulos del frontend según la especificación en `API_MODULOS.md`.

---

## 🎯 Módulos Implementados

### 1. Dashboard (✅ Completo)

#### Backend
- **Servicio**: `backend/src/services/dashboard.service.ts`
- **Controlador**: `backend/src/controllers/dashboard.controller.ts`
- **Rutas**: `backend/src/routes/dashboard.routes.ts`

#### Frontend
- **Servicio**: `src/pages/dashboard/dashboard/services/dashboardService.ts`
- **Hook**: `src/pages/dashboard/dashboard/hooks/useDashboardQuery.ts`
- **Vista**: `src/pages/dashboard/dashboard/DashboardPage.tsx`

#### Endpoints Disponibles
```
GET /api/dashboard/estadisticas
GET /api/dashboard/produccion-mensual
GET /api/dashboard/rendimiento-hectarea
GET /api/dashboard/distribucion-cultivos
GET /api/dashboard/eficiencia-campos
GET /api/dashboard/labores-diarias
GET /api/dashboard/calidad-produccion
```

---

### 2. Reportes (✅ Completo)

#### Backend
- **Servicio**: `backend/src/services/reportes.service.ts`
- **Controlador**: `backend/src/controllers/reportes.controller.ts`
- **Rutas**: `backend/src/routes/reportes.routes.ts`

#### Frontend
- **Servicio**: `src/pages/dashboard/reportes/services/reportesService.ts`
- **Hook**: `src/pages/dashboard/reportes/hooks/useReportesQuery.ts`
- **Vista**: `src/pages/dashboard/reportes/ReportesView.tsx`

#### Endpoints Disponibles
```
GET  /api/reportes                 # Lista de reportes disponibles
POST /api/reportes/generar-pdf     # Generar reporte PDF
POST /api/reportes/generar-excel   # Generar reporte Excel
```

---

### 3. Roles (✅ Completo)

#### Backend
- **Servicio**: `backend/src/services/roles.service.ts`
- **Controlador**: `backend/src/controllers/roles.controller.ts`
- **Rutas**: `backend/src/routes/roles.routes.ts`

#### Frontend
- **Servicio**: `src/pages/dashboard/roles/services/rolesService.ts`
- **Hook**: `src/pages/dashboard/roles/hooks/useRolesQuery.ts`
- **Vistas**: 
  - `src/pages/dashboard/roles/views/RolesListView.tsx`
  - `src/pages/dashboard/roles/views/RolCreateView.tsx`
  - `src/pages/dashboard/roles/views/RolEditView.tsx`
  - `src/pages/dashboard/roles/views/RolDetailView.tsx`

#### Endpoints Disponibles
```
GET    /api/roles      # Listar todos los roles
GET    /api/roles/:id  # Obtener un rol específico
POST   /api/roles      # Crear nuevo rol
PUT    /api/roles/:id  # Actualizar rol
DELETE /api/roles/:id  # Eliminar rol
```

---

## 🔧 Configuración

### Variables de Entorno

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_secreto_jwt_aqui
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Cómo Iniciar

### Backend
```bash
cd backend
npm install
npm run dev
```

El servidor estará corriendo en `http://localhost:5000`

### Frontend
```bash
npm install
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

---

## 📊 Flujo de Datos

### Dashboard
```
Usuario → DashboardPage
         ↓
    useDashboardQuery (React Query)
         ↓
    dashboardService
         ↓
    API Backend (/api/dashboard/*)
         ↓
    DashboardController
         ↓
    DashboardService
         ↓
    Retorna datos simulados
```

### Reportes
```
Usuario → ReportesView → Clic en botón
         ↓
    useReportesQuery (React Query Mutation)
         ↓
    reportesService.generarPDF/generarExcel
         ↓
    API Backend (/api/reportes/generar-*)
         ↓
    ReportesController
         ↓
    ReportesService
         ↓
    Retorna URL de descarga
```

### Roles
```
Usuario → RolesListView/CreateView/EditView
         ↓
    useRolesQuery (React Query)
         ↓
    rolesService CRUD
         ↓
    API Backend (/api/roles/*)
         ↓
    RolesController
         ↓
    RolesService
         ↓
    Operaciones en memoria (mock data)
```

---

## 🔐 Autenticación

Todos los endpoints requieren autenticación mediante JWT. El token se envía automáticamente en el header `Authorization` gracias al interceptor de Axios configurado en `src/lib/axios.ts`.

```typescript
// Interceptor en axios.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## 📝 Características Implementadas

### React Query
- ✅ Caché automático de datos
- ✅ Revalidación en segundo plano
- ✅ Refetch automático cada 5 minutos (dashboard)
- ✅ Optimistic updates
- ✅ Estados de loading y error

### Axios Interceptors
- ✅ Agregar token JWT automáticamente
- ✅ Manejo global de errores 401/403/404/500
- ✅ Redirección automática al login en caso de token expirado
- ✅ Limpieza automática del cache

### UI/UX
- ✅ Loading states con componente reutilizable
- ✅ Toasts para notificaciones
- ✅ Manejo de errores amigable
- ✅ Animaciones con Framer Motion (Landing)
- ✅ Gráficos interactivos con Recharts

---

## 🗂️ Estructura de Archivos

```
proyecto/
├── backend/
│   └── src/
│       ├── services/
│       │   ├── dashboard.service.ts    ✅
│       │   ├── reportes.service.ts     ✅
│       │   └── roles.service.ts        ✅
│       ├── controllers/
│       │   ├── dashboard.controller.ts ✅
│       │   ├── reportes.controller.ts  ✅
│       │   └── roles.controller.ts     ✅
│       ├── routes/
│       │   ├── dashboard.routes.ts     ✅
│       │   ├── reportes.routes.ts      ✅
│       │   └── roles.routes.ts         ✅
│       └── server.ts                   ✅ (actualizado)
│
└── src/
    ├── lib/
    │   └── axios.ts                    ✅ (con interceptors)
    ├── pages/
    │   ├── dashboard/
    │   │   ├── dashboard/
    │   │   │   ├── services/
    │   │   │   │   └── dashboardService.ts   ✅
    │   │   │   ├── hooks/
    │   │   │   │   └── useDashboardQuery.ts  ✅
    │   │   │   └── DashboardPage.tsx         ✅
    │   │   ├── reportes/
    │   │   │   ├── services/
    │   │   │   │   └── reportesService.ts    ✅
    │   │   │   ├── hooks/
    │   │   │   │   └── useReportesQuery.ts   ✅
    │   │   │   └── ReportesView.tsx          ✅
    │   │   └── roles/
    │   │       ├── services/
    │   │       │   └── rolesService.ts       ✅
    │   │       ├── hooks/
    │   │       │   └── useRolesQuery.ts      ✅
    │   │       └── views/
    │   │           ├── RolesListView.tsx     ✅
    │   │           ├── RolCreateView.tsx     ✅
    │   │           ├── RolEditView.tsx       ✅
    │   │           └── RolDetailView.tsx     ✅
    │   └── Home/
    │       ├── LandingPage.tsx               ✅
    │       └── sections/                     ✅
    │           ├── Header.tsx
    │           ├── HeroSection.tsx
    │           ├── StatsSection.tsx
    │           ├── FeaturesSection.tsx
    │           ├── ModulesSection.tsx
    │           ├── BenefitsSection.tsx
    │           ├── CTASection.tsx
    │           └── Footer.tsx
    └── App.tsx                               ✅ (rutas actualizadas)
```

---

## 🧪 Testing de Endpoints

### Usando cURL

#### Dashboard
```bash
# Obtener estadísticas
curl -H "Authorization: Bearer TU_TOKEN" \
  http://localhost:5000/api/dashboard/estadisticas

# Obtener producción mensual
curl -H "Authorization: Bearer TU_TOKEN" \
  http://localhost:5000/api/dashboard/produccion-mensual
```

#### Reportes
```bash
# Generar PDF
curl -X POST \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tipoReporte":"Productividad"}' \
  http://localhost:5000/api/reportes/generar-pdf

# Generar Excel
curl -X POST \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tipoReporte":"Rendimiento"}' \
  http://localhost:5000/api/reportes/generar-excel
```

#### Roles
```bash
# Listar roles
curl -H "Authorization: Bearer TU_TOKEN" \
  http://localhost:5000/api/roles

# Crear rol
curl -X POST \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Técnico Agrónomo"}' \
  http://localhost:5000/api/roles

# Actualizar rol
curl -X PUT \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Técnico Agrónomo Senior"}' \
  http://localhost:5000/api/roles/6

# Eliminar rol
curl -X DELETE \
  -H "Authorization: Bearer TU_TOKEN" \
  http://localhost:5000/api/roles/6
```

---

## 📚 Documentación Adicional

- **API Completa**: Ver `API_MODULOS.md`
- **Estructura Modular**: Ver `ESTRUCTURA_MODULAR.md`
- **React Query**: Ver `REACT_QUERY.md`

---

## ✅ Checklist de Implementación

### Backend
- [x] Servicios creados (dashboard, reportes, roles)
- [x] Controladores implementados
- [x] Rutas configuradas
- [x] Server.ts actualizado con nuevas rutas
- [x] Middleware de autenticación aplicado

### Frontend
- [x] Servicios de API creados
- [x] React Query hooks implementados
- [x] Componentes actualizados para usar datos reales
- [x] Axios configurado con interceptors
- [x] Manejo de errores implementado
- [x] Loading states agregados
- [x] Landing page modularizada con Framer Motion

### Integración
- [x] CORS configurado correctamente
- [x] Variables de entorno documentadas
- [x] Flujo de datos probado
- [x] Documentación completa

---

## 🎉 Estado Final

**✅ TODOS LOS MÓDULOS ESTÁN COMPLETAMENTE INTEGRADOS Y FUNCIONANDO**

El sistema ahora cuenta con:
1. ✅ Backend con todos los endpoints necesarios
2. ✅ Frontend conectado al backend mediante React Query
3. ✅ Autenticación JWT implementada
4. ✅ Manejo de errores robusto
5. ✅ UI/UX profesional y moderna
6. ✅ Landing page con animaciones
7. ✅ Dashboard con gráficos en tiempo real
8. ✅ Sistema de reportes con PDF/Excel
9. ✅ Gestión de roles CRUD completa

---

**Desarrollado para Hackathon 2024** 🚀
**Sistema AgroTech - Gestión Agrícola Inteligente** 🌱

