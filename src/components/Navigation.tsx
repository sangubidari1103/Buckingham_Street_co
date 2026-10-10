'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { businessConfig } from '@/config/business'

const navigation = [
  { name: 'Collections', href: '/collections' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Visit Us', href: '/visit-us' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-midnight/10 shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="container-custom"
        aria-label="Main navigation"
      >
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory rounded"
              aria-label={`${businessConfig.brand.retail} · ${businessConfig.brand.parent} - Home`}
            >
              <span className="text-midnight font-serif text-xl sm:text-2xl font-medium tracking-tight">
                {businessConfig.brand.retail}
              </span>
              <span className="hidden sm:inline-block w-px h-6 bg-midnight/20" aria-hidden="true" />
              <span className="text-midnight/60 text-xs sm:text-sm tracking-widest uppercase font-sans">
                {businessConfig.brand.parent}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-200 rounded-md ${
                    pathname === item.href
                      ? 'text-bronze font-medium'
                      : 'text-midnight/70 hover:text-midnight'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/collections"
              className="hidden sm:inline-flex btn-primary text-sm"
            >
              View Collections
            </Link>

            <button
              type="button"
              className="md:hidden p-2 -ml-2 text-midnight hover:text-bronze transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="py-6 border-t border-midnight/10">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 text-sm tracking-wider uppercase transition-colors duration-200 rounded-md ${
                    pathname === item.href
                      ? 'text-bronze font-medium bg-bronze/5'
                      : 'text-midnight/70 hover:text-midnight hover:bg-midnight/5'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/collections"
                className="mx-4 mt-4 btn-primary text-center"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}