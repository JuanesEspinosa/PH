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

// Módulo de Roles
import RolesListView from '@/pages/dashboard/roles/views/RolesListView'
import RolCreateView from '@/pages/dashboard/roles/views/RolCreateView'
import RolEditView from '@/pages/dashboard/roles/views/RolEditView'
import RolDetailView from '@/pages/dashboard/roles/views/RolDetailView'

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
          
          {/* Módulo de Roles */}
          <Route path="roles" element={<RolesListView />} />
          <Route path="roles/nuevo" element={<RolCreateView />} />
          <Route path="roles/:id" element={<RolDetailView />} />
          <Route path="roles/:id/editar" element={<RolEditView />} />
          
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

