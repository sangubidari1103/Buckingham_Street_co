'use client'

import Image from 'next/image'
import { ProductHotspot } from './ProductHotspot'
import { fallbackImage } from '@/lib/images'

interface RunwayModelProps {
  index: number
  total: number
  active: boolean
  angle: number // degrees per step
  radius: number
  ringRotation: number // current rotation of the ring (degrees)
  onSelect: (index: number) => void
  image: string
  alt: string
  name: string
  title: string
  hotspots: { x: number; y: number; number: number }[]
}

export function RunwayModel({
  index,
  total,
  active,
  angle,
  radius,
  ringRotation,
  onSelect,
  image,
  alt,
  name,
  title,
  hotspots,
}: RunwayModelProps) {
  // Position each model around the ring, facing the camera.
  const modelAngle = index * angle
  // Screen-facing angle after ring rotation determines depth/scale/blur.
  const screenAngle = ((ringRotation + modelAngle) % 360 + 360) % 360
  // Distance from front (0 deg): 0 = front centre, 180 = back.
  const distanceFromFront = Math.min(screenAngle, 360 - screenAngle) / 180

  const scale = 1 - distanceFromFront * 0.4 // active/front ~1, back ~0.6
  const opacity = 1 - distanceFromFront * 0.55 // front 1, back 0.45
  const blur = distanceFromFront * 8 // back models softly blurred
  const zIndex = Math.round(100 - distanceFromFront * 40)

  // Explicit dimensions so the absolute-centered model is visible and the
  // translate(-50%, -50%) centering lands at the ring centre.
  const width = 260
  const height = 340

  const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width,
    height,
    transform: `translate(-50%, -50%) rotateY(${modelAngle}deg) translateZ(${radius}px) scale(${scale})`,
    opacity,
    filter: blur > 0 ? `blur(${blur}px)` : 'none',
    zIndex,
    pointerEvents: 'auto',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    transition:
      'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.7s ease, filter 0.7s ease',
  }

  const innerStyle: React.CSSProperties = {
    transform: `rotateY(${-modelAngle}deg)`, // face camera
    transformStyle: 'preserve-3d',
  }

  return (
    <div
      className="flex items-center justify-center"
      style={style}
      aria-label={name}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(index)
        }
      }}
      onClick={() => onSelect(index)}
      data-active={active ? 'true' : 'false'}
    >
      <div
        className="
          relative w-full h-full max-w-none max-h-none
          group
          overflow-hidden rounded-xl
          border border-charcoal/20
          shadow-2xl
          bg-charcoal/5
        "
        style={innerStyle}
      >
        <div className="relative w-full h-full aspect-[3/4]">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 90vw, 320px"
            loading={active ? 'eager' : 'lazy'}
            priority={active}
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.src = fallbackImage
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent" />
          {hotspots.map((h) => (
            <ProductHotspot
              key={h.number}
              x={h.x}
              y={h.y}
              number={h.number}
              active={active}
              hovered={false}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-charcoal/80 backdrop-blur-sm">
          <p className="text-xs tracking-widest uppercase font-sans text-gold font-medium mb-1">
            {title}
          </p>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-ivory leading-tight">
            {name}
          </h3>
        </div>
      </div>
    </div>
  )
}
