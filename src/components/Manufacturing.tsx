'use client'

import { businessConfig } from '@/config/business'

export function Manufacturing() {
  const { brand } = businessConfig

  const manufacturingInfo = {
    atelier: {
      title: 'London Atelier',
      description:
        'Our flagship atelier on Savile Row houses master tailors with decades of experience. Every bespoke garment is cut and assembled by hand in this historic workshop.',
      details: [
        'Master tailors with 20+ years experience',
        'Traditional hand-cut patterns',
        'Multiple fittings for perfect fit',
        '3–6 month lead time for bespoke',
      ],
    },
    partners: {
      title: 'Manufacturing Partners',
      description:
        'We collaborate with select workshops in Italy and the UK for our ready-to-wear and made-to-measure collections. Each partner is chosen for their expertise in specific garment types.',
      details: [
        'Italian mills: Vitale Barberis Canonico, Loro Piana',
        'UK wool: Huddersfield Fine Worsteds',
        'Shirt-making: Naples, Italy',
        'Accessories: Florence, Italy',
      ],
    },
    quality: {
      title: 'Quality Standards',
      description:
        'Every garment undergoes rigorous quality control at each stage of production. We stand behind the craftsmanship of every piece that bears our name.',
      details: [
        'Hand-stitched lapels and buttonholes',
        'Full canvas construction on suits',
        'Mother-of-pearl buttons on shirts',
        'Lifetime alteration guarantee on bespoke',
      ],
    },
  }

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-midnight"
      aria-labelledby="manufacturing-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="manufacturing-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory mb-4"
          >
            Craftsmanship & Manufacturing
          </h2>
          <p className="text-ivory/60 text-lg leading-relaxed">
            Transparency in our making process. From the ateliers of London to the
            mills of Biella, every step is deliberate.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          role="list"
          aria-label="Manufacturing information"
        >
          {Object.entries(manufacturingInfo).map(([key, section], index) => (
            <article
              key={key}
              className="p-6 sm:p-8 bg-ivory/5 rounded-lg border border-ivory/10 hover:border-bronze/30 transition-colors duration-300"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-ivory mb-4">
                {section.title}
              </h3>
              <p className="text-ivory/60 text-sm sm:text-base leading-relaxed mb-6">
                {section.description}
              </p>
              <ul className="space-y-3" role="list">
                {section.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-start gap-3 text-ivory/70 text-sm"
                  >
                    <span
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-bronze mt-2"
                      aria-hidden="true"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-ivory/40 text-sm italic max-w-2xl mx-auto">
            Specific manufacturing capacities, certifications, and partner details
            will be added once verified. This section is structured to accommodate
            that information seamlessly.
          </p>
        </div>
      </div>
    </section>
  )
}