import { Request, Response, NextFunction } from 'express';
import { ReportesService, ReporteRequest } from '../services/reportes.service';

export class ReportesController {
  static async generarPDF(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ReporteRequest = req.body;
      const reporte = await ReportesService.generarPDF(data);
      res.status(200).json(reporte);
    } catch (error) {
      next(error);
    }
  }

  static async generarExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ReporteRequest = req.body;
      const reporte = await ReportesService.generarExcel(data);
      res.status(200).json(reporte);
    } catch (error) {
      next(error);
    }
  }

  static async getReportesDisponibles(req: Request, res: Response, next: NextFunction) {
    try {
      const reportes = await ReportesService.getReportesDisponibles();
      res.json(reportes);
    } catch (error) {
      next(error);
    }
  }
}

