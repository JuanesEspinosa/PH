import { useState } from 'react'
import Loading from './loading'
import { Button } from './button'

/**
 * Ejemplos de uso del componente Loading
 */
const LoadingExamples = () => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAsyncAction = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
  }

  return (
    <div className="p-8 space-y-12 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">
        Ejemplos de Loading Component
      </h1>

      {/* Ejemplo 1: Overlay Full Screen */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          1. Overlay Full Screen
        </h2>
        <p className="text-gray-300">
          Para mostrar un loading que cubre toda la pantalla con fondo oscuro.
          Ideal para operaciones que bloquean la UI completa.
        </p>
        <Button onClick={() => setShowOverlay(true)} variant="default">
          Mostrar Overlay
        </Button>
        {showOverlay && (
          <Loading
            variant="overlay"
            size="lg"
            text="Cargando datos..."
            overlayColor="rgba(0, 0, 0, 0.9)"
            overlayOpacity={0.95}
          />
        )}
        <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<Loading
  variant="overlay"
  size="lg"
  text="Cargando datos..."
  overlayColor="rgba(0, 0, 0, 0.9)"
  overlayOpacity={0.95}
/>`}
        </pre>
        {showOverlay && (
          <Button
            onClick={() => setShowOverlay(false)}
            variant="destructive"
            className="mt-4"
          >
            Cerrar Overlay
          </Button>
        )}
      </section>

      {/* Ejemplo 2: Inline Loading */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          2. Inline Loading
        </h2>
        <p className="text-gray-300">
          Para mostrar dentro de un contenedor específico. Útil para secciones
          de la página que cargan datos.
        </p>
        <div className="bg-gray-800 p-8 rounded-lg flex justify-center">
          <Loading variant="inline" size="md" text="Cargando contenido..." />
        </div>
        <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<div className="container">
  <Loading
    variant="inline"
    size="md"
    text="Cargando contenido..."
  />
</div>`}
        </pre>
      </section>

      {/* Ejemplo 3: Button Loading */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">3. Button Loading</h2>
        <p className="text-gray-300">
          Para mostrar dentro de botones durante operaciones asíncronas.
        </p>
        <Button
          onClick={handleAsyncAction}
          disabled={isLoading}
          className="min-w-[150px]"
        >
          {isLoading ? (
            <Loading variant="button" size="sm" />
          ) : (
            'Guardar Cambios'
          )}
        </Button>
        <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<Button onClick={handleAsyncAction} disabled={isLoading}>
  {isLoading ? (
    <Loading variant="button" size="sm" />
  ) : (
    'Guardar Cambios'
  )}
</Button>`}
        </pre>
      </section>

      {/* Ejemplo 4: Tamaños diferentes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          4. Diferentes Tamaños
        </h2>
        <p className="text-gray-300">
          El componente soporta tres tamaños: sm, md, lg
        </p>
        <div className="flex gap-8 items-end bg-gray-800 p-8 rounded-lg justify-center">
          <div className="text-center">
            <Loading variant="inline" size="sm" />
            <p className="text-white mt-2 text-sm">Small</p>
          </div>
          <div className="text-center">
            <Loading variant="inline" size="md" />
            <p className="text-white mt-2 text-sm">Medium</p>
          </div>
          <div className="text-center">
            <Loading variant="inline" size="lg" />
            <p className="text-white mt-2 text-sm">Large</p>
          </div>
        </div>
        <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<Loading variant="inline" size="sm" />
<Loading variant="inline" size="md" />
<Loading variant="inline" size="lg" />`}
        </pre>
      </section>

      {/* Ejemplo 5: Card con Loading */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          5. Dentro de un Card
        </h2>
        <p className="text-gray-300">
          Ejemplo real de uso en un card que carga datos.
        </p>
        <div className="bg-gray-800 rounded-lg p-6 max-w-md">
          <h3 className="text-xl font-semibold text-white mb-4">
            Datos del Usuario
          </h3>
          <div className="min-h-[200px] flex items-center justify-center">
            <Loading variant="inline" size="md" text="Cargando perfil..." />
          </div>
        </div>
        <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<Card>
  <CardHeader>
    <CardTitle>Datos del Usuario</CardTitle>
  </CardHeader>
  <CardContent>
    {isLoading ? (
      <Loading
        variant="inline"
        size="md"
        text="Cargando perfil..."
      />
    ) : (
      <UserData />
    )}
  </CardContent>
</Card>`}
        </pre>
      </section>

      {/* Ejemplo 6: Sin texto */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">6. Sin Texto</h2>
        <p className="text-gray-300">
          El texto es opcional, puedes omitirlo para un diseño más limpio.
        </p>
        <div className="bg-gray-800 p-8 rounded-lg flex justify-center">
          <Loading variant="inline" size="md" />
        </div>
        <pre className="bg-gray-800 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<Loading variant="inline" size="md" />`}
        </pre>
      </section>

      {/* Props documentation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Props Disponibles</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-2 text-white font-semibold">Prop</th>
                <th className="pb-2 text-white font-semibold">Tipo</th>
                <th className="pb-2 text-white font-semibold">Default</th>
                <th className="pb-2 text-white font-semibold">Descripción</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">variant</td>
                <td className="py-2">'overlay' | 'inline' | 'button'</td>
                <td className="py-2">'inline'</td>
                <td className="py-2">Tipo de visualización del loading</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">size</td>
                <td className="py-2">'sm' | 'md' | 'lg'</td>
                <td className="py-2">'md'</td>
                <td className="py-2">Tamaño del loading</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">text</td>
                <td className="py-2">string</td>
                <td className="py-2">-</td>
                <td className="py-2">Texto a mostrar debajo del loading</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">overlayColor</td>
                <td className="py-2">string</td>
                <td className="py-2">'rgba(0, 0, 0, 0.8)'</td>
                <td className="py-2">Color del fondo (solo overlay)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">overlayOpacity</td>
                <td className="py-2">number</td>
                <td className="py-2">0.8</td>
                <td className="py-2">Opacidad del fondo (solo overlay)</td>
              </tr>
              <tr>
                <td className="py-2 text-green-400">className</td>
                <td className="py-2">string</td>
                <td className="py-2">''</td>
                <td className="py-2">Clases CSS adicionales</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default LoadingExamples

