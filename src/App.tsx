import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import LandingPage from '@/pages/Home/LandingPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/layouts/DashboardLayout'

// Módulo de Autenticación
import LoginView from '@/pages/auth/views/LoginView'

// Módulo de Dashboard
import DashboardPage from '@/pages/dashboard/dashboard/DashboardPage'

// Módulo de Reportes
import ReportesView from '@/pages/dashboard/reportes/ReportesView'

// Módulo de Test (solo desarrollo)
import LoadingTest from '@/pages/test/LoadingTest'

// Módulo de Usuarios
import UsuariosListView from '@/pages/dashboard/usuarios/views/UsuariosListView'
import UsuarioCreateView from '@/pages/dashboard/usuarios/views/UsuarioCreateView'
import UsuarioEditView from '@/pages/dashboard/usuarios/views/UsuarioEditView'
import UsuarioDetailView from '@/pages/dashboard/usuarios/views/UsuarioDetailView'

// Módulo de Roles
import RolesListView from '@/pages/dashboard/roles/views/RolesListView'
import RolCreateView from '@/pages/dashboard/roles/views/RolCreateView'
import RolEditView from '@/pages/dashboard/roles/views/RolEditView'
import RolDetailView from '@/pages/dashboard/roles/views/RolDetailView'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Módulo de Autenticación */}
        <Route path="/login" element={<LoginView />} />

        {/* Ruta de Test (solo desarrollo) */}
        <Route path="/test/loading" element={<LoadingTest />} />

        {/* Rutas protegidas - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Principal */}
          <Route index element={<DashboardPage />} />
          
          {/* Módulo de Reportes */}
          <Route path="reportes" element={<ReportesView />} />
          
          {/* Módulo de Usuarios */}
          <Route path="usuarios" element={<UsuariosListView />} />
          <Route path="usuarios/nuevo" element={<UsuarioCreateView />} />
          <Route path="usuarios/:id" element={<UsuarioDetailView />} />
          <Route path="usuarios/:id/editar" element={<UsuarioEditView />} />
          
          {/* Módulo de Roles */}
          <Route path="roles" element={<RolesListView />} />
          <Route path="roles/nuevo" element={<RolCreateView />} />
          <Route path="roles/:id" element={<RolDetailView />} />
          <Route path="roles/:id/editar" element={<RolEditView />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

