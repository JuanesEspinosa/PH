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

// Módulo de Lotes
import LotesListView from '@/pages/dashboard/lotes/views/LotesListView'
import LoteCreateView from '@/pages/dashboard/lotes/views/LoteCreateView'
import LoteEditView from '@/pages/dashboard/lotes/views/LoteEditView'
import LoteDetailView from '@/pages/dashboard/lotes/views/LoteDetailView'

// Módulo de Cultivos
import CultivosListView from '@/pages/dashboard/cultivos/views/CultivosListView'
import CultivoCreateView from '@/pages/dashboard/cultivos/views/CultivoCreateView'
import CultivoEditView from '@/pages/dashboard/cultivos/views/CultivoEditView'

// Módulo de Planificación
import PlanificacionListView from '@/pages/dashboard/planificacion/views/PlanificacionListView'
import PlanificacionDetailView from '@/pages/dashboard/planificacion/views/PlanificacionDetailView'
import MonitoreoView from '@/pages/dashboard/planificacion/views/MonitoreoView'
import PlanificacionCreateView from '@/pages/dashboard/planificacion/views/PlanificacionCreateView'

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
          
          {/* Módulo de Lotes */}
          <Route path="lotes" element={<LotesListView />} />
          <Route path="lotes/nuevo" element={<LoteCreateView />} />
          <Route path="lotes/:id" element={<LoteDetailView />} />
          <Route path="lotes/:id/editar" element={<LoteEditView />} />
          
          {/* Módulo de Cultivos */}
          <Route path="cultivos" element={<CultivosListView />} />
          <Route path="cultivos/nuevo" element={<CultivoCreateView />} />
          <Route path="cultivos/:id/editar" element={<CultivoEditView />} />
          
          {/* Módulo de Planificación */}
          <Route path="planificacion" element={<PlanificacionListView />} />
          <Route path="planificacion/nueva" element={<PlanificacionCreateView />} />
          <Route path="planificacion/:id" element={<PlanificacionDetailView />} />
          <Route path="planificacion/monitoreo" element={<MonitoreoView />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

