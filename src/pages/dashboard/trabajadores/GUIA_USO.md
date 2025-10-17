# Guía de Uso - Módulo de Trabajadores

Esta guía te ayudará a utilizar el módulo de gestión de trabajadores en tu aplicación.

## 📋 Tabla de Contenidos

1. [Acceso al Módulo](#acceso-al-módulo)
2. [Listar Trabajadores](#listar-trabajadores)
3. [Crear Trabajador](#crear-trabajador)
4. [Ver Detalles](#ver-detalles)
5. [Editar Trabajador](#editar-trabajador)
6. [Eliminar Trabajador](#eliminar-trabajador)
7. [Buscar Trabajadores](#buscar-trabajadores)
8. [Solución de Problemas](#solución-de-problemas)

---

## Acceso al Módulo

### 1. Inicia sesión en la aplicación

Navega a `/login` y autentícate con tus credenciales.

### 2. Accede al módulo de trabajadores

Una vez en el dashboard, encontrarás el menú de navegación lateral con las siguientes opciones:

- **Dashboard**: Página principal
- **Usuarios**: Gestión de usuarios del sistema
- **Trabajadores**: Gestión de trabajadores (nuevo módulo) ⭐

Haz clic en "Trabajadores" o navega directamente a `/dashboard/trabajadores`.

---

## Listar Trabajadores

La vista principal muestra:

### Estadísticas en la parte superior:
- **Total Trabajadores**: Número total de trabajadores registrados
- **Activos**: Trabajadores en estado activo
- **Inactivos**: Trabajadores en estado inactivo
- **En Vacaciones**: Trabajadores actualmente de vacaciones

### Barra de búsqueda y acciones:
- Campo de búsqueda para filtrar trabajadores
- Botón "Buscar" para aplicar filtros
- Botón "Actualizar" para refrescar los datos

### Tabla de trabajadores con columnas:
- Trabajador (nombre completo y avatar)
- Documento (número y tipo)
- Contacto (email y teléfono)
- Cargo
- Fecha de Ingreso
- Estado
- Acciones (Ver, Editar, Eliminar)

---

## Crear Trabajador

### Paso 1: Haz clic en "Nuevo Trabajador"

En la parte superior derecha de la lista, encontrarás el botón "Nuevo Trabajador".

### Paso 2: Completa el formulario

Todos los campos con asterisco (*) son obligatorios:

#### Información Personal:
- **Nombres**: Mínimo 2 caracteres
  - Ejemplo: "Juan Carlos"
- **Apellidos**: Mínimo 2 caracteres
  - Ejemplo: "Pérez González"

#### Documentación:
- **Tipo de Documento**: Selecciona uno
  - DNI
  - Pasaporte
  - Cédula
  - Otro
- **Número de Documento**: Mínimo 5 caracteres
  - Ejemplo: "12345678A"

#### Contacto:
- **Email**: Formato válido de email
  - Ejemplo: "juan.perez@empresa.com"
- **Teléfono**: Formato válido
  - Ejemplo: "+34 600 123 456"

#### Información Laboral:
- **Cargo**: Mínimo 3 caracteres
  - Ejemplo: "Desarrollador Senior"
- **Fecha de Ingreso**: Formato YYYY-MM-DD, no puede ser futura
  - Ejemplo: "2024-01-15"

#### Dirección:
- **Dirección Completa**: Mínimo 10 caracteres
  - Ejemplo: "Calle Mayor 123, 28013 Madrid, España"

### Paso 3: Envía el formulario

- Haz clic en "Crear" para guardar el trabajador
- Haz clic en "Cancelar" para volver sin guardar

### Validaciones automáticas:

El formulario validará en tiempo real:
- ✅ Longitud mínima de campos
- ✅ Formato de email
- ✅ Formato de teléfono
- ✅ Fecha no futura
- ✅ Campos requeridos

Si hay errores, se mostrarán en rojo debajo de cada campo.

---

## Ver Detalles

### Desde la tabla:

Haz clic en el icono de ojo (👁️) en la columna de acciones.

### Vista de detalles incluye:

#### Sección 1: Avatar y Info Principal
- Avatar con iniciales
- Nombre completo
- ID del trabajador
- Badges de cargo y estado

#### Sección 2: Información Personal
- Documento (número y tipo)
- Fecha de ingreso

#### Sección 3: Información de Contacto
- Email
- Teléfono
- Dirección completa

#### Sección 4: Información Laboral
- Cargo
- Fecha de creación en el sistema
- Última modificación

### Acciones disponibles:
- **Editar**: Botón para ir a la vista de edición
- **Eliminar**: Botón para eliminar el trabajador
- **Volver**: Flecha en la parte superior para volver a la lista

---

## Editar Trabajador

### Opción 1: Desde la vista de detalles
Haz clic en el botón "Editar" en la parte superior derecha.

### Opción 2: Desde la tabla
Haz clic en el icono de lápiz (✏️) en la columna de acciones.

### Formulario de edición:

El formulario se pre-llenará con los datos actuales del trabajador.

**Campos editables:**
- Nombres
- Apellidos
- Documento
- Tipo de Documento
- Email
- Teléfono
- Cargo
- Fecha de Ingreso
- **Estado** (solo disponible en edición)
  - Activo
  - Inactivo
  - Vacaciones
  - Licencia
- Dirección

### Guardar cambios:

- Haz clic en "Actualizar" para guardar
- Haz clic en "Cancelar" para descartar cambios

### Confirmación:

Verás un mensaje de éxito (toast notification) y serás redirigido a la vista de detalles.

---

## Eliminar Trabajador

### ⚠️ Advertencia
Esta acción eliminará permanentemente al trabajador del sistema.

### Proceso:

1. **Desde la tabla o vista de detalles**, haz clic en el botón "Eliminar" (icono de papelera 🗑️)

2. **Aparecerá un diálogo de confirmación** con:
   - Título: "¿Estás seguro?"
   - Mensaje explicando que la acción no se puede deshacer
   - Nombre del trabajador que será eliminado

3. **Confirma o cancela:**
   - "Eliminar" (rojo): Confirma la eliminación
   - "Cancelar": Cierra el diálogo sin eliminar

4. **Confirmación:**
   - Verás un mensaje de éxito
   - La lista se actualizará automáticamente
   - Si estabas en la vista de detalles, serás redirigido a la lista

---

## Buscar Trabajadores

### Campo de búsqueda:

Ubicado en la sección superior de la lista, permite buscar por:

- **Nombres**: Busca en el campo de nombres
- **Apellidos**: Busca en el campo de apellidos  
- **Email**: Busca direcciones de email
- **Documento**: Busca números de documento
- **Cargo**: Busca por posición laboral

### Cómo buscar:

1. Escribe el término de búsqueda en el campo
2. Haz clic en "Buscar" o presiona Enter
3. Los resultados se filtrarán automáticamente

### Limpiar búsqueda:

- Haz clic en la "X" dentro del campo de búsqueda, o
- Borra el texto y busca nuevamente

### Búsqueda en URL:

La búsqueda se mantiene en la URL (`?q=termino`), lo que permite:
- Compartir búsquedas específicas
- Usar el botón "Atrás" del navegador
- Recargar la página sin perder la búsqueda

---

## Solución de Problemas

### Problema: No puedo crear un trabajador

**Posibles causas:**
1. **Email duplicado**: El email ya existe en el sistema
   - Solución: Usa un email diferente
   
2. **Documento duplicado**: El documento ya está registrado
   - Solución: Verifica el número de documento
   
3. **Validaciones no pasadas**: Campos con formato incorrecto
   - Solución: Revisa los mensajes de error en rojo bajo cada campo

### Problema: No veo el botón "Nuevo Trabajador"

**Posibles causas:**
1. No tienes permisos suficientes
   - Solución: Contacta al administrador para obtener permisos

### Problema: La búsqueda no encuentra resultados

**Posibles causas:**
1. El término de búsqueda es muy específico
   - Solución: Intenta con términos más generales
   
2. El trabajador fue eliminado
   - Solución: Verifica con el administrador

### Problema: Error al actualizar

**Posibles causas:**
1. Otro usuario modificó el registro simultáneamente
   - Solución: Recarga la página y intenta nuevamente
   
2. Pérdida de conexión
   - Solución: Verifica tu conexión a internet

### Problema: Los datos no se actualizan

**Solución:**
- Haz clic en el botón "Actualizar" (🔄) en la parte superior
- Recarga la página (F5)

---

## Tips y Mejores Prácticas

### ✅ Recomendaciones:

1. **Mantén la información actualizada**
   - Actualiza el estado de los trabajadores regularmente
   - Verifica que el email y teléfono sean correctos

2. **Usa la búsqueda**
   - Es más rápido que desplazarte por la tabla
   - Puedes buscar por cualquier campo visible

3. **Revisa antes de eliminar**
   - La eliminación es permanente (en el mock)
   - Asegúrate de que es el trabajador correcto

4. **Aprovecha las estadísticas**
   - Revisa las tarjetas de estadísticas para obtener insights rápidos
   - Identifica tendencias en el estado de los trabajadores

5. **Formato de datos**
   - Usa formatos consistentes para teléfonos
   - Escribe direcciones completas y detalladas
   - Verifica fechas antes de enviar

### 📱 Uso en móviles:

El módulo es completamente responsive:
- La tabla se adapta a pantallas pequeñas
- El menú lateral se colapsa en un botón
- Los formularios se apilan verticalmente
- Las tarjetas de estadísticas se reorganizan

### ⌨️ Atajos de teclado:

- **Enter** en el campo de búsqueda: Ejecuta la búsqueda
- **Esc** en diálogos: Cierra el diálogo

---

## Siguientes Pasos

Una vez familiarizado con el módulo:

1. Revisa la documentación técnica en `README.md`
2. Consulta `API.md` para integración con backend
3. Lee `BACKEND.md` para implementación del servidor

---

## Soporte

Si encuentras problemas:

1. Revisa esta guía primero
2. Consulta la documentación técnica
3. Contacta al administrador del sistema
4. Reporta bugs al equipo de desarrollo

---

**Última actualización**: Octubre 2024  
**Versión del módulo**: 1.0.0

