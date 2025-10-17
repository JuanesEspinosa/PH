import { useState, useCallback } from 'react'

interface UseLoadingReturn {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

/**
 * Hook personalizado para manejar estados de loading
 * 
 * @example
 * ```tsx
 * const { isLoading, withLoading } = useLoading()
 * 
 * const handleSubmit = async () => {
 *   await withLoading(async () => {
 *     await api.saveData(data)
 *   })
 * }
 * 
 * return (
 *   <Button onClick={handleSubmit} disabled={isLoading}>
 *     {isLoading ? <Loading variant="button" size="sm" /> : 'Guardar'}
 *   </Button>
 * )
 * ```
 */
export const useLoading = (initialState = false): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState(initialState)

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  /**
   * Ejecuta una función asíncrona y maneja el estado de loading automáticamente
   * @param fn Función asíncrona a ejecutar
   * @returns El resultado de la función
   */
  const withLoading = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true)
      const result = await fn()
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  }
}

