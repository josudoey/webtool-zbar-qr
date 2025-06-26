import React from 'react'

const OpenImageData: React.FC<{
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  onLoadedImageData?: (imageData: ImageData) => void
}> = ({ className, style, children, onLoadedImageData }) => {
  const onImageChange: React.ChangeEventHandler<HTMLInputElement> = function (
    e
  ) {
    const input = e.target
    if (!input.files?.length) return
    const file = input.files[0]
    if (!file) return

    input.value = ''

    const reader = new window.FileReader()
    reader.addEventListener(
      'load',
      function () {
        const url = reader.result
        let img = new window.Image()
        img.onload = function () {
          const image = this as HTMLImageElement
          if (!onLoadedImageData) return
          const { width, height } = image
          const canvas = document.createElement('canvas')
          Object.assign(canvas, {
            width,
            height
          })

          const ctx = canvas.getContext('2d')
          if (!ctx) return

          ctx.drawImage(image, 0, 0, width, height)
          const imageData = ctx.getImageData(0, 0, width, height)
          onLoadedImageData(imageData)
        }

        Object.assign(img, {
          src: url
        })
      },
      false
    )

    reader.readAsDataURL(file)
  }

  return (
    <label className={className} style={style}>
      {children}
      <input
        type='file'
        accept='.jpg,.png'
        style={{ display: 'none' }}
        onChange={onImageChange}
      />
    </label>
  )
}

export default OpenImageData
