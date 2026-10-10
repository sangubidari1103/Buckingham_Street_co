'use client'

import Image from 'next/image'
import { editorialImages, fallbackImage } from '@/lib/images'

export function EditorialCampaign() {
  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-midnight"
      aria-labelledby="campaign-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="campaign-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory mb-4"
          >
            Editorial Campaign
          </h2>
          <p className="text-ivory/60 text-lg leading-relaxed">
            A visual exploration of modern masculinity through the lens of
            timeless tailoring.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Campaign images"
        >
          {editorialImages.map((image, index) => (
            <article
              key={index}
              className="group relative aspect-[3/4] overflow-hidden card-hover"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover image-zoom"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImage
                  }}
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {image.caption && (
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                >
                  <p className="text-ivory/70 text-sm tracking-widest uppercase font-sans mb-1">
                    Autumn/Winter 2025
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory">
                    {image.caption}
                  </h3>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}