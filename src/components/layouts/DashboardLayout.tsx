import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  Sprout,
  Clipboard,
  LogOut, 
  Menu,
  FileText,
  Shield,
  X,
  Map,
  Leaf,
  Calendar,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock
} from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Datos de ejemplo de notificaciones
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Labor completada',
      message: 'La cosecha de maíz en Lote A-1 ha sido registrada exitosamente',
      time: 'Hace 5 minutos',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Alerta de clima',
      message: 'Se pronostica lluvia para mañana. Considera ajustar el riego',
      time: 'Hace 1 hora',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Nuevo trabajador',
      message: 'Carlos López ha sido agregado al equipo de cosecha',
      time: 'Hace 2 horas',
      unread: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Reporte generado',
      message: 'El reporte mensual de productividad está listo para descargar',
      time: 'Ayer',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navigation = [
    // Nivel 1: Gestión Principal y Monitoreo
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Lotes', href: '/dashboard/lotes', icon: Map },
    { name: 'Cultivos', href: '/dashboard/cultivos', icon: Leaf },
    
    // Nivel 2: Operaciones Diarias
    { name: 'Registro de Labores', href: '/dashboard/labores', icon: Clipboard },
    { name: 'Trabajadores', href: '/dashboard/trabajadores', icon: Briefcase },
    { name: 'Tipos de Labor', href: '/dashboard/tipos-labor', icon: Sprout },
    
    // Nivel 3: Planificación y Análisis
    { name: 'Planificación', href: '/dashboard/planificacion', icon: Calendar },
    { name: 'Reportes', href: '/dashboard/reportes', icon: FileText },
    
    // Nivel 4: Administración del Sistema
    { name: 'Usuarios', href: '/dashboard/usuarios', icon: Users },
    { name: 'Roles', href: '/dashboard/roles', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sprout className="h-8 w-8 text-green-500 drop-shadow-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-sm opacity-30"></div>
                </div>
                <h1 className="text-3xl font-bold relative">
                  <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-lg relative z-10">
                    TerraSync
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent blur-sm opacity-60 z-0">
                    TerraSync
                  </div>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Campana de notificaciones */}
              <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notificaciones</h3>
                      {unreadCount > 0 && (
                        <span className="text-sm text-gray-500">{unreadCount} sin leer</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>No hay notificaciones</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </p>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 top-16 z-30 w-64 bg-white border-r transition-transform duration-300 ease-in-out overflow-y-auto
            lg:left-0 lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="flex flex-col gap-1 p-4">
            {/* Nivel 1: Gestión Principal y Monitoreo */}
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Gestión Principal
              </h3>
              {navigation.slice(0, 3).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-primary border-l-4 border-l-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Nivel 2: Operaciones Diarias */}
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Operaciones Diarias
              </h3>
              {navigation.slice(3, 6).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-primary border-l-4 border-l-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Nivel 3: Planificación y Análisis */}
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Planificación y Análisis
              </h3>
              {navigation.slice(6, 8).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-primary border-l-4 border-l-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Nivel 4: Administración del Sistema */}
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Administración
              </h3>
              {navigation.slice(8).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-primary border-l-4 border-l-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

