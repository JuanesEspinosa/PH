import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  static async getEstadisticas(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getEstadisticas();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getProduccionMensual(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getProduccionMensual();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getRendimientoHectarea(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getRendimientoHectarea();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getDistribucionCultivos(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getDistribucionCultivos();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getEficienciaCampos(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getEficienciaCampos();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getLaboresDiarias(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getLaboresDiarias();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCalidadProduccion(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.getCalidadProduccion();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

