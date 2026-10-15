'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { businessConfig } from '@/config/business'
import { categories, type Category } from '@/lib/products'

interface MegaMenuItem {
  label: string
  href: string
  isActive?: boolean
}

interface MegaMenuColumn {
  title: string
  items: MegaMenuItem[]
}

interface MegaMenuContent {
  [key: string]: MegaMenuColumn[]
}

const buildCollectionsMegaMenu = (): MegaMenuColumn[] => {
  const filteredCategories = categories.filter(
    (cat) => cat.value === 'formalwear' || cat.value === 'wedding' || cat.value === 'blazers'
  )

  return [
    {
      title: 'Categories',
      items: filteredCategories.map((cat) => ({
        label: cat.label,
        href: `/collections?category=${cat.value}`,
      })),
    },
    {
      title: 'By Occasion',
      items: [
        { label: 'Business', href: '/collections?occasion=business' },
        { label: 'Wedding', href: '/collections?occasion=wedding' },
        { label: 'Black Tie', href: '/collections?occasion=black-tie' },
        { label: 'Cocktail', href: '/collections?occasion=cocktail' },
      ],
    },
  ]
}

const collectionsMegaMenuData = buildCollectionsMegaMenu()

const megaMenuData: MegaMenuContent = {
  collections: collectionsMegaMenuData,
}

