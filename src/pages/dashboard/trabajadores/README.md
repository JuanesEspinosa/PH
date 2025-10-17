# Módulo de Trabajadores

Este módulo proporciona funcionalidad completa para la gestión de trabajadores en la aplicación.

## Estructura del Módulo

```
trabajadores/
├── components/          # Componentes reutilizables
│   ├── TrabajadorForm.tsx
│   ├── TrabajadoresTable.tsx
│   └── DeleteConfirmDialog.tsx
├── hooks/              # Custom hooks con React Query
│   └── useTrabajadoresQuery.ts
├── services/           # Servicios de API
│   └── trabajadoresService.ts
├── views/              # Vistas/Páginas
│   ├── TrabajadoresListView.tsx
│   ├── TrabajadorCreateView.tsx
│   ├── TrabajadorEditView.tsx
│   └── TrabajadorDetailView.tsx
└── README.md
```

## Características

### 📋 Gestión Completa de Trabajadores

- **Listar trabajadores**: Vista con tabla completa, estadísticas y búsqueda
- **Crear trabajador**: Formulario con validación completa de todos los campos
- **Editar trabajador**: Actualización de información existente
- **Ver detalles**: Vista detallada con toda la información del trabajador
- **Eliminar trabajador**: Eliminación con confirmación

### 📊 Campos del Trabajador

Cada trabajador incluye los siguientes campos obligatorios:

- **Nombres** (string, mínimo 2 caracteres)
- **Apellidos** (string, mínimo 2 caracteres)
- **Documento** (string, mínimo 5 caracteres)
- **Tipo de Documento** (DNI | Pasaporte | Cédula | Otro)
- **Teléfono** (string, formato validado)
- **Email** (string, formato validado)
- **Cargo** (string, mínimo 3 caracteres)
- **Fecha de Ingreso** (fecha en formato YYYY-MM-DD, no puede ser futura)
- **Estado** (activo | inactivo | vacaciones | licencia)
- **Dirección** (string, mínimo 10 caracteres)

### ✅ Validaciones Implementadas

El formulario incluye validaciones en tiempo real para:

1. **Nombres y Apellidos**: Mínimo 2 caracteres
2. **Documento**: Mínimo 5 caracteres
3. **Teléfono**: Formato válido (números, espacios, guiones, paréntesis, +)
4. **Email**: Formato válido de email
5. **Cargo**: Mínimo 3 caracteres
6. **Fecha de Ingreso**: 
   - Formato correcto (YYYY-MM-DD)
   - No puede ser fecha futura
7. **Dirección**: Mínimo 10 caracteres

### 🔍 Búsqueda

El módulo incluye funcionalidad de búsqueda que permite buscar por:
- Nombres
- Apellidos
- Email
- Documento
- Cargo

La búsqueda se mantiene en la URL mediante `searchParams` para mejor UX.

### 📈 Estadísticas

Vista de estadísticas en tiempo real que muestra:
- Total de trabajadores
- Trabajadores activos
- Trabajadores inactivos
- Trabajadores en vacaciones

## Rutas

Las rutas del módulo son:

- `/dashboard/trabajadores` - Lista de trabajadores
- `/dashboard/trabajadores/nuevo` - Crear nuevo trabajador
- `/dashboard/trabajadores/:id` - Detalles del trabajador
- `/dashboard/trabajadores/:id/editar` - Editar trabajador

## Uso de React Query

El módulo utiliza React Query para:

- ✅ Caché automático de datos
- ✅ Revalidación inteligente
- ✅ Estados de carga y error
- ✅ Mutaciones optimistas
- ✅ Invalidación automática de queries

### Hooks Disponibles

```typescript
// Listar trabajadores
const { data, isLoading } = useTrabajadoresQuery()

// Obtener un trabajador
const { data: trabajador } = useTrabajadorQuery(id)

// Crear trabajador
const { mutate: createTrabajador } = useCreateTrabajadorMutation()

// Actualizar trabajador
const { mutate: updateTrabajador } = useUpdateTrabajadorMutation()

// Eliminar trabajador
const { mutate: deleteTrabajador } = useDeleteTrabajadorMutation()

// Búsqueda
const { searchQuery, setSearch, clearSearch } = useTrabajadoresSearch()
```

## Integración con Backend

Actualmente el módulo utiliza datos mock, pero está preparado para integrarse con un backend real.

Para conectar con un backend, simplemente descomenta las líneas en `trabajadoresService.ts`:

```typescript
// Ejemplo de integración
export const trabajadoresService = {
  async getAll(): Promise<Trabajador[]> {
    return (await api.get<Trabajador[]>('/trabajadores')).data
  },
  // ... resto de métodos
}
```

## Componentes

### TrabajadorForm

Formulario reutilizable para crear y editar trabajadores con validación completa.

**Props:**
- `trabajador?`: Trabajador a editar (opcional)
- `onSubmit`: Función llamada al enviar el formulario
- `onCancel`: Función llamada al cancelar
- `loading?`: Estado de carga

### TrabajadoresTable

Tabla responsive con todas las funciones de visualización.

**Props:**
- `trabajadores`: Array de trabajadores
- `onDelete`: Función llamada al eliminar
- `loading?`: Estado de carga

### DeleteConfirmDialog

Diálogo de confirmación para eliminaciones.

**Props:**
- `open`: Estado del diálogo
- `onOpenChange`: Función para cambiar estado
- `onConfirm`: Función de confirmación
- `trabajadorName`: Nombre del trabajador
- `loading?`: Estado de carga

## Seguridad

- Todas las rutas del módulo están protegidas con `ProtectedRoute`
- Las validaciones se realizan tanto en frontend como deberían realizarse en backend
- Los datos sensibles no se exponen en la interfaz

## Mejoras Futuras

- [ ] Exportación de datos a Excel/PDF
- [ ] Filtros avanzados por estado, cargo, fecha de ingreso
- [ ] Historial de cambios
- [ ] Subida de foto/avatar
- [ ] Documentos adjuntos
- [ ] Notificaciones de cumpleaños/aniversarios
- [ ] Gestión de permisos y roles más granular

