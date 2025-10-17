import { useState } from 'react'
import Loading from '@/components/ui/loading'
import { useLoading } from '@/hooks/use-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Página de prueba para el componente Loading
 * Ruta sugerida: /test/loading
 */
const LoadingTest = () => {
  const [showOverlay, setShowOverlay] = useState(false)
  const { isLoading: isButtonLoading, withLoading } = useLoading()
  const [isCardLoading, setIsCardLoading] = useState(false)

  // Simular operación asíncrona
  const simulateAsyncOperation = async (duration = 3000) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  }

  const handleButtonClick = async () => {
    await withLoading(async () => {
      await simulateAsyncOperation(3000)
    })
  }

  const handleOverlayTest = async () => {
    setShowOverlay(true)
    await simulateAsyncOperation(3000)
    setShowOverlay(false)
  }

  const handleCardTest = async () => {
    setIsCardLoading(true)
    await simulateAsyncOperation(3000)
    setIsCardLoading(false)
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🍵 Loading Component Test</h1>
        <p className="text-muted-foreground">
          Prueba todos los casos de uso del componente Loading
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test 1: Overlay */}
        <Card>
          <CardHeader>
            <CardTitle>1. Overlay Full Screen</CardTitle>
            <CardDescription>
              Loading que cubre toda la pantalla con fondo oscuro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleOverlayTest} className="w-full">
              Mostrar Overlay por 3 segundos
            </Button>
            <div className="text-sm text-muted-foreground">
              <strong>Uso:</strong> Para operaciones críticas que bloquean toda la UI
            </div>
          </CardContent>
        </Card>

        {/* Test 2: Button Loading */}
        <Card>
          <CardHeader>
            <CardTitle>2. Button Loading</CardTitle>
            <CardDescription>
              Loading dentro de un botón durante operación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleButtonClick}
              disabled={isButtonLoading}
              className="w-full"
            >
              {isButtonLoading ? (
                <Loading variant="button" size="sm" />
              ) : (
                'Guardar Cambios'
              )}
            </Button>
            <div className="text-sm text-muted-foreground">
              <strong>Uso:</strong> Para submit de formularios o acciones en botones
            </div>
          </CardContent>
        </Card>

        {/* Test 3: Inline Loading en Card */}
        <Card>
          <CardHeader>
            <CardTitle>3. Inline Loading</CardTitle>
            <CardDescription>
              Loading dentro de un contenedor específico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="min-h-[200px] flex items-center justify-center border rounded-lg">
              {isCardLoading ? (
                <Loading
                  variant="inline"
                  size="md"
                  text="Cargando datos..."
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  Contenido cargado ✓
                </div>
              )}
            </div>
            <Button onClick={handleCardTest} className="w-full" variant="secondary">
              Cargar Contenido
            </Button>
            <div className="text-sm text-muted-foreground">
              <strong>Uso:</strong> Para secciones de página que cargan datos
            </div>
          </CardContent>
        </Card>

        {/* Test 4: Tamaños */}
        <Card>
          <CardHeader>
            <CardTitle>4. Diferentes Tamaños</CardTitle>
            <CardDescription>
              Small, Medium y Large
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around items-end py-4">
              <div className="text-center space-y-2">
                <Loading variant="inline" size="sm" />
                <p className="text-xs text-muted-foreground">Small</p>
              </div>
              <div className="text-center space-y-2">
                <Loading variant="inline" size="md" />
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div className="text-center space-y-2">
                <Loading variant="inline" size="lg" />
                <p className="text-xs text-muted-foreground">Large</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-4">
              <strong>Uso:</strong> Elige el tamaño según el contexto
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test 5: Comparación lado a lado */}
      <Card>
        <CardHeader>
          <CardTitle>5. Comparación de Variantes</CardTitle>
          <CardDescription>
            Visualiza todas las variantes juntas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-center">Inline</h3>
              <div className="h-32 flex items-center justify-center border rounded-lg">
                <Loading variant="inline" size="sm" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Se integra en el flujo del contenedor
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-center">Button</h3>
              <div className="h-32 flex items-center justify-center border rounded-lg">
                <Button disabled>
                  <Loading variant="button" size="sm" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Compacto para uso en botones
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-center">Con Texto</h3>
              <div className="h-32 flex items-center justify-center border rounded-lg bg-slate-900">
                <Loading variant="inline" size="sm" text="Cargando..." />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Con texto descriptivo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Código de ejemplo */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Ejemplo de Código</CardTitle>
          <CardDescription>
            Copia y pega en tu componente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useLoading } from '@/hooks/use-loading'
import Loading from '@/components/ui/loading'
import { Button } from '@/components/ui/button'

function MyComponent() {
  const { isLoading, withLoading } = useLoading()

  const handleSubmit = async () => {
    await withLoading(async () => {
      await api.saveData(data)
    })
  }

  return (
    <Button onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? (
        <Loading variant="button" size="sm" />
      ) : (
        'Guardar'
      )}
    </Button>
  )
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Props reference */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Props Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Prop</th>
                  <th className="text-left py-2 px-4">Tipo</th>
                  <th className="text-left py-2 px-4">Default</th>
                  <th className="text-left py-2 px-4">Descripción</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono text-green-600">variant</td>
                  <td className="py-2 px-4">'overlay' | 'inline' | 'button'</td>
                  <td className="py-2 px-4">'inline'</td>
                  <td className="py-2 px-4">Tipo de loading</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono text-green-600">size</td>
                  <td className="py-2 px-4">'sm' | 'md' | 'lg'</td>
                  <td className="py-2 px-4">'md'</td>
                  <td className="py-2 px-4">Tamaño</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono text-green-600">text</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">Texto debajo del loading</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono text-green-600">overlayColor</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">'rgba(0, 0, 0, 0.8)'</td>
                  <td className="py-2 px-4">Color fondo (overlay)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-green-600">className</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">''</td>
                  <td className="py-2 px-4">Clases CSS extra</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Overlay activo */}
      {showOverlay && (
        <Loading
          variant="overlay"
          size="lg"
          text="Procesando operación..."
          overlayColor="rgba(0, 0, 0, 0.9)"
          overlayOpacity={0.95}
        />
      )}
    </div>
  )
}

export default LoadingTest

