'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { getLookById, type LookId } from '@/config/looks'
import { hasProduct, addProduct, removeProduct, addLook, hasLook } from '@/lib/shortlist'
import { EnquiryManager } from './EnquiryManager'
import { fallbackImage } from '@/lib/images'

interface LookDetailsProps {
  lookId: LookId
  selectedProductId: string | null
  onSelectProduct: (productId: string | null) => void
}

export function LookDetails({
  lookId,
  selectedProductId,
  onSelectProduct,
}: LookDetailsProps) {
  const look = getLookById(lookId)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const products = look
    ? look.products.map((lp) => {
        const product = getProductById(lp.productId)
        return { ...lp, product }
      })
    : []

  const currentIndex =
    selectedProductId != null
      ? (look?.products.findIndex((p) => p.productId === selectedProductId) ??
          -1) +
        1
      : 0

  const selected = products.find((p) => p.product?.id === selectedProductId)
  const product = selected?.product

  const toggleProduct = useCallback(
    (pid: string) => {
      const p = getProductById(pid)
      if (!p) return
      if (mounted ? hasProduct(pid) : false) {
        removeProduct(pid)
      } else {
        addProduct(p)
      }
    },
    [mounted],
  )

  const isProductSaved = mounted ? (product ? hasProduct(product.id) : false) : false
  const isLookSaved = mounted ? (look ? hasLook(look.id) : false) : false

  if (!look) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gold text-xs tracking-widest uppercase font-sans font-medium">
          {look.occasion}
        </span>
        <span className="text-xs text-charcoal/40 font-sans tracking-widest uppercase">
          Look {currentIndex > 0 ? currentIndex : '–'} of {look.products.length}
        </span>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal tracking-tight">
        {look.name}
      </h2>
      <p className="text-charcoal/60 text-sm sm:text-base leading-relaxed mb-6">
        {look.description}
      </p>

      {product ? (
        <>
          <div className="relative aspect-[3/4] mb-4 bg-charcoal/5 rounded-xl overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 320px"
              priority
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.src = fallbackImage
              }}
            />
          </div>

          <div className="mb-6">
            <span className="text-[10px] tracking-widest uppercase font-sans text-charcoal/50 block mb-1">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal mb-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                {product.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => toggleProduct(product.id)}
                className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                  isProductSaved
                    ? 'bg-maroon border-maroon text-ivory'
                    : 'border-charcoal/20 hover:border-charcoal text-charcoal/60 hover:text-charcoal'
                }`}
                aria-label={isProductSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                aria-pressed={isProductSaved}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <a
                href={`https://wa.me/${''}?text=${encodeURIComponent(
                  `Hello Suit Galleria · Buckingham Street Co., I would like to enquire about the "${product.name}" from the "${look.name}" look.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
                </svg>
                Enquire about this piece
              </a>
            </div>
          </div>

          <div className="border-t border-charcoal/10 pt-6">
            <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal/50 mb-3">
              Complete the Look
            </h3>
            <p className="text-xs text-charcoal/50 mb-4 text-center">
              Save the full outfit to enquire about it together.
            </p>
            <button
              type="button"
              onClick={() => addLook(look)}
              className="w-full py-3 border border-charcoal rounded-lg text-xs font-medium tracking-wider uppercase text-charcoal hover:bg-charcoal/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              disabled={isLookSaved}
            >
              {isLookSaved ? 'Look saved to shortlist' : 'Save complete look to shortlist'}
            </button>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center rounded-xl bg-charcoal/5 border border-charcoal/10">
          <p className="text-charcoal/40 text-sm">Select a product to view details.</p>
        </div>
      )}
    </div>
  )
}
