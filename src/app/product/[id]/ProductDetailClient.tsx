'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { businessConfig } from '@/config/business'
import { fallbackImage } from '@/lib/images'
import type { Product } from '@/lib/products'

interface ProductDetailClientProps {
  product: Product
}

function categoryFallback(category: string): string {
  const labels: Record<string, string> = {
    formalwear: 'Formal Suit',
    wedding: 'Wedding Attire',
    blazers: 'Blazer',
    accessories: 'Accessories',
    belts: 'Leather Belt',
  }
  const label = labels[category] || 'Product'
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"%3E%3Crect fill="%23F3EEE4"/%3E%3Ctext x="400" y="500" font-family="Georgia,serif" font-size="18" fill="%23806342" text-anchor="middle"%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { contact } = businessConfig
  const fallbackSrc = categoryFallback(product.category)

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the "${product.name}" from Suit Galleria. Could you please provide more information?`
  )
  const whatsappUrl = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`
    : '#'

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ivory" aria-labelledby="product-name">
      <div className="container-custom">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-midnight/60">
            <li>
              <Link href="/" className="hover:text-midnight transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/collections" className="hover:text-midnight transition-colors">
                Collections
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/collections?category=${product.category}`}
                className="hover:text-midnight transition-colors"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-midnight font-medium">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div
              className="relative aspect-[3/4] overflow-hidden bg-midnight/5 rounded-lg"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = fallbackSrc
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3" role="group" aria-label="Product images">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-bronze'
                        : 'border-transparent hover:border-midnight/20'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={selectedImage === index ? 'true' : 'false'}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = fallbackSrc
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div>
              <span className="text-bronze text-xs tracking-widest uppercase font-sans block mb-2">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
              </span>
              <h1
                id="product-name"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight leading-tight"
              >
                {product.name}
              </h1>
            </div>

            <div className="border-t border-midnight/10 pt-6">
              <p className="text-midnight/70 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.details && (
              <dl className="space-y-4 border-t border-midnight/10 pt-6">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row gap-2">
                    <dt className="text-midnight/50 text-sm font-medium sm:w-32 shrink-0">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </dt>
                    <dd className="text-midnight/80 text-sm">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {product.occasions.length > 0 && (
              <div className="border-t border-midnight/10 pt-6">
                <p className="text-midnight/50 text-sm font-medium mb-3">Suitable For</p>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((occasion) => (
                    <span
                      key={occasion}
                      className="px-3 py-1 text-xs tracking-wider uppercase font-sans text-midnight/70 bg-midnight/5 rounded-full"
                    >
                      {occasion.charAt(0).toUpperCase() + occasion.slice(1).replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-midnight/10 pt-6 space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto justify-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
                </svg>
                Enquire via WhatsApp
              </a>

              <p className="text-midnight/50 text-sm text-center">
                We&apos;ll respond within 24 hours during business days.
              </p>

              <Link
                href="/collections"
                className="btn-secondary w-full sm:w-auto justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Collections
              </Link>
            </div>

            <div className="border-t border-midnight/10 pt-6">
              <p className="text-midnight/40 text-sm italic">
                * Availability and sizing to be confirmed upon enquiry. This is a
                brand-publicity website; we do not process online orders or
                payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}