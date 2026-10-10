'use client'

import Image from 'next/image'
import { businessConfig } from '@/config/business'
import { ourStoryImages, fallbackImage } from '@/lib/images'

export function OurStoryClient() {
  const { brand } = businessConfig

  return (
    <>
      <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="story-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <h1
                id="story-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-midnight mb-6"
              >
                Our Story
              </h1>
              <p className="text-midnight/60 text-lg leading-relaxed max-w-2xl mx-auto">
                {brand.tagline}
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={ourStoryImages.atelier}
                  alt="Master tailor at work in the atelier"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImage
                  }}
                />
              </div>
              <div className="space-y-6">
                <p className="text-midnight/70 text-base leading-relaxed">
                  Buckingham Street Co. was founded on a simple principle: that
                  exceptional menswear should be accessible to the modern
                  gentleman without compromise on quality, fit, or provenance.
                </p>
                <p className="text-midnight/70 text-base leading-relaxed">
                  Our retail destination, Suit Galleria, brings together the
                  finest traditions of British tailoring — structured shoulders,
                  clean lines, and enduring silhouettes — with the luxurious
                  fabrics and relaxed elegance of Italian craftsmanship.
                </p>
                <p className="text-midnight/70 text-base leading-relaxed">
                  Every garment in our collection is selected or created with
                  meticulous attention to cloth, construction, and character. We
                  work with mills in Biella and Huddersfield, shirt-makers in
                  Naples, and accessory artisans in Florence — all brought
                  together under one roof in London.
                </p>
              </div>
            </div>

            <div className="border-t border-midnight/10 pt-16" />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-32 bg-midnight" aria-labelledby="philosophy-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <h2
                id="philosophy-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory mb-6"
              >
                Our Philosophy
              </h2>
              <p className="text-ivory/60 text-lg leading-relaxed max-w-2xl mx-auto">
                The principles that guide every decision we make.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Cloth First',
                  description:
                    'We begin with the fabric. Only the finest wools, silks, cottons, and linens from renowned mills make it into our collections.',
                },
                {
                  title: 'Construction Integrity',
                  description:
                    'Full canvas, hand-stitched lapels, working buttonholes — details that cannot be seen but are always felt.',
                },
                {
                  title: 'Enduring Style',
                  description:
                    'Trends fade; style remains. Our pieces are designed to be worn for decades, not seasons.',
                },
              ].map((item, index) => (
                <article
                  key={index}
                  className="text-center p-6 hover:bg-ivory/5 transition-colors duration-300 rounded-lg"
                >
                  <h3 className="font-serif text-xl font-medium text-ivory mb-3">
                    {item.title}
                  </h3>
                  <p className="text-ivory/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="tailoring-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h2
                  id="tailoring-heading"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight"
                >
                  The Art of Tailoring
                </h2>
                <p className="text-midnight/70 text-base leading-relaxed">
                  Whether ready-to-wear, made-to-measure, or fully bespoke, every
                  garment follows the same uncompromising standards. Our London
                  atelier is staffed by master tailors who have dedicated their
                  careers to the craft.
                </p>
                <p className="text-midnight/70 text-base leading-relaxed">
                  We believe that true luxury lies in the details: the weight of
                  the cloth, the roll of the lapel, the balance of the trouser,
                  the comfort of the fit. These are not marketing claims — they
                  are the daily practice of our workshop.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {['Full Canvas', 'Hand-Finished', 'Lifetime Alterations', 'British Wool', 'Italian Silk'].map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-xs tracking-widest uppercase font-sans text-midnight/70 bg-midnight/5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ourStoryImages.tailoring}
                  alt="Close-up of suit construction details"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImage
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-32 bg-midnight" aria-labelledby="visit-atelier-heading">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="visit-atelier-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory mb-6"
            >
              Experience It In Person
            </h2>
            <p className="text-ivory/60 text-lg leading-relaxed mb-10">
              Visit Suit Galleria to feel the cloth, discuss your needs, and
              begin your journey with Buckingham Street Co.
            </p>
            <a href="/visit-us" className="btn-primary inline-flex">
              Book an Appointment
            </a>
          </div>
        </div>
      </section>
    </>
  )
}