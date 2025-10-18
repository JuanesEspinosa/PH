import { Router } from 'express';
import { ReportesController } from '../controllers/reportes.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/reportes - Obtener reportes disponibles
router.get('/', ReportesController.getReportesDisponibles);

// POST /api/reportes/generar-pdf
router.post('/generar-pdf', ReportesController.generarPDF);

// POST /api/reportes/generar-excel
router.post('/generar-excel', ReportesController.generarExcel);

export default router;

