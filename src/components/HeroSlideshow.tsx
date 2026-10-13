'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface Slide {
  src: string
  alt: string
}

const slides: Slide[] = [
  {
    src: '/images/hero/slide1-suit.jpg',
    alt: 'Indian male model wearing an elegant premium formal suit, sophisticated styling with rich fabric texture',
  },
  {
    src: '/images/hero/slide2-blazer.jpg',
    alt: 'Indian male model wearing a premium blazer, distinct pose and composition, high-end menswear photography',
  },
  {
    src: '/images/hero/slide3-bundi.jpg',
    alt: 'Indian male model wearing an elegant bundi Nehru jacket, subtle Karnataka-inspired architectural details',
  },
]

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const preloadImage = useCallback((index: number) => {
    if (!preloadedImages.has(index)) {
      const img = document.createElement('img')
      img.src = slides[index].src
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(index))
      }
    }
  }, [preloadedImages])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion.current) return

    timerRef.current = setInterval(() => {
      if (!isHovered) {
        nextSlide()
      }
    }, 5000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isHovered, nextSlide])

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length
    preloadImage(nextIndex)
  }, [currentIndex, preloadImage])

  return (
    <section
      className="relative w-full min-h-[85vh] max-h-[100vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero slideshow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
    >
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            role="img"
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/50" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-ivory w-6'
                : 'bg-ivory/40 hover:bg-ivory/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-slide {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}