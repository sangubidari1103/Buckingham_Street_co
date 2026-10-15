'use client'

import { businessConfig } from '@/config/business'

export function VisitUsCTA() {
  const { contact, brand } = businessConfig

  const hasAddress = Boolean(contact.address.line1)
  const hasPhone = Boolean(contact.phone)
  const hasWhatsApp = Boolean(contact.whatsapp)

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-ivory"
      aria-labelledby="visit-heading"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2
                id="visit-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4"
              >
                Visit Our Showroom
              </h2>
              <p className="text-midnight/60 text-lg leading-relaxed mb-8">
                Experience the cloth, feel the weight, and discuss your requirements
                with our knowledgeable team. Private appointments available.
              </p>

              {hasAddress && (
                <address className="not-italic space-y-4 mb-8">
                  <p className="font-medium text-midnight">{contact.address.line1}</p>
                  {contact.address.line2 && (
                    <p className="text-midnight/70">{contact.address.line2}</p>
                  )}
                  <p className="text-midnight/70">
                    {contact.address.city}{' '}
                    {contact.address.postcode && contact.address.postcode}
                  </p>
                  <p className="text-midnight/70">{contact.address.country}</p>
                </address>
              )}

              {!hasAddress && (
                <div className="mb-8 p-6 bg-midnight/5 rounded-lg border border-midnight/10">
                  <p className="text-midnight/60 italic">
                    Shop address to be configured in <code className="not-italic font-mono text-xs bg-midnight/10 px-1.5 py-0.5 rounded">src/config/business.ts</code>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {hasPhone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="btn-primary w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us
                  </a>
                )}
                {hasWhatsApp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
                    </svg>
                    WhatsApp
                  </a>
                )}
                {!hasPhone && !hasWhatsApp && (
                  <div className="text-midnight/50 text-sm italic">
                    Contact actions will appear once configured
                  </div>
                )}
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-midnight/5">
              {contact.mapsEmbedUrl ? (
                <iframe
                  src={contact.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${brand.retail} location`}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-midnight/5 border border-midnight/10">
                  <div className="text-center p-6">
                    <svg className="w-16 h-16 mx-auto mb-4 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-midnight/50">
                      Google Maps embed will appear once configured
                    </p>
                    <p className="text-midnight/40 text-sm mt-1">
                      Add maps embed URL to <code className="not-italic font-mono text-xs bg-midnight/10 px-1.5 py-0.5 rounded">src/config/business.ts</code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}