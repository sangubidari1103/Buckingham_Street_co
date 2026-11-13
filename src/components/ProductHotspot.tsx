'use client'

interface ProductHotspotProps {
  x: number // percentage 0-100
  y: number // percentage 0-100
  number: number
  active: boolean
  hovered: boolean
  onClick: () => void
}

export function ProductHotspot({
  x,
  y,
  number,
  active,
  hovered,
  onClick,
}: ProductHotspotProps) {
  const style: React.CSSProperties = {
    left: `${x}%`,
    top: `${y}%`,
    ...(hovered
      ? {
          boxShadow: '0 0 0 4px rgba(184, 134, 11, 0.35)',
          zIndex: 10,
        }
      : {}),
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Highlight product ${number}`}
      aria-pressed={active}
      className="
        absolute -top-3 -left-3
        flex items-center justify-center
        w-8 h-8 rounded-full border-2 border-gold
        bg-charcoal text-gold text-xs font-medium font-sans uppercase tracking-wider
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal
        active:scale-90
        ${hovered ? 'scale-[1.25]' : ''}
      "
      style={style}
      data-active={active ? 'true' : 'false'}
      data-hovered={hovered ? 'true' : 'false'}
    >
      <span className="leading-none">{number}</span>
    </button>
  )
}
