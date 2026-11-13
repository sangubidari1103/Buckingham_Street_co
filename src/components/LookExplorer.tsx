'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getProductById } from '@/lib/products'
import { hasProduct, addProduct, removeProduct, addLook, hasLook } from '@/lib/shortlist'
import { ProductHotspot } from './ProductHotspot'
import { EnquiryManager } from './EnquiryManager'
import type { Look } from '@/config/looks'
import type { Product } from '@/lib/products'
import { fallbackImage } from '@/lib/images'

interface LookExplorerProps {
  look: Look
  open: boolean
  onClose: () => void
}

export function LookExplorer({ look, open, onClose }: LookExplorerProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // select first product's hotspot on open
    if (look.products.length > 0) {
      setSelectedProductId(look.products[0].productId)
    }
  }, [look, open])

  const products = look.products.map((lp) => {
    const product = getProductById(lp.productId)
    return { ...lp, product }
  })

  const selected = products.find((p) => p.product?.id === selectedProductId)
  const hotspot = selected ? look.products.find((p) => p.productId === selectedProductId) : null

  const isProductSaved = (id: string) =>
    mounted ? hasProduct(id) : false
  const isLookSaved = mounted ? (look ? hasLook(look.id) : false) : false

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleClose])

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          aria-modal="true"
          role="dialog"
          aria-label="Look details"
        >
          <div
            className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Model image + hotspots */}
            <div
              ref={containerRef}
              className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-charcoal/40 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-40 text-ivory/70 hover:text-ivory"
                aria-label="Close look"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div
                className="relative w-full max-w-2xl aspect-[3/4] rounded-xl overflow-hidden border border-ivory/20 bg-charcoal shadow-2xl transform scale-100"
                style={
                  open ? { opacity: 1, transform: 'scale(1)' } : { opacity: 0, transform: 'scale(0.95)' }
                }
              >
                <Image
                  src={look.modelImage}
                  alt={look.modelAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                  onError={(e) => {
                    const t = e.target as HTMLImageElement
                    t.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjRjNGRUVGIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiLz48dGV4dCB4PSI0MDAiIHk9IjUwMCIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjODA2MzQyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NbyBpbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent pointer-events-none" />
                {look.products.map((p) => {
                  const product = getProductById(p.productId)
                  const active = p.productId === selectedProductId
                  const saved = isProductSaved(p.productId)
                  return (
                    <ProductHotspot
                      key={p.number}
                      x={p.hotspot.x}
                      y={p.hotspot.y}
                      number={p.number}
                      active={active}
                      hovered={hoveredHotspot === p.number}
                      onClick={() => setSelectedProductId(p.productId)}
                    />
                  )
                })}
              </div>
            </div>

            {/* Product details panel */}
            <div className="flex-1 lg:w-96 overflow-y-auto p-8 lg:p-12 bg-ivory text-charcoal">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gold text-xs tracking-widest uppercase font-sans font-medium">
                  {look.occasion}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    addLook(look)
                  }}
                  className={`flex items-center gap-2 text-xs font-medium tracking-wider uppercase transition-colors ${
                    isLookSaved ? 'text-maroon' : 'text-charcoal/60 hover:text-charcoal'
                  }`}
                  aria-pressed={isLookSaved}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {isLookSaved ? 'Look saved' : 'Save look'}
                </button>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mb-2 tracking-tight">
                {look.name}
              </h2>
              <p className="text-charcoal/60 text-sm sm:text-base leading-relaxed mb-6">
                {look.description}
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal/50 mb-3">
                  In this look
                </h3>
                <div className="space-y-2">
                  {products.map((lp) => {
                    const product = lp.product
                    if (!product) return null
                    const active = lp.productId === selectedProductId
                    const saved = isProductSaved(product.id)
                    return (
                      <div
                        key={product.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          active
                            ? 'bg-charcoal/40 border-gold/50'
                            : 'border-transparent hover:bg-charcoal/10 hover:border-charcoal/20'
                        } group`}
                        onClick={() => setSelectedProductId(product.id)}
                        onMouseEnter={() => setHoveredHotspot(lp.number)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedProductId(product.id)
                          }
                        }}
                        aria-label={`View ${product.name}`}
                        data-hotspot-number={lp.number}
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-18 object-cover rounded flex-shrink-0"
                          sizes="56px"
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
                          {saved ? (
                            <span className="text-[10px] text-maroon font-medium mt-1 block">
                              Saved to shortlist
                            </span>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (saved) removeProduct(product.id)
                            else addProduct(product)
                          }}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                            saved
                              ? 'bg-maroon border-maroon text-ivory'
                              : 'border-charcoal/20 hover:border-charcoal text-charcoal/60 hover:text-charcoal'
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

              {selected && selected!.product! ? (
                <>
                  <div className="border-t border-charcoal/10 pt-6 mb-6">
                    <Image
                      src={selected!.product!.images[0]}
                      alt={selected!.product!.name}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                      sizes="(max-width: 640px) 100vw, 300px"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement
                        t.src = selected!.product!.images[0]
                      }}
                    />
                    <span className="text-[10px] tracking-widest uppercase font-sans text-charcoal/50 block mb-1">
                      {selected!.product!.category.charAt(0).toUpperCase() + selected!.product!.category.slice(1)}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal mb-2">
                      {selected!.product!.name}
                    </h3>
                    {selected!.product!.description && (
                      <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                        {selected!.product!.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (isProductSaved(selected!.product!.id))
                            removeProduct(selected!.product!.id)
                          else addProduct(selected!.product!)
                        }}
                        className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                          isProductSaved(selected!.product!.id)
                            ? 'bg-maroon border-maroon text-ivory'
                              : 'border-charcoal/20 hover:border-charcoal text-charcoal/60 hover:text-charcoal'
                        }`}
                        aria-label={
                          isProductSaved(selected!.product!.id)
                            ? 'Remove from shortlist'
                            : 'Save to shortlist'
                        }
                        aria-pressed={isProductSaved(selected!.product!.id)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <a
                        href={`https://wa.me/${''}?text=${encodeURIComponent(
                          `Hello Suit Galleria · Buckingham Street Co., I would like to enquire about the "${selected!.product!.name}" from the "${look.name}" look.`
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

                  <div className="mt-8 border-t border-charcoal/10 pt-6">
                    <EnquiryManager
                      look={look}
                      products={products
                        .map((p) => p.product)
                        .filter((p): p is Product => !!p)}
                      className=""
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
