'use client'

import React, { useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'
import NavBar from '@/components/NavBar'
import OpenImageData from '@/components/OpenImageData'
import ImageDataCanvas from '@/components/ImageDataCanvas'
import ZbarProcess from 'zbar-qr'

type ZbarProcessResults = ReturnType<typeof ZbarProcess>
type ZbarProcessResult = ZbarProcessResults[number]
type ZbarLocaltion = ZbarProcessResult['loc']

const ZbarResultCanvas: React.FC<{
  location: ZbarLocaltion
  imageData: ImageData
}> = function createQrCodeCanvas({ location, imageData }) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width } = imageData

  const p = location
  const left = Math.min(p[0].x, p[1].x, p[2].x, p[3].x)
  const top = Math.min(p[0].y, p[1].y, p[2].y, p[3].y)
  const right = Math.max(p[0].x, p[1].x, p[2].x, p[3].x)
  const bottom = Math.max(p[0].y, p[1].y, p[2].y, p[3].y)
  const D = (right - left + (bottom - top)) / 2
  const W = D
  const H = D

  const qrcodeImageData = ctx.createImageData(W, H)
  const a = (p[3].x - p[0].x) / W
  const b = (p[1].x - p[0].x) / H
  const c = (p[2].x + p[0].x - p[3].x - p[1].x) / (W * H)
  const d = p[0].x
  const e = (p[3].y - p[0].y) / W
  const f = (p[1].y - p[0].y) / H
  const g = (p[2].y + p[0].y - p[3].y - p[1].y) / (W * H)
  const h = p[0].y

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const index = (y * W + x) * 4
      const srcX = Math.floor(a * x + b * y + c * x * y + d)
      const srcY = Math.floor(e * x + f * y + g * x * y + h)
      const srcIndex = (srcY * width + srcX) * 4
      qrcodeImageData.data[index] = imageData.data[srcIndex]
      qrcodeImageData.data[index + 1] = imageData.data[srcIndex + 1]
      qrcodeImageData.data[index + 2] = imageData.data[srcIndex + 2]
      qrcodeImageData.data[index + 3] = imageData.data[srcIndex + 3]
    }
  }

  return (
    <ImageDataCanvas
      imageData={qrcodeImageData}
      width={qrcodeImageData.width}
      height={qrcodeImageData.height}
      style={{
        background: '#f3f4f6',
        borderRadius: 8,
        border: '1px solid #e5e7eb'
      }}
    />
  )
}

export default function HomePage() {
  const [tabIndex, setTabIndex] = useState<'image' | 'result'>('image')
  const [imageData, setImageData] = useState<ImageData | null>(null)

  const [zbarProcessResult, setZbarProcessResult] =
    useState<ZbarProcessResults>([])
  const [result, setResult] = useState('')

  return (
    <div className='w-full min-h-screen bg-gray-100'>
      <NavBar>
        <OpenImageData
          className='ml-1 px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm cursor-pointer hover:bg-gray-300 transition flex items-center gap-1 shadow'
          style={{ minWidth: 32, minHeight: 32 }}
          onLoadedImageData={(imageData) => {
            setImageData(imageData)
            const result = ZbarProcess(imageData)
            setZbarProcessResult(result)
            setResult(JSON.stringify(result, null, 4))
          }}
        >
          <AiFillPicture />
        </OpenImageData>
      </NavBar>
      <div className='w-full flex justify-center mt-6 px-3'>
        <div className='bg-white rounded shadow border w-full min-h-96'>
          <div className='border-b px-4 py-2 bg-gray-50'>
            <ul className='flex mb-2'>
              <li>
                <a
                  className={`px-4 py-2 cursor-pointer border-b-2 ${
                    tabIndex === 'image'
                      ? 'border-blue-500 text-blue-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setTabIndex('image')}
                >
                  圖片
                </a>
              </li>
              {result && (
                <li>
                  <a
                    className={`px-4 py-2 cursor-pointer border-b-2 ${
                      tabIndex === 'result'
                        ? 'border-blue-500 text-blue-600 font-semibold'
                        : 'border-transparent text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setTabIndex('result')}
                  >
                    結果
                  </a>
                </li>
              )}
            </ul>
          </div>
          {tabIndex === 'image' && (
            <div className='p-4'>
              <div className='flex items-start justify-around mt-2'>
                {imageData && (
                  <ImageDataCanvas
                    className='w-1/2 min-h-1/2'
                    imageData={imageData}
                    width={imageData.width}
                    height={imageData.height}
                    style={{
                      background: '#f3f4f6',
                      borderRadius: 8,
                      border: '1px solid #e5e7eb'
                    }}
                  />
                )}

                <div className='flex flex-wrap w-1/2 min-h-1/2'>
                  {!!zbarProcessResult.length &&
                    imageData &&
                    zbarProcessResult.map((result, index) => {
                      console.log(index, JSON.stringify(result))
                      return (
                        <ZbarResultCanvas
                          key={index}
                          imageData={imageData}
                          location={result.loc}
                        />
                      )
                    })}
                </div>
              </div>
            </div>
          )}
          {tabIndex === 'result' && (
            <div className='p-4'>
              <pre className='bg-gray-100 rounded p-2 text-sm overflow-x-auto'>
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
