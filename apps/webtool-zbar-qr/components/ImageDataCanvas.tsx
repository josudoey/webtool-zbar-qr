import React, { useRef, useEffect } from 'react'

const ImageDataCanvas: React.FC<{
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  imageData: ImageData
  width?: number
  height?: number
}> = ({ children, imageData, style, className, width, height }) => {
  if (!imageData) return

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    console.log(
      'putData',
      imageData.data.length,
      imageData.width,
      imageData.height
    )
    ctx.putImageData(imageData, 0, 0)
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

export default ImageDataCanvas
