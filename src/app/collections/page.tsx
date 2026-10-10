'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { products, categories, occasions, filterProducts, type Category, type Occasion } from '@/lib/products'
import { fallbackImage } from '@/lib/images'

function categoryFallback(category: string): string {
  const labels: Record<string, string> = {
    formalwear: 'Formal Suit',
    wedding: 'Wedding Attire',
    blazers: 'Blazer',
    shirts: 'Dress Shirt',
    'smart-casual': 'Smart Casual',
    accessories: 'Accessories',
    belts: 'Leather Belt',
  }
  const label = labels[category] || 'Product'
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23F3EEE4"/%3E%3Ctext x="200" y="250" font-family="Georgia,serif" font-size="14" fill="%23806342" text-anchor="middle"%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`
}

function CollectionsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialCategory = (searchParams.get('category') as Category) || undefined
  const initialOccasion = (searchParams.get('occasion') as Occasion) || undefined

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(initialCategory)
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | undefined>(initialOccasion)

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedOccasion) params.set('occasion', selectedOccasion)
    router.replace(`/collections?${params.toString()}`, { scroll: false })
  }, [selectedCategory, selectedOccasion, router])

  const filteredProducts = useMemo(
    () => filterProducts(selectedCategory, selectedOccasion),
    [selectedCategory, selectedOccasion]
  )

  const hasActiveFilters = selectedCategory || selectedOccasion

  const handleCategoryChange = (category: Category | undefined) => {
    setSelectedCategory(category)
  }

  const handleOccasionChange = (occasion: Occasion | undefined) => {
    setSelectedOccasion(occasion)
  }

  const clearFilters = () => {
    setSelectedCategory(undefined)
    setSelectedOccasion(undefined)
  }

  return (
    <main id="main-content" role="main" className="pt-16 sm:pt-20">
      <section className="py-16 sm:py-24 bg-ivory" aria-labelledby="collections-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1
              id="collections-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-midnight mb-4"
            >
              Collections
            </h1>
            <p className="text-midnight/60 text-lg leading-relaxed">
              Explore our curated menswear collections. Filter by category or
              occasion to find exactly what you need.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="category-filter"
                  className="block text-sm font-medium text-midnight mb-3"
                >
                  Category
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(undefined)}
                    className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-200 rounded-full ${
                      !selectedCategory
                        ? 'bg-midnight text-ivory'
                        : 'bg-transparent text-midnight/70 border border-midnight/20 hover:border-midnight hover:text-midnight'
                    }`}
                    aria-pressed={!selectedCategory}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-200 rounded-full ${
                        selectedCategory === cat.value
                          ? 'bg-midnight text-ivory'
                          : 'bg-transparent text-midnight/70 border border-midnight/20 hover:border-midnight hover:text-midnight'
                      }`}
                      aria-pressed={selectedCategory === cat.value}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="occasion-filter"
                  className="block text-sm font-medium text-midnight mb-3"
                >
                  Occasion
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Occasion filters">
                  <button
                    type="button"
                    onClick={() => handleOccasionChange(undefined)}
                    className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-200 rounded-full ${
                      !selectedOccasion
                        ? 'bg-midnight text-ivory'
                        : 'bg-transparent text-midnight/70 border border-midnight/20 hover:border-midnight hover:text-midnight'
                    }`}
                    aria-pressed={!selectedOccasion}
                  >
                    All
                  </button>
                  {occasions.map((occ) => (
                    <button
                      key={occ.value}
                      type="button"
                      onClick={() => handleOccasionChange(occ.value)}
                      className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-200 rounded-full ${
                        selectedOccasion === occ.value
                          ? 'bg-midnight text-ivory'
                          : 'bg-transparent text-midnight/70 border border-midnight/20 hover:border-midnight hover:text-midnight'
                      }`}
                      aria-pressed={selectedOccasion === occ.value}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 text-sm font-medium text-bronze hover:text-bronze/80 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Products"
            >
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group bg-white card-hover"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block relative aspect-[3/4] overflow-hidden"
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover image-zoom"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = categoryFallback(product.category)
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <div className="p-6">
                    <span className="text-bronze text-xs tracking-widest uppercase font-sans mb-2 block">
                      {categories.find((c) => c.value === product.category)?.label}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-midnight mb-2">
                      {product.name}
                    </h3>
                    <p className="text-midnight/60 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <Link
                      href={`/product/${product.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bronze hover:text-bronze/80 transition-colors"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto mb-4 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="font-serif text-2xl text-midnight mb-2">No products found</h2>
              <p className="text-midnight/60 mb-6">Try adjusting your filters or browse all collections.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function CollectionsPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bronze" /></div>}>
        <CollectionsContent />
      </Suspense>
      <Footer />
    </>
  )
}