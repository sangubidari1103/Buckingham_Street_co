'use client'

import { businessConfig } from '@/config/business'
import { heroImage, fallbackImage } from '@/lib/images'

interface HeroProps {
  className?: string
}

export function Hero({ className = '' }: HeroProps) {
  const { brand } = businessConfig

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = fallbackImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(25,25,24,0.4)_100%)]" />
      </div>

      <div className="relative z-10 container-custom px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-2 mb-8 bg-ivory/10 backdrop-blur-sm border border-ivory/20 rounded-full animate-fade-in"
            aria-hidden="true"
          >
            <span className="text-ivory/70 text-xs tracking-widest uppercase font-sans">
              New Season
            </span>
            <span className="w-px h-4 bg-ivory/30" />
            <span className="text-ivory/70 text-xs tracking-widest uppercase font-sans">
              Autumn/Winter 2025
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-ivory leading-[1.1] mb-6 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Tailoring That{' '}
            <span className="text-bronze">Transcends</span>{' '}
            Time
          </h1>

          <p
            className="font-sans text-lg sm:text-xl lg:text-2xl text-ivory/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            British heritage craftsmanship meets Italian luxury fabrics. Each piece
            is a testament to enduring style and meticulous attention to detail.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="/collections"
              className="btn-primary w-full sm:w-auto"
            >
              Explore Collections
            </a>
            <a
              href="/visit-us"
              className="btn-secondary border-ivory text-ivory hover:bg-ivory hover:text-midnight w-full sm:w-auto"
            >
              Visit Us
            </a>
          </div>

          <div
            className="mt-16 flex items-center justify-center gap-12 text-ivory/60 animate-fade-in"
            style={{ animationDelay: '400ms' }}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-medium">1850</span>
              <span className="text-xs tracking-widest uppercase font-sans">Established</span>
            </div>
            <div className="w-px h-12 bg-ivory/20 hidden sm:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-medium">London</span>
              <span className="text-xs tracking-widest uppercase font-sans">Atelier</span>
            </div>
            <div className="w-px h-12 bg-ivory/20 hidden sm:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-medium">Bespoke</span>
              <span className="text-xs tracking-widest uppercase font-sans">Service</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6 text-ivory/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}