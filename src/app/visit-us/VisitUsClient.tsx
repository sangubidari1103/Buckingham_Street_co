'use client'

import { businessConfig } from '@/config/business'

export function VisitUsClient() {
  const { brand, contact, hours } = businessConfig

  const hasAddress = Boolean(contact.address.line1)
  const hasPhone = Boolean(contact.phone)
  const hasWhatsApp = Boolean(contact.whatsapp)
  const hasEmail = Boolean(contact.email)
  const hasMapsUrl = Boolean(contact.mapsUrl)
  const hasMapsEmbedUrl = Boolean(contact.mapsEmbedUrl)
  const hasReviewsUrl = Boolean(contact.reviewsUrl)

  const hasAnyHours = Object.values(hours).some(Boolean)

  return (
    <>
      <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="visit-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <h1
                id="visit-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-midnight mb-6"
              >
                Visit Us
              </h1>
              <p className="text-midnight/60 text-lg leading-relaxed max-w-2xl mx-auto">
                Experience the cloth, discuss your requirements, and begin your
                journey with Buckingham Street Co. at our Suit Galleria showroom.
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-midnight mb-4">
                    Location
                  </h2>
                  {hasAddress ? (
                    <address className="not-italic space-y-3 text-midnight/70 leading-relaxed">
                      <p className="font-medium">{contact.address.line1}</p>
                      {contact.address.line2 && <p>{contact.address.line2}</p>}
                      <p>
                        {contact.address.city}{' '}
                        {contact.address.postcode && contact.address.postcode}
                      </p>
                      <p>{contact.address.country}</p>
                    </address>
                  ) : (
                    <div className="p-6 bg-midnight/5 rounded-lg border border-midnight/10">
                      <p className="text-midnight/60 italic">
                        Shop address to be configured in{' '}
                        <code className="not-italic font-mono text-xs bg-midnight/10 px-1.5 py-0.5 rounded">
                          src/config/business.ts
                        </code>
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-medium text-midnight mb-4">
                    Contact
                  </h2>
                  <dl className="space-y-4">
                    {hasPhone && (
                      <div className="flex items-start gap-4">
                        <dt className="text-midnight/50 text-sm font-medium shrink-0 w-24">
                          Phone
                        </dt>
                        <dd>
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className="text-midnight/80 hover:text-bronze transition-colors"
                          >
                            {contact.phone}
                          </a>
                        </dd>
                      </div>
                    )}
                    {hasWhatsApp && (
                      <div className="flex items-start gap-4">
                        <dt className="text-midnight/50 text-sm font-medium shrink-0 w-24">
                          WhatsApp
                        </dt>
                        <dd>
                          <a
                            href={`https://wa.me/${contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-midnight/80 hover:text-bronze transition-colors flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
                            </svg>
                            Chat on WhatsApp
                          </a>
                        </dd>
                      </div>
                    )}
                    {hasEmail && (
                      <div className="flex items-start gap-4">
                        <dt className="text-midnight/50 text-sm font-medium shrink-0 w-24">
                          Email
                        </dt>
                        <dd>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-midnight/80 hover:text-bronze transition-colors"
                          >
                            {contact.email}
                          </a>
                        </dd>
                      </div>
                    )}
                    {!hasPhone && !hasWhatsApp && !hasEmail && (
                      <p className="text-midnight/50 italic">
                        Contact details to be configured
                      </p>
                    )}
                  </dl>
                </div>

                {hasAnyHours && (
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-midnight mb-4">
                      Opening Hours
                    </h2>
                    <dl className="space-y-3">
                      {Object.entries(hours).map(([day, time]) => (
                        time && (
                          <div
                            key={day}
                            className="flex justify-between text-sm"
                          >
                            <dt className="text-midnight/50 capitalize">
                              {day}
                            </dt>
                            <dd className="text-midnight/80 font-medium">
                              {time}
                            </dd>
                          </div>
                        )
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-midnight/5">
                {hasMapsEmbedUrl ? (
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
                      <p className="text-midnight/50 mb-2">Google Maps embed</p>
                      <p className="text-midnight/40 text-sm">
                        Add embed URL to <code className="not-italic font-mono text-xs bg-midnight/10 px-1.5 py-0.5 rounded">mapsEmbedUrl in src/config/business.ts</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-midnight/10 pt-12">
              <h2 className="font-serif text-2xl font-medium text-midnight mb-6 text-center">
                Directions & Reviews
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {hasMapsUrl ? (
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Get Directions
                  </a>
                ) : (
                  <button type="button" className="btn-secondary opacity-50 cursor-not-allowed" disabled>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Get Directions (Configure URL)
                  </button>
                )}

                {hasReviewsUrl ? (
                  <a
                    href={contact.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Google Reviews
                  </a>
                ) : (
                  <button type="button" className="btn-secondary opacity-50 cursor-not-allowed" disabled>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Google Reviews (Configure URL)
                  </button>
                )}
              </div>

              {!hasMapsUrl || !hasReviewsUrl ? (
                <p className="text-center text-midnight/50 text-sm mt-6">
                  Configure Maps and Reviews URLs in{' '}
                  <code className="not-italic font-mono text-xs bg-midnight/10 px-1.5 py-0.5 rounded">
                    src/config/business.ts
                  </code>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-32 bg-midnight" aria-labelledby="appointment-heading">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="appointment-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory mb-6"
            >
              Book a Private Appointment
            </h2>
            <p className="text-ivory/60 text-lg leading-relaxed mb-10">
              For a dedicated consultation with our tailoring experts, please
              contact us to arrange a private appointment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {hasPhone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="btn-primary"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call to Book
                </a>
              )}
              {hasWhatsApp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hello, I would like to book a private appointment at Suit Galleria.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.43 3.43 0 01-.388-.387 4.41 4.41 0 00-.524-.523 12.26 12.26 0 01-.174-.57 4.11 4.11 0 00-.124-.423 3.24 3.24 0 00-.498-1.257 11.6 11.6 0 00-3.594-3.83 3.45 3.45 0 01-.014-.72c0-.32.099-.617.323-.868.099-.101.2-.224.324-.348.249-.25.65-.65.892-.773.24-.125.447-.2.72-.174.297.026 1.07.273 1.445.72.272.323.471.697.622 1.02.136.295.21.688.173 1.075-.038.388-.21.773-.524 1.02-.324.273-.814.65-1.134 1.074-.32.424-.423.82-.497 1.02-.074.201-.074.398-.074.596 0 .199.037.422.101.62.06.173.198.47.42.696.445.47 1.19 1.017 1.487 1.164.423.22 1.074.194 1.473-.074.372-.25.696-.622.868-.916.173-.297.198-.643.198-1.02 0-.348-.099-.772-.248-1.075" />
                  </svg>
                  WhatsApp to Book
                </a>
              )}
              {!hasPhone && !hasWhatsApp && (
                <p className="text-ivory/50 text-sm italic">
                  Configure contact details to enable booking actions
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}