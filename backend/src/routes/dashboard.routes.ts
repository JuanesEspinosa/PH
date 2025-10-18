import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/dashboard/estadisticas
router.get('/estadisticas', DashboardController.getEstadisticas);

// GET /api/dashboard/produccion-mensual
router.get('/produccion-mensual', DashboardController.getProduccionMensual);

// GET /api/dashboard/rendimiento-hectarea
router.get('/rendimiento-hectarea', DashboardController.getRendimientoHectarea);

// GET /api/dashboard/distribucion-cultivos
router.get('/distribucion-cultivos', DashboardController.getDistribucionCultivos);

// GET /api/dashboard/eficiencia-campos
router.get('/eficiencia-campos', DashboardController.getEficienciaCampos);

// GET /api/dashboard/labores-diarias
router.get('/labores-diarias', DashboardController.getLaboresDiarias);

// GET /api/dashboard/calidad-produccion
router.get('/calidad-produccion', DashboardController.getCalidadProduccion);

export default router;

