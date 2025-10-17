import React from 'react'
import './loading.css'

export interface LoadingProps {
  /**
   * Variante del loading
   * - overlay: Pantalla completa con fondo oscuro
   * - inline: Para usar dentro de contenedores
   * - button: Tamaño pequeño para botones
   */
  variant?: 'overlay' | 'inline' | 'button'
  /**
   * Tamaño del loading
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Texto a mostrar debajo del loading
   */
  text?: string
  /**
   * Color del fondo (solo para variant overlay)
   */
  overlayColor?: string
  /**
   * Opacidad del fondo (solo para variant overlay)
   */
  overlayOpacity?: number
  /**
   * Clase CSS adicional
   */
  className?: string
}

const Loading: React.FC<LoadingProps> = ({
  variant = 'inline',
  size = 'md',
  text,
  overlayColor = 'rgba(0, 0, 0, 0.8)',
  overlayOpacity = 0.8,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  }

  const loaderContent = (
    <div className={`loading-container ${sizeClasses[size]} ${className}`}>
      <div className="coffee-loader">
        <div className="coffee-cup">
          <div className="coffee-cup-handle"></div>
          <div className="coffee-smoke one"></div>
          <div className="coffee-smoke two"></div>
          <div className="coffee-smoke three"></div>
        </div>
      </div>
      {text && <div className="loading-text">{text}</div>}
    </div>
  )

  if (variant === 'overlay') {
    return (
      <div
        className="loading-overlay"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      >
        {loaderContent}
      </div>
    )
  }

  if (variant === 'button') {
    return (
      <div className="loading-button">
        {loaderContent}
      </div>
    )
  }

  return loaderContent
}

export default Loading

