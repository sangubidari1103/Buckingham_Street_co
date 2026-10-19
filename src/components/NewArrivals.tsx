'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fallbackImage } from '@/lib/images'
import { NewArrivalProduct } from '@/types/new-arrivals'

export function NewArrivals() {
  const [products, setProducts] = useState<NewArrivalProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/public/new-arrivals')
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
      } else {
        setError('Failed to load new arrivals')
      }
    } catch {
      setError('Failed to load new arrivals')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="new-arrivals-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 id="new-arrivals-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4">
              New Arrivals
            </h2>
            <p className="text-midnight/60 text-lg leading-relaxed">
              Discover the latest additions to our collection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" aria-busy="true">
            {[...Array(3)].map((_, i) => (
              <article key={i} className="group bg-white card-hover animate-pulse">
                <div className="relative aspect-[3/4] overflow-hidden bg-midnight/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/10 to-transparent" aria-hidden="true" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-midnight/10 rounded w-3/4" />
                  <div className="h-6 bg-midnight/10 rounded w-1/2" />
                  <div className="h-4 bg-midnight/10 rounded w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="new-arrivals-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 id="new-arrivals-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4">
              New Arrivals
            </h2>
            <p className="text-midnight/60 text-lg leading-relaxed">
              Discover the latest additions to our collection.
            </p>
          </div>
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-serif text-xl text-midnight mb-2">No new arrivals yet</h3>
            <p className="text-midnight/60 mb-6">Check back soon for our latest additions.</p>
            <Link href="/collections" className="btn-secondary inline-flex">
              Browse Collections
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="new-arrivals-heading">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="new-arrivals-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4">
            New Arrivals
          </h2>
          <p className="text-midnight/60 text-lg leading-relaxed">
            Discover the latest additions to our collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="New arrivals">
          {products.map((product) => (
            <article key={product.id} className="group bg-white card-hover">
              <Link href="/collections" className="block relative aspect-[3/4] overflow-hidden" aria-label={`View ${product.name}`}>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover image-zoom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImage
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-midnight mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-midnight/60 text-sm">
                  Newly added to our collection
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/collections" className="btn-secondary inline-flex">
            View All Collections
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}