'use client'

import {
  getShortlist,
  addProduct,
  addLook,
  removeProduct,
  removeLook,
  clearShortlist,
  shortlistCount,
  buildShortlistWhatsappMessage,
  type ShortlistItem,
} from '@/lib/shortlist'
import { getProductById } from '@/lib/products'
import { getLookById } from '@/config/looks'
import { openWhatsApp } from '@/lib/enquiry'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

export function StyleShortlist() {
  const [shortlist, setShortlist] = useState<{
    products: ShortlistItem[]
    looks: ShortlistItem[]
  }>({ products: [], looks: [] })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setShortlist(getShortlist())
  }, [])

  const pageUrl =
    typeof window !== 'undefined' ? window.location.origin : ''

  const handleEnquireShortlist = useCallback(() => {
    const message = buildShortlistWhatsappMessage(shortlist, pageUrl)
    openWhatsApp(message)
  }, [shortlist, pageUrl])

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const count = shortlist.products.length + shortlist.looks.length

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="
          inline-flex items-center gap-2
          px-4 py-2 text-xs font-medium tracking-wider uppercase
          text-charcoal bg-ivory border border-charcoal/20
          hover:bg-charcoal hover:text-ivory transition-all duration-200
          rounded-lg
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon
        "
        aria-label="View style shortlist"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
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
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Style Shortlist
        {count > 0 && (
          <span className="ml-2 flex items-center justify-center w-5 h-5 min-w-5 rounded-full bg-maroon text-ivory text-[10px] font-bold">
            {count}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-charcoal/80 backdrop-blur-sm
          "
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
        >
          <div className="
            relative w-full max-w-lg mx-auto p-6 sm:p-8
            bg-ivory text-charcoal rounded-lg
            animate-slide-up
          ">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-charcoal/60 hover:text-charcoal"
              aria-label="Close shortlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-6">
              Your Style Shortlist
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              This is an enquiry shortlist, not a shopping cart or order.
              Select pieces to enquire about via WhatsApp.
            </p>

            <div className="space-y-4 mb-8">
              {shortlist.looks.length > 0 && (
                <>
                  <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal/50 mb-3">
                    Saved Looks
                  </h3>
                  <div className="space-y-3">
                    {shortlist.looks.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4"
                      >
                        <Image
                            src={item.image ?? ''}
                          alt=""
                          fill
                          className="w-16 h-20 object-cover rounded"
                          sizes="64px"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement
                            t.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjRjNGRUVGIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiLz48dGV4dCB4PSI0MDAiIHk9IjUwMCIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjODA2MzQyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NbyBpbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-maroon uppercase tracking-wider">
                              Look
                            </span>
                            <span className="text-xs text-charcoal/40 ml-auto">
                              Enquire via WhatsApp
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-medium text-charcoal truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-charcoal/60 truncate">
                            {item.occasion}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShortlist(removeLook(item.id))
                          }}
                          className="text-charcoal/40 hover:text-maroon"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {shortlist.products.length > 0 && (
                <>
                  <h3 className="text-xs tracking-widest uppercase font-sans text-charcoal/50 mb-3">
                    Saved Pieces
                  </h3>
                  <div className="space-y-3">
                    {shortlist.products.map((item) => {
                      const product = getProductById(item.id)
                      return (
                        <div key={item.id} className="flex items-center gap-4">
                          <Image
                            src={item.image || (product?.images[0] ?? '')}
                            alt=""
                            fill
                            className="w-16 h-20 object-cover rounded"
                            sizes="64px"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement
                              t.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjRjNGRUVGIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiLz48dGV4dCB4PSI0MDAiIHk9IjUwMCIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjODA2MzQyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NbyBpbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-maroon uppercase tracking-wider">
                                Piece
                              </span>
                              <span className="text-xs text-charcoal/40 ml-auto">
                                Enquire via WhatsApp
                              </span>
                            </div>
                            <h4 className="font-serif text-base font-medium text-charcoal truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-charcoal/60 truncate">
                              {item.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setShortlist(removeProduct(item.id))
                            }}
                            className="text-charcoal/40 hover:text-maroon"
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
              {(shortlist.products.length === 0 && shortlist.looks.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-charcoal/50 text-sm italic">
                    Your shortlist is empty.
                  </p>
                </div>
              )}
            </div>

            {count > 0 && (
              <div className="border-t border-charcoal/20 pt-6">
                <button
                  type="button"
                  onClick={handleEnquireShortlist}
                  className="btn-whatsapp w-full justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
                  </svg>
                  Enquire via WhatsApp ({count} item{count !== 1 ? 's' : ''})
                </button>
                <p className="mt-3 text-center text-xs text-charcoal/50">
                  We'll respond within 24 hours during business days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShortlist(clearShortlist())
                  }}
                  className="mt-4 text-xs text-charcoal/50 hover:text-charcoal underline"
                >
                  Clear shortlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
