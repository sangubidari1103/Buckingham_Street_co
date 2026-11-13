'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { LOOKS } from '@/config/looks'
import { RunwayModel } from './RunwayModel'

const AUTO_PLAY_INTERVAL = 5000
const DESKTOP_RADIUS = 640
const MOBILE_RADIUS = 320

interface RunwayCarouselProps {
  className?: string
  onLookSelect?: (index: number) => void
}

export function RunwayCarousel({ className = '', onLookSelect }: RunwayCarouselProps) {
  const total = LOOKS.length
  const angle = 360 / total
  const stageRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragStartRef = useRef({ x: 0, angle: 0 })
  const rafRef = useRef<number | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [offsetAngle, setOffsetAngle] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const latest = useRef({
    goTo: (() => {}) as (index: number) => void,
    next: (() => {}) as () => void,
    prev: (() => {}) as () => void,
    resetTimer: (() => {}) as () => void,
  })
  latest.current.goTo = (index: number) => {
    const nextIdx = ((index % total) + total) % total
    setActiveIndex(nextIdx)
    setOffsetAngle(0)
    setIsDragging(false)
    latest.current.resetTimer()
  }
  latest.current.next = () => latest.current.goTo(activeIndex + 1)
  latest.current.prev = () => latest.current.goTo(activeIndex - 1)
  latest.current.resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    if (!isPlaying) return
    timerRef.current = setInterval(latest.current.next, AUTO_PLAY_INTERVAL)
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    const handler = () => checkMobile()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    latest.current.resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [isPlaying])

  const ringRotation = -activeIndex * angle + offsetAngle

  const handleInteractionPause = useCallback(() => {
    setIsDragging(false)
    setOffsetAngle(0)
    if (timerRef.current) clearInterval(timerRef.current)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      latest.current.resetTimer()
    }, AUTO_PLAY_INTERVAL)
  }, [])

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (isMobile) return
      const rect = stageRef.current?.getBoundingClientRect()
      dragStartRef.current = {
        x: e.clientX,
        angle: ringRotation,
      }
      setIsDragging(true)
      setIsPlaying(false)
      if (timerRef.current) clearInterval(timerRef.current)
    },
    [isMobile, ringRotation],
  )

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!isDragging || isMobile) return
      const dx = e.clientX - dragStartRef.current.x
      setOffsetAngle(dx * 0.25)
    },
    [isDragging, isMobile],
  )

  const endDrag = useCallback(
    (e: ReactPointerEvent) => {
      if (!isDragging || isMobile) return
      setIsDragging(false)
      setIsPlaying(true)
      const dx = e.clientX - dragStartRef.current.x
      const deltaAngle = dx * 0.25
      const rawIndex = Math.round(
        -(dragStartRef.current.angle + deltaAngle) / angle,
      )
      latest.current.goTo(rawIndex)
    },
    [isDragging, isMobile, angle],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        latest.current.prev()
        handleInteractionPause()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        latest.current.next()
        handleInteractionPause()
      }
    },
    [handleInteractionPause],
  )

  useEffect(() => {
    if (!isDragging && !isMobile) {
      window.addEventListener('pointermove', onPointerMove as unknown as EventListener)
      window.addEventListener('pointerup', endDrag as unknown as EventListener)
      window.addEventListener('pointercancel', endDrag as unknown as EventListener)
      stageRef.current?.addEventListener(
        'keydown',
        handleKeyDown as unknown as EventListener,
      )
    }
    return () => {
      window.removeEventListener(
        'pointermove',
        onPointerMove as unknown as EventListener,
      )
      window.removeEventListener('pointerup', endDrag as unknown as EventListener)
      window.removeEventListener(
        'pointercancel',
        endDrag as unknown as EventListener,
      )
      stageRef.current?.removeEventListener(
        'keydown',
        handleKeyDown as unknown as EventListener,
      )
    }
  }, [isDragging, isMobile, onPointerMove, endDrag, handleKeyDown])

  useEffect(() => {
    stageRef.current?.setAttribute('tabindex', '-1')
  }, [])

  const controls = (
    <div className="absolute inset-0 flex justify-between items-center px-6 sm:px-8 pointer-events-none z-20">
      <button
        type="button"
        onClick={latest.current.prev}
        onPointerDown={handleInteractionPause}
        className="pointer-events-auto w-10 h-10 rounded-full bg-ivory/90 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
        aria-label="Previous look"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={latest.current.next}
        onPointerDown={handleInteractionPause}
        className="pointer-events-auto w-10 h-10 rounded-full bg-ivory/90 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
        aria-label="Next look"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )

  const indicators = (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 pointer-events-auto">
      {LOOKS.map((look, i) => (
        <button
          key={look.id}
          type="button"
          onClick={() => latest.current.goTo(i)}
          onPointerDown={handleInteractionPause}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === activeIndex
              ? 'bg-charcoal w-6'
              : 'bg-charcoal/30 hover:bg-charcoal/50'
          }`}
          aria-label={`Go to ${look.title}`}
          aria-current={i === activeIndex ? 'true' : 'false'}
        >
          <span className="sr-only">{i + 1}</span>
        </button>
      ))}
    </div>
  )

  const autoplayToggle = (
    <button
      type="button"
      onClick={() => {
        setIsPlaying((p) => {
          if (!p) latest.current.resetTimer()
          return !p
        })
      }}
      className="absolute top-6 right-6 z-30 w-8 h-8 rounded-full bg-ivory/90 border border-charcoal/20 flex items-center justify-center text-charcoal text-xs hover:bg-charcoal hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
      aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
    >
      {isPlaying ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.121-2.108a1 1 0 00-1.519 1.143v7.562a1 1 0 001.519 1.143l3.121-2.108a1 1 0 000-1.686z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </button>
  )

  const sharedModelProps = {
    angle,
    radius: isMobile ? MOBILE_RADIUS : DESKTOP_RADIUS,
    ringRotation,
    onSelect: (i: number) => {
      latest.current.goTo(i)
      handleInteractionPause()
      onLookSelect?.(i)
    },
  }

  if (isMobile) {
    return (
      <section
        className={`relative w-full ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-ivory border-b border-charcoal/10">
          <span className="text-xs font-medium text-charcoal tracking-widest uppercase">
            {activeIndex + 1} / {total}
          </span>
          <div className="flex items-center gap-2">
            {autoplayToggle}
            <button
              type="button"
              onClick={latest.current.prev}
              className="w-8 h-8 rounded border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal/50 transition-colors"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={latest.current.next}
              className="w-8 h-8 rounded border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal/50 transition-colors"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={stageRef}
          className="w-full overflow-x-hidden px-4"
          onPointerDown={startDrag}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="flex gap-4"
            style={{
              transform: `translateX(${
                -((activeIndex / total) * 100).toFixed(4) +
                (offsetAngle * (100 / 360)).toFixed(4)
              }%)`,
              transition: isDragging
                ? 'none'
                : 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
              willChange: 'transform',
            }}
          >
            {LOOKS.map((look) => (
              <div
                key={look.id}
                className="flex-shrink-0 w-[calc(100%-16px)] md:w-[calc(50%-16px)]"
              >
                <RunwayModel
                  {...sharedModelProps}
                  index={LOOKS.indexOf(look)}
                  total={total}
                  active={LOOKS.indexOf(look) === activeIndex}
                  image={look.modelImage}
                  alt={look.modelAlt}
                  name={look.name}
                  title={look.title}
                  hotspots={look.products.map((p) => ({
                    x: p.hotspot.x,
                    y: p.hotspot.y,
                    number: p.number,
                  }))}
                />
              </div>
            ))}
          </div>
        </div>
        {indicators}
      </section>
    )
  }

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full perspective-[1200px]" ref={stageRef}>
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateX(8deg) rotateY(${ringRotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
            willChange: isDragging ? 'auto' : 'transform',
          }}
        >
          {LOOKS.map((look) => (
            <RunwayModel
              {...sharedModelProps}
              key={look.id}
              index={LOOKS.indexOf(look)}
              total={total}
              active={LOOKS.indexOf(look) === activeIndex}
              image={look.modelImage}
              alt={look.modelAlt}
              name={look.name}
              title={look.title}
              hotspots={look.products.map((p) => ({
                x: p.hotspot.x,
                y: p.hotspot.y,
                number: p.number,
              }))}
            />
          ))}
        </div>
      </div>
      {controls}
      {indicators}
      {autoplayToggle}
    </section>
  )
}