const mainNavItems = [
  { key: 'all', label: 'ALL', href: '/collections', hasMegaMenu: false },
  { key: 'collections', label: 'COLLECTIONS', href: '/collections', hasMegaMenu: true },
  { key: 'our-story', label: 'OUR STORY', href: '/our-story', hasMegaMenu: false },
  { key: 'visit-us', label: 'VISIT US', href: '/visit-us', hasMegaMenu: false },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenMegaMenu(null)
    setMobileExpanded({})
  }, [pathname])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (mainNavItems.find(item => item.key === key)?.hasMegaMenu) {
        setOpenMegaMenu(prev => prev === key ? null : key)
      }
    } else if (e.key === 'Escape') {
      setOpenMegaMenu(null)
      const trigger = document.querySelector(`[data-nav-key="${key}"]`) as HTMLElement
      trigger?.focus()
    } else if (e.key === 'Tab' && e.shiftKey) {
      const megaMenu = megaMenuRef.current
      if (megaMenu && !megaMenu.contains(document.activeElement)) {
        setOpenMegaMenu(null)
      }
    }
  }, [])

  const handleMegaMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenMegaMenu(null)
      const activeTrigger = document.querySelector('[aria-expanded="true"]') as HTMLElement
      activeTrigger?.focus()
    } else if (e.key === 'Tab' && !e.shiftKey) {
      const focusableElements = megaMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements && focusableElements.length > 0) {
        const lastElement = focusableElements[focusableElements.length - 1]
        if (document.activeElement === lastElement) {
          e.preventDefault()
          const firstTrigger = document.querySelector('[aria-expanded="true"]') as HTMLElement
          firstTrigger?.focus()
        }
      }
    }
  }, [])

  const isActivePath = (href: string) => {
    if (href === '/collections') return pathname === '/collections'
    if (href.includes('category=')) {
      const params = new URLSearchParams(href.split('?')[1])
      return pathname === '/collections' && searchParams?.get('category') === params.get('category')
    }
    if (href.includes('occasion=')) {
      const params = new URLSearchParams(href.split('?')[1])
      return pathname === '/collections' && searchParams?.get('occasion') === params.get('occasion')
    }
    return pathname === href
  }

  const toggleMobileExpanded = (key: string) => {
    setMobileExpanded(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const showWhiteHeader = isHomepage && !isScrolled

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        showWhiteHeader
          ? 'bg-transparent'
          : 'bg-white border-b border-charcoal/10 shadow-sm'
      }`}
      role="banner"
    >
      <nav className="w-full" aria-label="Main navigation">
        <div className="flex items-center h-16 md:h-20 lg:h-24 px-4 sm:px-6 lg:px-8 gap-8">
          <div className="flex items-center gap-3 flex-shrink-0 min-w-0" role="brand">
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
              aria-label={`${businessConfig.brand.retail} · ${businessConfig.brand.parent} - Home`}
            >
              <Image
                src="/images/logo.png"
                alt=""
                width={307}
                height={130}
                className="h-9 md:h-10 lg:h-12 w-auto object-contain flex-shrink-0"
                priority
                aria-hidden="true"
              />
              <div className="flex items-baseline flex-wrap hidden sm:flex leading-tight gap-1">
                <span className={`${showWhiteHeader ? 'text-white' : 'text-charcoal'} font-serif text-lg md:text-xl lg:text-2xl font-medium tracking-tight uppercase whitespace-nowrap transition-colors duration-300`}>
                  SUIT GALLERIA
                </span>
                <span className={`${showWhiteHeader ? 'text-white/40' : 'text-charcoal/40'} transition-colors duration-300`} aria-hidden="true">|</span>
                <span className={`${showWhiteHeader ? 'text-white/60' : 'text-charcoal/60'} font-sans text-xs md:text-sm tracking-widest uppercase leading-none whitespace-nowrap transition-colors duration-300`}>
                  BUCKINGHAM STREET CO.
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1 flex-1 min-w-0" role="menubar">
              {mainNavItems.map((item) => {
                const isActive = isActivePath(item.href)
                const hasMegaMenu = item.hasMegaMenu
                const megaMenuContent = megaMenuData[item.key]

                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => hasMegaMenu && setOpenMegaMenu(item.key)}
                    onMouseLeave={() => hasMegaMenu && setOpenMegaMenu(null)}
                    onFocus={() => hasMegaMenu && setOpenMegaMenu(item.key)}
                    onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
                      if (hasMegaMenu && !e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenMegaMenu(null)
                      }
                    }}
                  >
                    <button
                      ref={(el): void => { if (el) el.dataset.navKey = item.key }}
                      type="button"
                      role="menuitem"
                      aria-haspopup={hasMegaMenu ? 'true' : 'false'}
                      aria-expanded={hasMegaMenu ? openMegaMenu === item.key : 'false'}
                      aria-controls={hasMegaMenu ? `mega-menu-${item.key}` : undefined}
                      className={`px-4 py-3 text-sm tracking-wider uppercase transition-colors duration-200 rounded-md ${
                        isActive
                          ? showWhiteHeader
                            ? 'text-white font-medium'
                            : 'text-maroon font-medium'
                          : showWhiteHeader
                            ? 'text-white/70 hover:text-white'
                            : 'text-charcoal/70 hover:text-charcoal'
                      }`}
                      onKeyDown={(e) => handleKeyDown(e, item.key)}
                      onClick={() => {
                        if (!hasMegaMenu) {
                          router.push(item.href)
                          setOpenMegaMenu(null)
                        }
                      }}
                    >
                      {item.label}
                      {hasMegaMenu && (
                        <svg
                          className={`inline-block w-3 h-3 ml-1 transition-transform duration-200 ${
                            openMegaMenu === item.key ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>

                    {hasMegaMenu && openMegaMenu === item.key && megaMenuContent && (
                      <div
                        ref={megaMenuRef}
                        id={`mega-menu-${item.key}`}
                        role="menu"
                        className="absolute left-0 top-full w-full lg:w-screen lg:left-[-12rem] lg:max-w-[calc(100vw-24rem)] bg-white border-t border-charcoal/10 shadow-xl rounded-b-2xl p-6 lg:p-8 animate-slide-down"
                        onKeyDown={handleMegaMenuKeyDown}
                      >
                        <div className="container-custom">
                          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${megaMenuContent.length} gap-6 lg:gap-8`}>
                            {megaMenuContent.map((column, colIndex) => (
                              <div key={colIndex} className="space-y-2">
                                <h4 className="mega-menu-column-title">{column.title}</h4>
                                <div className="space-y-1" role="none">
                                  {column.items.map((menuItem, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      href={menuItem.href}
                                      role="menuitem"
                                      className={`mega-menu-link ${isActivePath(menuItem.href) ? 'mega-menu-link-active' : ''}`}
                                      aria-current={isActivePath(menuItem.href) ? 'page' : undefined}
                                      onClick={() => setOpenMegaMenu(null)}
                                    >
                                      {menuItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center z-10 flex-shrink-0">
              <button
              type="button"
              className="md:hidden p-2 transition-colors"
              style={{ color: showWhiteHeader ? 'white' : 'rgb(28 28 28)' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="pb-6 border-t border-charcoal/10 bg-white">
            <div className="flex flex-col gap-1 pt-6">
              {mainNavItems.map((item) => {
                const isActive = isActivePath(item.href)
                const hasMegaMenu = item.hasMegaMenu
                const isExpanded = mobileExpanded[item.key]

                return (
                  <div key={item.key} className="border-b border-charcoal/5">
                    {hasMegaMenu ? (
                      <>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between px-4 py-4 text-sm tracking-wider uppercase transition-colors duration-200 ${
                            isActive
                              ? 'text-maroon font-medium bg-charcoal/5'
                              : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                          }`}
                          onClick={() => toggleMobileExpanded(item.key)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-submenu-${item.key}`}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          id={`mobile-submenu-${item.key}`}
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                          aria-hidden={!isExpanded}
                        >
                          <div className="pb-4 space-y-3">
                            {megaMenuData[item.key]?.map((column, colIndex) => (
                              <div key={colIndex} className="pl-4 border-l border-charcoal/10 ml-2">
                                <h4 className="mega-menu-column-title pt-3">{column.title}</h4>
                                <div className="space-y-1">
                                  {column.items.map((menuItem, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      href={menuItem.href}
                                      className={`mega-menu-link px-3 py-2 text-sm ${isActivePath(menuItem.href) ? 'mega-menu-link-active' : ''}`}
                                      aria-current={isActivePath(menuItem.href) ? 'page' : undefined}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {menuItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-4 text-sm tracking-wider uppercase transition-colors duration-200 ${
                          isActive
                            ? 'text-maroon font-medium bg-charcoal/5'
                            : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}