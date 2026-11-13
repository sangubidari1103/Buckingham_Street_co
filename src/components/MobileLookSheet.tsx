'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { getLookById, type LookId } from '@/config/looks'
import { hasProduct, hasLook, addProduct, addLook, removeProduct, removeLook } from '@/lib/shortlist'
import { EnquiryManager } from './EnquiryManager'
import type { Product } from '@/lib/products'
import { fallbackImage } from '@/lib/images'

interface MobileLookSheetProps {
  lookId: LookId
  open: boolean
  onClose: () => void
}

export function MobileLookSheet({ lookId, open, onClose }: MobileLookSheetProps) {
  const look = getLookById(lookId)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!look || !open) return null

  const products = look.products.map((lp) => {
    const product = getProductById(lp.productId)
    return { ...lp, product }
  })

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      aria-modal="true"
      role="dialog"
      aria-label="Look details"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Handle */}
      <div className="mx-auto w-12 h-1.5 bg-charcoal/40 rounded-full mt-3 mb-2" />

      <div className="
        flex-1 bg-ivory
        rounded-t-3xl
        border-t border-charcoal/10
        shadow-2xl
        transform transition-transform duration-300 ease-out
        translate-y-0
      ">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gold text-xs tracking-widest uppercase font-sans font-medium">
              {look.occasion}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-charcoal/40 hover:text-charcoal"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mb-2 tracking-tight">
            {look.name}
          </h2>
          <p className="text-charcoal/60 text-sm sm:text-base leading-relaxed mb-6">
            {look.description}
          </p>

          <div className="relative aspect-[3/4] mb-6 bg-charcoal/5 rounded-xl overflow-hidden">
            <Image
              src={look.modelImage}
              alt={look.modelAlt}
              fill
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjRjNGRUVGIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiLz48dGV4dCB4PSI0MDAiIHk9IjUwMCIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjODA2MzQyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NbyBpbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='
              }}
            />
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal/50 mb-2">
              In this look
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((lp) => {
                const product = lp.product
                if (!product) return null
                const saved = mounted ? hasProduct(product.id) : false
                return (
                  <div
                    key={product.id}
                    className="flex items-start gap-3 p-3 bg-charcoal/5 rounded-lg border border-charcoal/10"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded flex-shrink-0"
                      sizes="64px"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement
                        t.src = fallbackImage
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] tracking-widest uppercase font-sans text-charcoal/50 block mb-1">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                      <h4 className="font-serif text-sm font-medium text-charcoal leading-tight">
                        {product.name}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (saved) removeProduct(product.id); else addProduct(product)
                      }}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        saved ? 'bg-maroon border-maroon text-ivory' : 'border-charcoal/20 hover:border-charcoal text-charcoal/60 hover:text-charcoal'
                      }`}
                      aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'}
                      aria-pressed={saved}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="border-t border-charcoal/10 pt-6">
            <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal/50 mb-4">
              Complete the Look
            </h3>
            <p className="text-xs text-charcoal/50 mb-4 text-center">
              Save the full outfit to enquire about it together.
            </p>
            <button
              type="button"
              onClick={() => {
                addLook(look)
              }}
              className="w-full py-3 border border-charcoal rounded-lg text-xs font-medium tracking-wider uppercase text-charcoal hover:bg-charcoal/50 transition-colors"
            >
              Save complete look to shortlist
            </button>
          </div>

          <div className="mt-8 border-t border-charcoal/10 pt-6">
            <EnquiryManager
              look={look}
              products={products.map((p) => p.product).filter((p): p is Product => !!p)}
              className=""
            />
          </div>
        </div>

        <div className="pb-6 sm:pb-8 text-center">
          <p className="text-[10px] tracking-widest uppercase text-charcoal/40">
            Swipe down to close
          </p>
        </div>
      </div>
    </div>
  )
}
