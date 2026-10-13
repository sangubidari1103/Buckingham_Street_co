import Link from 'next/link'
import { businessConfig } from '@/config/business'

export function Footer() {
  const { brand, contact, social } = businessConfig

  const hasPhone = Boolean(contact.phone)
  const hasEmail = Boolean(contact.email)
  const hasAddress = Boolean(contact.address.line1)
  const hasInstagram = Boolean(social.instagram)
  const hasFacebook = Boolean(social.facebook)

  return (
    <footer className="bg-charcoal text-ivory" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded"
              aria-label={`${brand.retail} · ${brand.parent} - Home`}
            >
              <span className="text-2xl font-serif font-medium tracking-tight">
                {brand.retail}
              </span>
              <span className="w-px h-8 bg-ivory/30" aria-hidden="true" />
              <span className="text-ivory/50 text-xs tracking-widest uppercase font-sans">
                {brand.parent}
              </span>
            </Link>
            <p className="text-ivory/50 text-sm leading-relaxed mb-6 max-w-xs">
              {brand.tagline}
            </p>
            <p className="text-ivory/40 text-xs leading-relaxed max-w-xs">
              Curated menswear for the modern gentleman. Contemporary Indian
              classics with subtle Karnataka heritage.
            </p>
          </div>

          <nav className="lg:col-span-1" aria-label="Shop navigation">
            <h3 className="text-xs tracking-widest uppercase text-ivory/50 mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections?category=formalwear"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  Suits & Blazers
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=blazers"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  Bundis
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=wedding"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  Wedding & Occasion
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=shirts"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  Shirts & Formalwear
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  All Collections
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-1" aria-label="Company navigation">
            <h3 className="text-xs tracking-widest uppercase text-ivory/50 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/our-story"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/visit-us"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  Visit Us
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-ivory/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-1" aria-label="Contact information">
            <h3 className="text-xs tracking-widest uppercase text-ivory/50 mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-sm text-ivory/70">
              {hasAddress && (
                <>
                  <p>{contact.address.line1}</p>
                  {contact.address.line2 && <p>{contact.address.line2}</p>}
                  <p>
                    {contact.address.city}{' '}
                    {contact.address.postcode &&
                      `${contact.address.postcode}`}
                  </p>
                  <p>{contact.address.country}</p>
                </>
              )}
              {!hasAddress && (
                <p className="text-ivory/40 italic">
                  Address to be configured
                </p>
              )}
              {hasPhone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="inline-block text-ivory/70 hover:text-gold transition-colors duration-200"
                >
                  {contact.phone}
                </a>
              )}
              {hasEmail && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block text-ivory/70 hover:text-gold transition-colors duration-200"
                >
                  {contact.email}
                </a>
              )}
              {!hasPhone && !hasEmail && (
                <p className="text-ivory/40 italic">
                  Contact details to be configured
                </p>
              )}
            </address>

            {(hasInstagram || hasFacebook) && (
              <div className="mt-8 flex gap-6" aria-label="Social media links">
                {hasInstagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/50 hover:text-gold transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </a>
                )}
                {hasFacebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/50 hover:text-gold transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-8 border-t border-ivory/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ivory/40 text-sm">
              &copy; {new Date().getFullYear()} {brand.retail} ·{' '}
              {brand.parent}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-ivory/40">
              <Link
                href="/privacy"
                className="hover:text-ivory transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-ivory transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-ivory transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}