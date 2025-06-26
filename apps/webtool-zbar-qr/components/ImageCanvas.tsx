import React, { useRef, useEffect } from 'react'

const ImageCanvas: React.FC<{
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  image: HTMLImageElement | null
  width?: number
  height?: number
}> = (prop) => {
  const { children, image, style, className, width, height } = prop
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!image) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = image
    Object.assign(canvas, {
      width,
      height
    })
    ctx.drawImage(image, 0, 0, width, height)
  })

  return (
    <canvas
      ref={canvasRef}
      style={style}
      className={className}
      width={width}
      height={height}
    >
      {children}
    </canvas>
  )
}

export default ImageCanvas
