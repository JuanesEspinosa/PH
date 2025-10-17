import { useState, useEffect, useRef } from 'react';
import { Coordenada } from '@/types/lotes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Trash2, Undo, X } from 'lucide-react';
import { calcularArea, calcularPerimetro } from '../services/lotesService';
import { getGoogleMapsScriptUrl } from '@/config/googleMaps';

// ============================================================================
// SELECTOR DE LOTE EN MAPA INTERACTIVO
// ============================================================================

interface SelectorMapaInteractivoProps {
  value: Coordenada[];
  onChange: (coordenadas: Coordenada[]) => void;
  height?: string;
}

export const SelectorMapaInteractivo = ({
  value,
  onChange,
  height = '500px'
}: SelectorMapaInteractivoProps) => {
  const [modoSeleccion, setModoSeleccion] = useState(false);
  const [mapaListo, setMapaListo] = useState(false);
  const [dibujando, setDibujando] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  
  // Inicializar Google Maps con Drawing Tools
  useEffect(() => {
    if (!mapRef.current || googleMapRef.current) return;
    
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    
    const initMap = () => {
      if (!mapRef.current) return;
      
      // Verificar que Google Maps y Drawing estén disponibles
      if (typeof google === 'undefined' || !google.maps || !google.maps.drawing) {
        console.error('Google Maps Drawing library no está cargada');
        return;
      }
      
      // Crear el mapa
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center: { lat: 4.6097, lng: -74.0817 }, // Bogotá
        zoom: 15,
        mapTypeId: 'satellite',
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
      });
      
      // Inicializar Drawing Manager
      drawingManagerRef.current = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        polygonOptions: {
          fillColor: '#3b82f6',
          fillOpacity: 0.4,
          strokeWeight: 3,
          strokeColor: '#3b82f6',
          clickable: true,
          editable: true,
          draggable: false,
        }
      });
      
      drawingManagerRef.current.setMap(googleMapRef.current);
      
      // Listener cuando se completa el dibujo
      google.maps.event.addListener(
        drawingManagerRef.current,
        'polygoncomplete',
        (polygon: google.maps.Polygon) => {
          handlePolygonComplete(polygon);
        }
      );
      
      google.maps.event.addListenerOnce(googleMapRef.current, 'idle', () => {
        setMapaListo(true);
      });
    };
    
    if (existingScript) {
      // Esperar a que el script cargue completamente incluyendo las librerías
      const checkGoogle = setInterval(() => {
        if (typeof google !== 'undefined' && google.maps && google.maps.drawing) {
          clearInterval(checkGoogle);
          initMap();
        }
      }, 100);
      
      // Timeout después de 5 segundos
      setTimeout(() => clearInterval(checkGoogle), 5000);
    } else {
      const script = document.createElement('script');
      script.src = getGoogleMapsScriptUrl();
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Esperar un momento para que las librerías se inicialicen
        setTimeout(initMap, 100);
      };
      document.head.appendChild(script);
    }
  }, []);
  
  // Manejar cuando se completa el dibujo de un polígono
  const handlePolygonComplete = (polygon: google.maps.Polygon) => {
    // Obtener las coordenadas del polígono
    const path = polygon.getPath();
    const coords: Coordenada[] = [];
    
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coords.push({ lat: point.lat(), lng: point.lng() });
    }
    
    // Cerrar el polígono agregando el primer punto al final
    if (coords.length > 0) {
      coords.push(coords[0]);
    }
    
    onChange(coords);
    
    // Desactivar modo de dibujo
    setModoSeleccion(false);
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(null);
    }
    
    // Remover el polígono temporal
    polygon.setMap(null);
  };
  
  // Iniciar modo de dibujo
  const iniciarDibujo = () => {
    if (drawingManagerRef.current) {
      setModoSeleccion(true);
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  };
  
  // Actualizar visualización cuando cambian las coordenadas
  useEffect(() => {
    if (!googleMapRef.current || !mapaListo) return;
    
    // Limpiar polígono anterior
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }
    
    if (value.length === 0) return;
    
    // Si hay 3 o más puntos, dibujar polígono editable
    if (value.length >= 3) {
      const paths = value.map(coord => ({ lat: coord.lat, lng: coord.lng }));
      
      polygonRef.current = new google.maps.Polygon({
        paths: paths,
        strokeColor: '#10b981',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#10b98140',
        fillOpacity: 0.5,
        map: googleMapRef.current,
        editable: false,
        draggable: false,
      });
      
      // Ajustar vista para mostrar todo el polígono
      const bounds = new google.maps.LatLngBounds();
      value.forEach(coord => bounds.extend({ lat: coord.lat, lng: coord.lng }));
      googleMapRef.current?.fitBounds(bounds);
    }
  }, [value, mapaListo]);
  
  // Limpiar todo
  const handleClear = () => {
    onChange([]);
    setModoSeleccion(false);
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(null);
    }
  };
  
  // Redibujar
  const handleRedibujar = () => {
    onChange([]);
    iniciarDibujo();
  };
  
  const esPoligonoCerrado = value.length >= 4 && 
    value[0].lat === value[value.length - 1].lat &&
    value[0].lng === value[value.length - 1].lng;
  
  const area = value.length >= 3 ? calcularArea(value) : 0;
  const perimetro = value.length >= 2 ? calcularPerimetro(value) : 0;
  
  return (
    <div className="space-y-4">
      {/* Instrucciones */}
      <Alert className="bg-blue-50 border-blue-200">
        <MapPin className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          {!modoSeleccion && value.length === 0 ? (
            <span><strong>🖊️ Click en "Dibujar Lote"</strong> y luego dibuja el área arrastrando el mouse sobre el mapa</span>
          ) : modoSeleccion ? (
            <span><strong>✏️ Dibuja el área del lote</strong> haciendo clic para marcar puntos. Haz doble clic para terminar</span>
          ) : (
            <span><strong>✓ Lote delimitado</strong> - Área capturada correctamente</span>
          )}
        </AlertDescription>
      </Alert>
      
      {/* Mapa */}
      <Card className="overflow-hidden relative">
        <div 
          ref={mapRef} 
          style={{ height, width: '100%' }}
          className={modoSeleccion ? 'cursor-crosshair' : ''}
        />
        {!mapaListo && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Cargando mapa...</p>
            </div>
          </div>
        )}
        
        {/* Panel de información flotante */}
        {mapaListo && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 z-10 max-w-xs">
            <div className="space-y-2">
              {value.length === 0 ? (
                <Button
                  size="sm"
                  onClick={iniciarDibujo}
                  className="w-full text-xs bg-blue-600 hover:bg-blue-700"
                >
                  🖊️ Dibujar Lote
                </Button>
              ) : (
                <div className="text-xs space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600">Puntos:</span>
                    <span className="font-semibold">{value.length}</span>
                  </div>
                  {area > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600">Área:</span>
                      <span className="font-semibold text-green-600">{area.toFixed(2)} ha</span>
                    </div>
                  )}
                  {perimetro > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600">Perímetro:</span>
                      <span className="font-semibold">{perimetro} m</span>
                    </div>
                  )}
                </div>
              )}
              
              {modoSeleccion && (
                <div className="text-[10px] text-blue-600 bg-blue-50 p-2 rounded">
                  💡 Haz clic para marcar puntos. Doble clic para terminar
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
      
      {/* Controles */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {value.length === 0 ? (
            <Button
              type="button"
              onClick={iniciarDibujo}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Dibujar Lote en el Mapa
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRedibujar}
              >
                <Undo className="h-4 w-4 mr-1" />
                Redibujar
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            </>
          )}
        </div>
        
        {value.length >= 3 && (
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            ✓ Lote delimitado - {area.toFixed(2)} ha
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectorMapaInteractivo;

