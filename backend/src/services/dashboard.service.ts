import { ApiError } from '../middlewares/errorHandler';

export interface EstadisticaAgricola {
  totalProduccion: number;
  totalArea: number;
  rendimientoPromedio: number;
  variacionSemanal: number;
  variacionMensual: number;
  proyeccionRendimiento: number;
  camposActivos: number;
  cultivosEnProceso: number;
  eficienciaPromedio: number;
}

export interface ProduccionMensual {
  mes: string;
  cafe: number;
  cana: number;
  maiz: number;
  platano: number;
  total: number;
}

export interface RendimientoPorHectarea {
  mes: string;
  rendimiento: number;
  objetivo: number;
}

export interface DistribucionCultivo {
  nombre: string;
  area: number;
  porcentaje: number;
  produccion: number;
  color: string;
}

export interface EficienciaCampo {
  campo: string;
  eficiencia: number;
  meta: number;
}

export interface LaborDiaria {
  dia: string;
  cosecha: number;
  riego: number;
  fertilizacion: number;
  transporte: number;
}

export interface CalidadProduccion {
  mes: string;
  excelente: number;
  buena: number;
  regular: number;
  mala: number;
}

export class DashboardService {
  static async getEstadisticas(): Promise<EstadisticaAgricola> {
    // Datos simulados basados en la documentación
    return {
      totalProduccion: 25150,
      totalArea: 177.5,
      rendimientoPromedio: 141.7,
      variacionSemanal: 8.5,
      variacionMensual: 15.3,
      proyeccionRendimiento: 32000,
      camposActivos: 3,
      cultivosEnProceso: 4,
      eficienciaPromedio: 87.5
    };
  }

  static async getProduccionMensual(): Promise<ProduccionMensual[]> {
    return [
      { mes: 'May', cafe: 26500, cana: 98000, maiz: 25000, platano: 22000, total: 171500 },
      { mes: 'Jun', cafe: 27000, cana: 99000, maiz: 25800, platano: 22500, total: 174300 },
      { mes: 'Jul', cafe: 27300, cana: 100000, maiz: 26200, platano: 23000, total: 176500 },
      { mes: 'Ago', cafe: 27600, cana: 101000, maiz: 26800, platano: 23200, total: 178600 },
      { mes: 'Sep', cafe: 27900, cana: 101500, maiz: 27200, platano: 23500, total: 180100 },
      { mes: 'Oct', cafe: 28200, cana: 102000, maiz: 27500, platano: 24000, total: 181700 }
    ];
  }

  static async getRendimientoHectarea(): Promise<RendimientoPorHectarea[]> {
    return [
      { mes: 'May', rendimiento: 138.5, objetivo: 150 },
      { mes: 'Jun', rendimiento: 142.0, objetivo: 150 },
      { mes: 'Jul', rendimiento: 145.3, objetivo: 150 },
      { mes: 'Ago', rendimiento: 148.7, objetivo: 150 },
      { mes: 'Sep', rendimiento: 149.8, objetivo: 150 },
      { mes: 'Oct', rendimiento: 151.2, objetivo: 150 }
    ];
  }

  static async getDistribucionCultivos(): Promise<DistribucionCultivo[]> {
    return [
      { nombre: 'Café', area: 45.5, porcentaje: 25.6, produccion: 28200, color: '#8B4513' },
      { nombre: 'Caña de Azúcar', area: 62.0, porcentaje: 34.9, produccion: 102000, color: '#90EE90' },
      { nombre: 'Maíz', area: 38.5, porcentaje: 21.7, produccion: 27500, color: '#FFD700' },
      { nombre: 'Plátano', area: 31.5, porcentaje: 17.8, produccion: 24000, color: '#FFE135' }
    ];
  }

  static async getEficienciaCampos(): Promise<EficienciaCampo[]> {
    return [
      { campo: 'Campo Norte A', eficiencia: 92, meta: 90 },
      { campo: 'Campo Este C', eficiencia: 85, meta: 85 },
      { campo: 'Campo Sur B', eficiencia: 86, meta: 85 }
    ];
  }

  static async getLaboresDiarias(): Promise<LaborDiaria[]> {
    return [
      { dia: 'Lun', cosecha: 8, riego: 4, fertilizacion: 2, transporte: 5 },
      { dia: 'Mar', cosecha: 7, riego: 5, fertilizacion: 3, transporte: 4 },
      { dia: 'Mié', cosecha: 9, riego: 4, fertilizacion: 2, transporte: 6 },
      { dia: 'Jue', cosecha: 8, riego: 6, fertilizacion: 4, transporte: 5 },
      { dia: 'Vie', cosecha: 10, riego: 5, fertilizacion: 3, transporte: 7 },
      { dia: 'Sáb', cosecha: 6, riego: 3, fertilizacion: 1, transporte: 3 },
      { dia: 'Dom', cosecha: 4, riego: 2, fertilizacion: 1, transporte: 2 }
    ];
  }

  static async getCalidadProduccion(): Promise<CalidadProduccion[]> {
    return [
      { mes: 'May', excelente: 55, buena: 30, regular: 12, mala: 3 },
      { mes: 'Jun', excelente: 58, buena: 31, regular: 9, mala: 2 },
      { mes: 'Jul', excelente: 60, buena: 29, regular: 9, mala: 2 },
      { mes: 'Ago', excelente: 61, buena: 30, regular: 8, mala: 1 },
      { mes: 'Sep', excelente: 61, buena: 31, regular: 7, mala: 1 },
      { mes: 'Oct', excelente: 62, buena: 30, regular: 7, mala: 1 }
    ];
  }
}

