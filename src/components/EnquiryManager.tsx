'use client'

import Link from 'next/link'
import { openWhatsApp, buildEnquiryMessage, getWhatsAppUrl } from '@/lib/enquiry'
import type { Product } from '@/lib/products'
import type { Look } from '@/config/looks'

interface EnquiryManagerProps {
  look?: Look
  products?: Product[]
  className?: string
}

export function EnquiryManager({
  look,
  products,
  className = '',
}: EnquiryManagerProps) {
  const pageUrl =
    typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : ''
  const productNames = products?.map((p) => p.name).filter(Boolean)
  const whatsappUrl = getWhatsAppUrl()

  const handleEnquireProduct = (name: string) => {
    openWhatsApp(
      buildEnquiryMessage({
        kind: 'product',
        lookName: look?.name,
        productNames: [name],
        pageUrl,
      }),
    )
  }

  const handleEnquireLook = () => {
    if (!look) return
    openWhatsApp(
      buildEnquiryMessage({ kind: 'look', lookName: look.name, pageUrl }),
    )
  }

  const handleEnquireOutfit = () => {
    if (!productNames?.length) return
    openWhatsApp(
      buildEnquiryMessage({
        kind: 'outfit',
        lookName: look?.name,
        productNames,
        pageUrl,
      }),
    )
  }

  const waLink = (text: string) =>
    whatsappUrl
      ? `${whatsappUrl}?text=${encodeURIComponent(text)}`
      : '#'

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {products && products.length > 0 && (
        <>
          {products.map((product) => (
            <Link
              key={product.id}
              href={waLink(
                buildEnquiryMessage({
                  kind: 'product',
                  lookName: look?.name,
                  productNames: [product.name],
                  pageUrl,
                }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!whatsappUrl) e.preventDefault()
                handleEnquireProduct(product.name)
              }}
              className="btn-whatsapp w-full sm:w-auto justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
              </svg>
              Enquire about {product.name}
            </Link>
          ))}
          <div className="h-px bg-charcoal/10" />
        </>
      )}
      {look && (
        <Link
          href={waLink(buildEnquiryMessage({ kind: 'look', lookName: look.name, pageUrl }))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!whatsappUrl) e.preventDefault()
            handleEnquireLook()
          }}
          className="btn-whatsapp w-full sm:w-auto justify-center"
          aria-label="Enquire via WhatsApp"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
          </svg>
          Enquire about this look
        </Link>
      )}
      {look && products && products.length > 0 && (
        <Link
          href={waLink(
            buildEnquiryMessage({
              kind: 'outfit',
              lookName: look.name,
              productNames,
              pageUrl,
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!whatsappUrl) e.preventDefault()
            handleEnquireOutfit()
          }}
          className="btn-whatsapp w-full sm:w-auto justify-center border border-white/20"
          aria-label="Enquire about complete outfit via WhatsApp"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
          </svg>
          Enquire about complete outfit
        </Link>
      )}
    </div>
  )
}
