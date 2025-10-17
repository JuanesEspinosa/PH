/**
 * Sistema de Roles y Permisos
 * 
 * Define los roles disponibles y sus permisos asociados
 */

// Roles disponibles en el sistema
export type UserRole = 'admin' | 'user' | 'moderator' | 'viewer'

// Permisos disponibles
export type Permission = 
  // Dashboard
  | 'dashboard.view'
  
  // Usuarios
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  
  // Configuración
  | 'settings.view'
  | 'settings.edit'
  
  // Reportes
  | 'reports.view'
  | 'reports.export'
  
  // Perfil
  | 'profile.view'
  | 'profile.edit'

// Mapeo de roles a permisos
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'dashboard.view',
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'settings.view',
    'settings.edit',
    'reports.view',
    'reports.export',
    'profile.view',
    'profile.edit',
  ],
  moderator: [
    'dashboard.view',
    'users.view',
    'users.create',
    'users.edit',
    'settings.view',
    'reports.view',
    'profile.view',
    'profile.edit',
  ],
  user: [
    'dashboard.view',
    'users.view',
    'profile.view',
    'profile.edit',
  ],
  viewer: [
    'dashboard.view',
    'users.view',
    'profile.view',
  ],
}

// Configuración de rutas con permisos requeridos
export interface RouteConfig {
  path: string
  permission: Permission
  roles?: UserRole[] // Si se especifica, solo estos roles pueden acceder
  fallback?: string // Ruta de redirección si no tiene permisos
}

// Configuración de elementos del menú
export interface MenuItem {
  name: string
  href: string
  icon: any
  permission: Permission
  roles?: UserRole[]
  children?: MenuItem[]
}

// Información del rol
export interface RoleInfo {
  name: string
  displayName: string
  description: string
  color: string
  level: number // Nivel jerárquico (mayor = más permisos)
}

export const ROLE_INFO: Record<UserRole, RoleInfo> = {
  admin: {
    name: 'admin',
    displayName: 'Administrador',
    description: 'Acceso completo al sistema',
    color: 'red',
    level: 4,
  },
  moderator: {
    name: 'moderator',
    displayName: 'Moderador',
    description: 'Puede gestionar usuarios y ver reportes',
    color: 'blue',
    level: 3,
  },
  user: {
    name: 'user',
    displayName: 'Usuario',
    description: 'Acceso básico al sistema',
    color: 'green',
    level: 2,
  },
  viewer: {
    name: 'viewer',
    displayName: 'Visualizador',
    description: 'Solo puede ver información',
    color: 'gray',
    level: 1,
  },
}
