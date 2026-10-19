'use client'

import Link from 'next/link'
import Image from 'next/image'
import { categories, Category } from '@/lib/products'
import { getCategoryImage, fallbackImage } from '@/lib/images'

interface CategoryCardProps {
  category: Category
  index: number
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const categoryData = categories.find((c) => c.value === category)
  if (!categoryData) return null

  const imageSrc = getCategoryImage(category)

  return (
    <Link
      href={`/collections?category=${category}`}
      className="group relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-none card-hover"
      aria-label={`View ${categoryData.label} collection`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover image-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = fallbackImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent" />
      </div>

      <div className="relative z-10 absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <span className="text-bronze text-xs tracking-widest uppercase font-sans mb-2">
          {categoryData.label}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-ivory mb-2">
          {categoryData.label}
        </h3>
        <p className="text-ivory/70 text-sm sm:text-base max-w-xs">
          Discover our curated selection of {categoryData.label.toLowerCase()} for the
          discerning gentleman.
        </p>
        <span
          className="mt-4 inline-flex items-center gap-2 text-ivory font-medium text-sm uppercase tracking-wider group-hover:gap-3 transition-all duration-300"
        >
          View Collection
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export function FeaturedCollections() {
  const featuredCategories: Category[] = [
    'formalwear',
    'wedding',
    'blazers',
  ]

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-ivory"
      aria-labelledby="collections-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="collections-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4"
          >
            Featured Collections
          </h2>
          <p className="text-midnight/60 text-lg leading-relaxed">
            Each collection is carefully curated to reflect the pinnacle of
            menswear craftsmanship and contemporary style.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Featured collections"
        >
          {featuredCategories.map((category, index) => (
            <CategoryCard key={category} category={category} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="btn-secondary inline-flex"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  )
}