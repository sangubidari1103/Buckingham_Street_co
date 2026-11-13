'use client'

import type { Product } from '@/lib/products'
import type { Look } from '@/config/looks'

const STORAGE_KEY = 'suitgalleria:style-shortlist'

export interface ShortlistItem {
  kind: 'product' | 'look'
  id: string
  name: string
  category?: string
  image?: string
  occasion?: string
  savedAt: number
}

export interface Shortlist {
  products: ShortlistItem[]
  looks: ShortlistItem[]
}

const emptyShortlist: Shortlist = { products: [], looks: [] }

function read(): Shortlist {
  if (typeof window === 'undefined') return emptyShortlist
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyShortlist
    const parsed = JSON.parse(raw) as Shortlist
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      looks: Array.isArray(parsed.looks) ? parsed.looks : [],
    }
  } catch {
    return emptyShortlist
  }
}

function write(shortlist: Shortlist): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shortlist))
  } catch {
    // storage quota or private mode — degrade gracefully
  }
}

export function getShortlist(): Shortlist {
  return read()
}

export function hasProduct(id: string): boolean {
  return read().products.some((item) => item.id === id)
}

export function hasLook(id: string): boolean {
  return read().looks.some((item) => item.id === id)
}

export function addProduct(product: Product): Shortlist {
  const current = read()
  if (current.products.some((item) => item.id === product.id)) return current
  const item: ShortlistItem = {
    kind: 'product',
    id: product.id,
    name: product.name,
    category: product.category,
    image: product.images[0],
    occasion: product.occasions.join(', '),
    savedAt: Date.now(),
  }
  const next = { ...current, products: [...current.products, item] }
  write(next)
  return next
}

export function addLook(look: Look): Shortlist {
  const current = read()
  if (current.looks.some((item) => item.id === look.id)) return current
  const item: ShortlistItem = {
    kind: 'look',
    id: look.id,
    name: look.name,
    category: look.occasion,
    image: look.modelImage,
    occasion: look.title,
    savedAt: Date.now(),
  }
  const next = { ...current, looks: [...current.looks, item] }
  write(next)
  return next
}

export function removeProduct(id: string): Shortlist {
  const current = read()
  const next = {
    ...current,
    products: current.products.filter((item) => item.id !== id),
  }
  write(next)
  return next
}

export function removeLook(id: string): Shortlist {
  const current = read()
  const next = {
    ...current,
    looks: current.looks.filter((item) => item.id !== id),
  }
  write(next)
  return next
}

export function clearShortlist(): Shortlist {
  write(emptyShortlist)
  return emptyShortlist
}

export function shortlistCount(): number {
  const s = read()
  return s.products.length + s.looks.length
}

export function buildShortlistWhatsappMessage(
  shortlist: Shortlist,
  pageUrl: string,
): string {
  const lines: string[] = []
  lines.push('Hello Suit Galleria · Buckingham Street Co.')
  lines.push('')
  lines.push('I would like to enquire about the following items from my Style Shortlist:')
  lines.push('')

  if (shortlist.products.length > 0) {
    lines.push('Products:')
    shortlist.products.forEach((item, i) => {
      lines.push(
        `${i + 1}. ${item.name}${
          item.category ? ` (${item.category})` : ''
        }${item.occasion ? ` — ${item.occasion}` : ''}`,
      )
    })
    lines.push('')
  }

  if (shortlist.looks.length > 0) {
    lines.push('Looks:')
    shortlist.looks.forEach((item, i) => {
      lines.push(`${i + 1}. ${item.name} — ${item.occasion}`)
    })
    lines.push('')
  }

  lines.push(`Reference page: ${pageUrl}`)
  lines.push('')
  lines.push('Please confirm availability and sizing. This is an enquiry shortlist, not an order.')

  return lines.join('\n')
}
