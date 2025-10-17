import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import LandingPage from '@/pages/Home/LandingPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/layouts/DashboardLayout'

// Módulo de Autenticación
import LoginView from '@/pages/auth/views/LoginView'
import RegisterView from '@/pages/auth/views/RegisterView'
import ForgotPasswordView from '@/pages/auth/views/ForgotPasswordView'

// Módulo de Dashboard
import DashboardPage from '@/pages/dashboard/dashboard/DashboardPage'

// Módulo de Test (solo desarrollo)
import LoadingTest from '@/pages/test/LoadingTest'

// Módulo de Usuarios
import UsuariosListView from '@/pages/dashboard/usuarios/views/UsuariosListView'
import UsuarioCreateView from '@/pages/dashboard/usuarios/views/UsuarioCreateView'
import UsuarioEditView from '@/pages/dashboard/usuarios/views/UsuarioEditView'
import UsuarioDetailView from '@/pages/dashboard/usuarios/views/UsuarioDetailView'

// Módulo de Trabajadores
import TrabajadoresListView from '@/pages/dashboard/trabajadores/views/TrabajadoresListView'
import TrabajadorCreateView from '@/pages/dashboard/trabajadores/views/TrabajadorCreateView'
import TrabajadorEditView from '@/pages/dashboard/trabajadores/views/TrabajadorEditView'
import TrabajadorDetailView from '@/pages/dashboard/trabajadores/views/TrabajadorDetailView'

// Módulo de Tipos de Labor
import TiposLaborListView from '@/pages/dashboard/tipos-labor/views/TiposLaborListView'
import TipoLaborCreateView from '@/pages/dashboard/tipos-labor/views/TipoLaborCreateView'
import TipoLaborEditView from '@/pages/dashboard/tipos-labor/views/TipoLaborEditView'
import TipoLaborDetailView from '@/pages/dashboard/tipos-labor/views/TipoLaborDetailView'

// Módulo de Labores Agrícolas
import LaboresListView from '@/pages/dashboard/labores/views/LaboresListView'
import LaborCreateView from '@/pages/dashboard/labores/views/LaborCreateView'
import LaborEditView from '@/pages/dashboard/labores/views/LaborEditView'
import LaborDetailView from '@/pages/dashboard/labores/views/LaborDetailView'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Módulo de Autenticación */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />

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
          
          {/* Módulo de Usuarios */}
          <Route path="usuarios" element={<UsuariosListView />} />
          <Route path="usuarios/nuevo" element={<UsuarioCreateView />} />
          <Route path="usuarios/:id" element={<UsuarioDetailView />} />
          <Route path="usuarios/:id/editar" element={<UsuarioEditView />} />
          
          {/* Módulo de Trabajadores */}
          <Route path="trabajadores" element={<TrabajadoresListView />} />
          <Route path="trabajadores/nuevo" element={<TrabajadorCreateView />} />
          <Route path="trabajadores/:id" element={<TrabajadorDetailView />} />
          <Route path="trabajadores/:id/editar" element={<TrabajadorEditView />} />
          
          {/* Módulo de Tipos de Labor */}
          <Route path="tipos-labor" element={<TiposLaborListView />} />
          <Route path="tipos-labor/nuevo" element={<TipoLaborCreateView />} />
          <Route path="tipos-labor/:id" element={<TipoLaborDetailView />} />
          <Route path="tipos-labor/:id/editar" element={<TipoLaborEditView />} />
          
          {/* Módulo de Labores Agrícolas */}
          <Route path="labores" element={<LaboresListView />} />
          <Route path="labores/nuevo" element={<LaborCreateView />} />
          <Route path="labores/:id" element={<LaborDetailView />} />
          <Route path="labores/:id/editar" element={<LaborEditView />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

