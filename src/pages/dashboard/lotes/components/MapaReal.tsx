import { useState, useMemo, useEffect, useRef } from 'react';
import { Lote, COLORES_ESTADO } from '@/types/lotes';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getGoogleMapsScriptUrl } from '@/config/googleMaps';

// ============================================================================
// COMPONENTE DE MAPA REAL CON GOOGLE MAPS
// ============================================================================

interface MapaRealProps {
  lotes: Lote[];
  height?: string;
  onLoteClick?: (lote: Lote) => void;
  loteSeleccionado?: string;
  mostrarLeyenda?: boolean;
  mostrarTrabajadores?: boolean;
  trabajadoresData?: Array<{
    nombre: string;
    actividad: string;
  }>;
}

export const MapaReal = ({ 
  lotes, 
  height = '600px',
  onLoteClick,
  loteSeleccionado,
  mostrarLeyenda = true,
  mostrarTrabajadores = false,
  trabajadoresData = []
}: MapaRealProps) => {
  const [tipoMapa, setTipoMapa] = useState<'satellite' | 'roadmap'>('satellite');
  const [mapaListo, setMapaListo] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const polygonsRef = useRef<google.maps.Polygon[]>([]);
  const markersRef = useRef<google.maps.Marker[]>([]);
  
  // Calcular el centro del mapa basado en todos los lotes
  const centroMapa = useMemo(() => {
    if (lotes.length === 0) {
      return { lat: 4.6097, lng: -74.0817 }; // Bogotá por defecto
    }
    
    let totalLat = 0;
    let totalLng = 0;
    let totalPuntos = 0;
    
    lotes.forEach(lote => {
      lote.coordenadas.forEach(coord => {
        totalLat += coord.lat;
        totalLng += coord.lng;
        totalPuntos++;
      });
    });
    
    return { lat: totalLat / totalPuntos, lng: totalLng / totalPuntos };
  }, [lotes]);
  
  // Inicializar Google Maps
  useEffect(() => {
    if (!mapRef.current || googleMapRef.current) return;
    
    // Verificar si ya existe el script
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    
    const initMap = () => {
      if (!mapRef.current) return;
      
      // Crear el mapa
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center: centroMapa,
        zoom: 14,
        mapTypeId: tipoMapa,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
      });
      
      // Esperar a que el mapa esté completamente cargado
      google.maps.event.addListenerOnce(googleMapRef.current, 'idle', () => {
        setMapaListo(true);
      });
    };
    
    if (existingScript) {
      // Si el script ya existe, esperar a que Google Maps esté disponible
      if (typeof google !== 'undefined' && google.maps) {
        initMap();
      } else {
        existingScript.addEventListener('load', initMap);
      }
    } else {
      // Cargar Google Maps API
      const script = document.createElement('script');
      script.src = getGoogleMapsScriptUrl();
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [centroMapa, tipoMapa]);
  
  // Actualizar tipo de mapa
  useEffect(() => {
    if (googleMapRef.current) {
      googleMapRef.current.setMapTypeId(tipoMapa);
    }
  }, [tipoMapa]);
  
  // Actualizar polígonos cuando cambian los lotes
  useEffect(() => {
    if (!googleMapRef.current || !mapaListo) {
      console.log('Esperando mapa...', { googleMapRef: !!googleMapRef.current, mapaListo });
      return;
    }
    
    console.log('Dibujando polígonos para', lotes.length, 'lotes');
    
    // Limpiar polígonos anteriores
    polygonsRef.current.forEach(polygon => polygon.setMap(null));
    polygonsRef.current = [];
    
    // Crear nuevos polígonos
    lotes.forEach((lote) => {
      const colors = COLORES_ESTADO[lote.estado];
      const esSeleccionado = loteSeleccionado === lote.id;
      
      const paths = lote.coordenadas.map(coord => ({
        lat: coord.lat,
        lng: coord.lng
      }));
      
      console.log(`Creando polígono para lote ${lote.nombre}:`, paths);
      
      const polygon = new google.maps.Polygon({
        paths: paths,
        strokeColor: esSeleccionado ? '#3b82f6' : colors.color,
        strokeOpacity: 1,
        strokeWeight: esSeleccionado ? 4 : 2,
        fillColor: esSeleccionado ? '#3b82f680' : colors.fillColor,
        fillOpacity: 0.5,
        map: googleMapRef.current,
        clickable: true,
      });
      
      // Agregar InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${lote.nombre}</h3>
            <p style="color: #666; font-size: 12px; margin-bottom: 10px;">${lote.codigo}</p>
            <div style="font-size: 13px;">
              <div style="display: flex; justify-content: space-between; margin: 3px 0;">
                <span style="color: #666;">Estado:</span>
                <span style="font-weight: 500;">${colors.label}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 3px 0;">
                <span style="color: #666;">Área:</span>
                <span style="font-weight: 500;">${lote.area_hectareas} ha</span>
              </div>
              ${lote.cultivo_nombre ? `
                <div style="display: flex; justify-content: space-between; margin: 3px 0;">
                  <span style="color: #666;">Cultivo:</span>
                  <span style="font-weight: 500;">${lote.cultivo_nombre}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `
      });
      
      polygon.addListener('click', () => {
        infoWindow.setPosition(paths[0]);
        infoWindow.open(googleMapRef.current);
        if (onLoteClick) {
          onLoteClick(lote);
        }
      });
      
      polygonsRef.current.push(polygon);
    });
    
    // Ajustar vista para mostrar todos los lotes
    if (lotes.length > 0 && googleMapRef.current) {
      const bounds = new google.maps.LatLngBounds();
      lotes.forEach(lote => {
        lote.coordenadas.forEach(coord => {
          bounds.extend({ lat: coord.lat, lng: coord.lng });
        });
      });
      googleMapRef.current.fitBounds(bounds);
    }
  }, [lotes, loteSeleccionado, onLoteClick, mapaListo]);

  // Dibujar marcadores de trabajadores
  useEffect(() => {
    if (!googleMapRef.current || !window.google || !mapaListo || !mostrarTrabajadores) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (trabajadoresData.length === 0 || lotes.length === 0) return;

    // Obtener el primer lote
    const primerLote = lotes[0];
    if (!primerLote.coordenadas || primerLote.coordenadas.length === 0) return;

    // Función para verificar si un punto está dentro del polígono (Ray Casting)
    const puntoEnPoligono = (lat: number, lng: number, coords: Array<{lat: number, lng: number}>) => {
      let dentro = false;
      for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
        const xi = coords[i].lat, yi = coords[i].lng;
        const xj = coords[j].lat, yj = coords[j].lng;
        
        const intersect = ((yi > lng) !== (yj > lng))
            && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
        if (intersect) dentro = !dentro;
      }
      return dentro;
    };

    // Calcular el centro y el área del lote
    let totalLat = 0;
    let totalLng = 0;
    let minLat = primerLote.coordenadas[0].lat;
    let maxLat = primerLote.coordenadas[0].lat;
    let minLng = primerLote.coordenadas[0].lng;
    let maxLng = primerLote.coordenadas[0].lng;
    
    primerLote.coordenadas.forEach(coord => {
      totalLat += coord.lat;
      totalLng += coord.lng;
      minLat = Math.min(minLat, coord.lat);
      maxLat = Math.max(maxLat, coord.lat);
      minLng = Math.min(minLng, coord.lng);
      maxLng = Math.max(maxLng, coord.lng);
    });
    
    const centerLat = totalLat / primerLote.coordenadas.length;
    const centerLng = totalLng / primerLote.coordenadas.length;

    // Generar posiciones aleatorias DENTRO del polígono
    trabajadoresData.forEach((trabajador, index) => {
      let workerLat, workerLng;
      let intentos = 0;
      const maxIntentos = 100;
      
      // Intentar generar una posición aleatoria dentro del polígono
      do {
        // Generar punto aleatorio dentro del bounding box, pero cerca del centro
        const radioLat = (maxLat - minLat) * 0.35; // 35% del tamaño del lote
        const radioLng = (maxLng - minLng) * 0.35;
        
        const angle = Math.random() * 2 * Math.PI;
        const r = Math.random() * Math.sqrt(Math.random()); // Distribución más uniforme
        
        workerLat = centerLat + r * radioLat * Math.cos(angle);
        workerLng = centerLng + r * radioLng * Math.sin(angle);
        
        intentos++;
      } while (!puntoEnPoligono(workerLat, workerLng, primerLote.coordenadas) && intentos < maxIntentos);
      
      // Si después de muchos intentos no encontramos un punto, usar el centro
      if (intentos >= maxIntentos) {
        workerLat = centerLat;
        workerLng = centerLng;
      }

      // Crear marcador personalizado
      const marker = new google.maps.Marker({
        position: { lat: workerLat, lng: workerLng },
        map: googleMapRef.current,
        title: trabajador.nombre,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 8,
        },
        animation: google.maps.Animation.DROP,
        zIndex: 1000, // Asegurar que esté por encima de los polígonos
      });

      // InfoWindow para el trabajador
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 180px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">
                ${trabajador.nombre.charAt(0)}
              </div>
              <div>
                <div style="font-weight: 600; font-size: 14px; color: #111827;">
                  ${trabajador.nombre}
                </div>
                <div style="font-size: 11px; color: #6B7280;">
                  👷 Trabajador en campo
                </div>
              </div>
            </div>
            <div style="padding: 8px; background: #EFF6FF; border-radius: 6px; border-left: 3px solid #3B82F6;">
              <div style="font-size: 11px; color: #6B7280; margin-bottom: 2px;">Actividad actual:</div>
              <div style="font-size: 12px; color: #1F2937; font-weight: 500;">
                ${trabajador.actividad}
              </div>
            </div>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [mostrarTrabajadores, trabajadoresData, lotes, mapaListo]);
  
  return (
    <div className="space-y-4">
      {/* Controles del mapa */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={tipoMapa === 'satellite' ? 'default' : 'outline'}
            onClick={() => setTipoMapa('satellite')}
          >
            🛰️ Vista Satelital
          </Button>
          <Button
            size="sm"
            variant={tipoMapa === 'roadmap' ? 'default' : 'outline'}
            onClick={() => setTipoMapa('roadmap')}
          >
            🗺️ Vista de Calles
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          {lotes.length} lote{lotes.length !== 1 ? 's' : ''} en mapa
        </div>
      </div>
      
      {/* Mapa de Google Maps */}
      <Card className="overflow-hidden relative">
        <div 
          ref={mapRef} 
          style={{ height, width: '100%' }}
          className="bg-gray-100"
        />
        {!mapaListo && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Cargando mapa...</p>
              <p className="text-sm text-gray-500 mt-1">Preparando {lotes.length} lote{lotes.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        )}
      </Card>
      
      {/* Leyenda */}
      {mostrarLeyenda && lotes.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-3">Leyenda de Estados</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(COLORES_ESTADO).map(([estado, config]) => {
              const count = lotes.filter(l => l.estado === estado).length;
              if (count === 0) return null;
              
              return (
                <div key={estado} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-4 h-4 rounded border-2 flex-shrink-0"
                    style={{
                      backgroundColor: config.fillColor,
                      borderColor: config.color
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{config.label}</div>
                    <div className="text-gray-500">({count})</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-3 pt-3 border-t text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Área total:</span>
              <span className="font-semibold">
                {lotes.reduce((sum, l) => sum + l.area_hectareas, 0).toFixed(1)} ha
              </span>
            </div>
          </div>
        </Card>
      )}
      
      {/* Lista de lotes */}
      <Card className="p-4">
        <h4 className="font-semibold text-sm mb-3">Lotes en el Mapa</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {lotes.map((lote) => {
            const colors = COLORES_ESTADO[lote.estado];
            
            return (
              <div
                key={lote.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onLoteClick?.(lote)}
              >
                <div
                  className="w-4 h-4 rounded border-2 flex-shrink-0"
                  style={{
                    backgroundColor: colors.fillColor,
                    borderColor: colors.color
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{lote.nombre}</div>
                  <div className="text-xs text-gray-500">
                    {lote.codigo} • {lote.area_hectareas} ha
                    {lote.cultivo_nombre && ` • ${lote.cultivo_nombre}`}
                  </div>
                </div>
                <Badge
                  style={{
                    backgroundColor: colors.color + '20',
                    color: colors.color,
                    border: `1px solid ${colors.color}`
                  }}
                >
                  {colors.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default MapaReal;

