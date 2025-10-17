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

// Módulo de Usuarios
import UsuariosListView from '@/pages/dashboard/usuarios/views/UsuariosListView'
import UsuarioCreateView from '@/pages/dashboard/usuarios/views/UsuarioCreateView'
import UsuarioEditView from '@/pages/dashboard/usuarios/views/UsuarioEditView'
import UsuarioDetailView from '@/pages/dashboard/usuarios/views/UsuarioDetailView'

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
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

