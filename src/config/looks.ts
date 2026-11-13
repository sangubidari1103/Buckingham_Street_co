'use client'

import { getProductById } from '@/lib/products'
import type { Product } from '@/lib/products'

export type LookId =
  | 'business'
  | 'wedding'
  | 'heritage'
  | 'evening'
  | 'classic'
  | 'modern'

export interface LookHotspot {
  productId: string
  x: number // percentage 0-100 (responsive to image scaling)
  y: number // percentage 0-100 (responsive to image scaling)
  number: number // 1-based pin label
}

export interface LookProduct {
  productId: string
  hotspot: { x: number; y: number }
  number: number
}

export interface Look {
  id: LookId
  name: string
  title: string
  description: string
  occasion: string
  modelImage: string
  modelAlt: string
  products: LookProduct[]
}

/*
 * THE STYLE STUDIO — curated looks.
 *
 * All productId values reference real products defined in src/lib/products.ts.
 * No prices, inventory or invented product details are introduced.
 *
 * IMAGES:
 *   modelImage points to /images/looks/look-*-*.svg placeholder files.
 *   These are clearly replaceable placeholder assets. The client should replace
 *   each SVG with full-body menswear model photography (JPG) at the same path,
 *   or update the path below and add the new image to public/images/looks/.
 */

export const LOOKS: Look[] = [
  {
    id: 'business',
    name: 'The Business Edit',
    title: 'THE BUSINESS EDIT',
    description:
      'Premium formal suits and blazers for the boardroom and beyond.',
    occasion: 'Business · Formal',
    modelImage: '/images/looks/look-1-business.svg',
    modelAlt: 'Model wearing a premium navy formal suit for business occasions',
    products: [
      { productId: 'navy-formal-suit', hotspot: { x: 48, y: 42 }, number: 1 },
      { productId: 'charcoal-formal-suit', hotspot: { x: 48, y: 62 }, number: 2 },
      { productId: 'navy-blazer', hotspot: { x: 48, y: 78 }, number: 3 },
    ],
  },
  {
    id: 'wedding',
    name: 'The Wedding Edit',
    title: 'THE WEDDING EDIT',
    description:
      'Wedding suits and bandhgalas curated for the groom and his party.',
    occasion: 'Wedding · Ceremony',
    modelImage: '/images/looks/look-2-wedding.svg',
    modelAlt: 'Model wearing an ivory wedding suit for wedding occasions',
    products: [
      { productId: 'ivory-groom-suit', hotspot: { x: 50, y: 44 }, number: 1 },
      { productId: 'burgundy-wedding-suit', hotspot: { x: 50, y: 64 }, number: 2 },
      { productId: 'luxury-wedding-tuxedo', hotspot: { x: 50, y: 80 }, number: 3 },
    ],
  },
  {
    id: 'heritage',
    name: 'The Heritage Edit',
    title: 'THE HERITAGE EDIT',
    description:
      'Bundis and Indian-inspired formalwear with Karnataka sensibilities.',
    occasion: 'Heritage · Occasion',
    modelImage: '/images/looks/look-3-heritage.svg',
    modelAlt: 'Model wearing Indian-inspired formalwear with a bundi jacket',
    products: [
      { productId: 'traditional-groom-wear', hotspot: { x: 47, y: 45 }, number: 1 },
      { productId: 'embroidered-wedding-jacket', hotspot: { x: 47, y: 65 }, number: 2 },
      { productId: 'beige-formal-suit', hotspot: { x: 47, y: 82 }, number: 3 },
    ],
  },
  {
    id: 'evening',
    name: 'The Evening Edit',
    title: 'THE EVENING EDIT',
    description:
      'Premium party and occasionwear for evening receptions and celebrations.',
    occasion: 'Evening · Cocktail',
    modelImage: '/images/looks/look-4-evening.svg',
    modelAlt: 'Model wearing premium evening occasionwear',
    products: [
      { productId: 'black-tuxedo', hotspot: { x: 52, y: 43 }, number: 1 },
      { productId: 'elegant-wedding-ensemble', hotspot: { x: 52, y: 63 }, number: 2 },
      { productId: 'burgundy-wedding-suit', hotspot: { x: 52, y: 80 }, number: 3 },
    ],
  },
  {
    id: 'classic',
    name: 'The Classic Edit',
    title: 'THE CLASSIC EDIT',
    description:
      'Timeless formal combinations that never go out of style.',
    occasion: 'Classic · Everyday',
    modelImage: '/images/looks/look-5-classic.svg',
    modelAlt: 'Model wearing a timeless three-piece navy suit',
    products: [
      { productId: 'three-piece-navy-suit', hotspot: { x: 49, y: 44 }, number: 1 },
      { productId: 'charcoal-formal-suit', hotspot: { x: 49, y: 64 }, number: 2 },
      { productId: 'beige-linen-blazer', hotspot: { x: 49, y: 81 }, number: 3 },
    ],
  },
  {
    id: 'modern',
    name: 'The Modern Edit',
    title: 'THE MODERN EDIT',
    description:
      'Contemporary suits and blazers for the modern wardrobe.',
    occasion: 'Modern · Business',
    modelImage: '/images/looks/look-6-modern.svg',
    modelAlt: 'Model wearing a contemporary blue windowpane blazer',
    products: [
      { productId: 'double-breasted-suit', hotspot: { x: 51, y: 43 }, number: 1 },
      { productId: 'blue-windowpane-blazer', hotspot: { x: 51, y: 63 }, number: 2 },
      { productId: 'forest-green-blazer', hotspot: { x: 51, y: 80 }, number: 3 },
    ],
  },
]

export function getLookById(id: LookId): Look | undefined {
  return LOOKS.find((look) => look.id === id)
}

export function getLookProduct(look: Look, productId: string): Product | undefined {
  const entry = look.products.find((p) => p.productId === productId)
  if (!entry) return undefined
  return getProductById(entry.productId)
}

export const LOOK_COUNT = LOOKS.length
