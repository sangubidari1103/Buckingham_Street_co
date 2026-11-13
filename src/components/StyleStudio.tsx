'use client'

import { useState, useEffect } from 'react'
import { LOOKS } from '@/config/looks'
import { RunwayCarousel } from './RunwayCarousel'
import { LookExplorer } from './LookExplorer'
import { MobileLookSheet } from './MobileLookSheet'
import { StyleShortlist } from './StyleShortlist'

interface StyleStudioProps {
  className?: string
}

export function StyleStudio({ className = '' }: StyleStudioProps) {
  const [selectedLookId, setSelectedLookId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const look = selectedLookId
    ? LOOKS.find((l) => l.id === selectedLookId)
    : undefined

  const handleSelect = (index: number) => {
    setSelectedLookId(LOOKS[index]?.id ?? null)
    setIsOpen(true)
  }

  return (
    <section
      id="style-studio"
      className={`relative w-full py-20 sm:py-28 lg:py-36 bg-ivory ${className}`}
      aria-labelledby="style-studio-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <h2
            id="style-studio-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-charcoal mb-4 tracking-tight"
          >
            The Style Studio
          </h2>
          <p className="text-charcoal/60 text-lg sm:text-xl leading-relaxed">
            Discover the art of dressing well. Explore looks curated for every
            occasion.
          </p>
        </div>

        <RunwayCarousel
          className="max-w-7xl mx-auto"
          onLookSelect={handleSelect}
        />

        {look && isOpen && !isMobile && (
          <LookExplorer
            look={look}
            open={true}
            onClose={() => {
              setIsOpen(false)
              setSelectedLookId(null)
            }}
          />
        )}
        {look && isOpen && isMobile && (
          <MobileLookSheet
            lookId={look.id}
            open={isOpen}
            onClose={() => {
              setIsOpen(false)
              setSelectedLookId(null)
            }}
          />
        )}
      </div>

      <div className="fixed bottom-8 right-8 z-40">
        <StyleShortlist />
      </div>
    </section>
  )
}
