'use client'

interface OfferingItem {
  icon: React.ReactNode
  title: string
  description: string
}

const offerings: OfferingItem[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Ready-to-Wear',
    description:
      'Meticulously crafted suits, blazers, and trousers in the finest Italian and British cloths. Available in contemporary and classic fits.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Made-to-Measure',
    description:
      'A personalised tailoring experience with over 2,000 fabric options. Your measurements, your choices — crafted in our London atelier.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Bespoke Service',
    description:
      'The ultimate expression of personal style. A completely hand-crafted garment from a unique pattern, requiring multiple fittings over several months.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Shirts & Accessories',
    description:
      'Italian-woven shirts, silk ties, pocket squares, leather belts, and footwear. Every detail considered to complete your ensemble.',
  },
]

export function BrandOffering() {
  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-ivory"
      aria-labelledby="offering-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="offering-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4"
          >
            Our Offering
          </h2>
          <p className="text-midnight/60 text-lg leading-relaxed">
            From ready-to-wear to fully bespoke, every piece reflects our
            commitment to exceptional craftsmanship and enduring style.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          role="list"
          aria-label="Brand offerings"
        >
          {offerings.map((item, index) => (
            <article
              key={index}
              className="text-center p-6 hover:shadow-lg hover:shadow-midnight/5 transition-all duration-500 rounded-lg bg-white"
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-midnight/5 text-midnight mb-6 group-hover:bg-bronze group-hover:text-ivory transition-all duration-300"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-medium text-midnight mb-3">
                {item.title}
              </h3>
              <p className="text-midnight/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}