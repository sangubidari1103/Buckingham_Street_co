export type Category =
  | 'formalwear'
  | 'wedding'
  | 'blazers'

export type Occasion =
  | 'business'
  | 'wedding'
  | 'black-tie'
  | 'casual'
  | 'cocktail'
  | 'everyday'

export interface Product {
  id: string
  name: string
  category: Category
  occasions: Occasion[]
  description: string
  images: string[]
  details?: {
    fabric?: string
    fit?: string
    origin?: string
    care?: string
  }
}

export const categories: { value: Category; label: string }[] = [
  { value: 'formalwear', label: 'Formalwear' },
  { value: 'wedding', label: 'Wedding & Occasion' },
  { value: 'blazers', label: 'Blazers' },
]

export const occasions: { value: Occasion; label: string }[] = [
  { value: 'business', label: 'Business' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'black-tie', label: 'Black Tie' },
  { value: 'casual', label: 'Casual' },
  { value: 'cocktail', label: 'Cocktail' },
  { value: 'everyday', label: 'Everyday' },
]

import { getProductImages } from './images'

export const products: Product[] = [
  // FORMALWEAR - 6 products
  {
    id: 'navy-formal-suit',
    name: 'Navy Formal Suit',
    category: 'formalwear',
    occasions: ['business', 'wedding', 'cocktail'],
    description:
      'A classic navy wool suit in Super 120s fabric. Clean lines with a contemporary fit, ideal for business and formal occasions.',
    images: getProductImages('navy-formal-suit'),
    details: {
      fabric: 'Super 120s Wool',
      fit: 'Contemporary Slim',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'charcoal-formal-suit',
    name: 'Charcoal Formal Suit',
    category: 'formalwear',
    occasions: ['business', 'black-tie', 'cocktail'],
    description:
      'Sophisticated charcoal worsted wool suit with subtle texture. A wardrobe essential for the discerning professional.',
    images: getProductImages('charcoal-formal-suit'),
    details: {
      fabric: 'Super 130s Worsted Wool',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'black-tuxedo',
    name: 'Black Tuxedo',
    category: 'formalwear',
    occasions: ['black-tie', 'wedding', 'cocktail'],
    description:
      'Traditional black wool tuxedo with satin peak lapels and covered buttons. The definitive choice for evening events.',
    images: getProductImages('black-tuxedo'),
    details: {
      fabric: 'Barathea Wool with Silk Satin',
      fit: 'Classic Slim',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'three-piece-navy-suit',
    name: 'Three-Piece Navy Suit',
    category: 'formalwear',
    occasions: ['business', 'wedding', 'cocktail'],
    description:
      'Navy three-piece suit with matching waistcoat. Versatile ensemble that transitions from boardroom to evening reception.',
    images: getProductImages('three-piece-navy-suit'),
    details: {
      fabric: 'Super 110s Wool',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'double-breasted-suit',
    name: 'Double-Breasted Suit',
    category: 'formalwear',
    occasions: ['business', 'cocktail', 'black-tie'],
    description:
      'Peak lapel double-breasted suit in midnight blue. Six-button configuration with a commanding silhouette.',
    images: getProductImages('double-breasted-suit'),
    details: {
      fabric: 'Super 140s Wool',
      fit: 'Structured Contemporary',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'beige-formal-suit',
    name: 'Beige Formal Suit',
    category: 'formalwear',
    occasions: ['wedding', 'cocktail', 'everyday'],
    description:
      'Light beige wool-silk blend suit for warm-weather formal occasions. Refined texture with exceptional drape.',
    images: getProductImages('beige-formal-suit'),
    details: {
      fabric: 'Wool-Silk-Linen Blend',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },

  // WEDDING - 6 products
  {
    id: 'ivory-groom-suit',
    name: 'Ivory Groom Suit',
    category: 'wedding',
    occasions: ['wedding', 'cocktail'],
    description:
      'Elegant ivory wool-silk blend suit designed for the modern groom. Subtle sheen with impeccable tailoring.',
    images: getProductImages('ivory-groom-suit'),
    details: {
      fabric: 'Wool-Silk Blend',
      fit: 'Classic Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'burgundy-wedding-suit',
    name: 'Burgundy Wedding Suit',
    category: 'wedding',
    occasions: ['wedding', 'cocktail', 'black-tie'],
    description:
      'Rich burgundy velvet-wool blend suit. A bold choice for autumn/winter weddings with luxurious depth.',
    images: getProductImages('burgundy-wedding-suit'),
    details: {
      fabric: 'Velvet-Wool Blend',
      fit: 'Contemporary Slim',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'embroidered-wedding-jacket',
    name: 'Embroidered Wedding Jacket',
    category: 'wedding',
    occasions: ['wedding', 'cocktail'],
    description:
      'Ivory dinner jacket with delicate tonal embroidery on lapels and cuffs. Bespoke detailing for the distinguished groom.',
    images: getProductImages('embroidered-wedding-jacket'),
    details: {
      fabric: 'Wool-Silk with Silk Embroidery',
      fit: 'Classic Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'luxury-wedding-tuxedo',
    name: 'Luxury Wedding Tuxedo',
    category: 'wedding',
    occasions: ['wedding', 'black-tie', 'cocktail'],
    description:
      'Midnight blue tuxedo with grosgrain lapels and hand-stitched details. The pinnacle of wedding formalwear.',
    images: getProductImages('luxury-wedding-tuxedo'),
    details: {
      fabric: 'Super 150s Wool with Grosgrain Silk',
      fit: 'Contemporary Slim',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'traditional-groom-wear',
    name: 'Traditional Morning Suit',
    category: 'wedding',
    occasions: ['wedding', 'black-tie'],
    description:
      'Classic morning coat ensemble in charcoal with cashmere-striped trousers. Timeless formal daywear for traditional ceremonies.',
    images: getProductImages('traditional-groom-wear'),
    details: {
      fabric: 'Wool-Cashmere Blend',
      fit: 'Classic Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'elegant-wedding-ensemble',
    name: 'Elegant Wedding Ensemble',
    category: 'wedding',
    occasions: ['wedding', 'cocktail'],
    description:
      'Light grey three-piece suit with matching waistcoat and silk tie. Complete groom ensemble for daytime ceremonies.',
    images: getProductImages('elegant-wedding-ensemble'),
    details: {
      fabric: 'Super 120s Wool',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },

  // BLAZERS - 6 products
  {
    id: 'navy-blazer',
    name: 'Navy Blazer',
    category: 'blazers',
    occasions: ['business', 'cocktail', 'everyday'],
    description:
      'The essential navy blazer in lightweight wool. Gold-tone buttons, patch pockets, and a versatile cut.',
    images: getProductImages('navy-blazer'),
    details: {
      fabric: 'Lightweight Wool',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'forest-green-blazer',
    name: 'Forest Green Blazer',
    category: 'blazers',
    occasions: ['business', 'cocktail', 'everyday'],
    description:
      'Rich forest green wool blazer with horn buttons. A distinguished alternative to traditional navy.',
    images: getProductImages('forest-green-blazer'),
    details: {
      fabric: 'Tropical Wool',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'brown-tweed-blazer',
    name: 'Brown Tweed Blazer',
    category: 'blazers',
    occasions: ['casual', 'everyday', 'cocktail'],
    description:
      'Textured brown herringbone tweed blazer with leather elbow patches. Classic country style with modern fit.',
    images: getProductImages('brown-tweed-blazer'),
    details: {
      fabric: 'Harris Tweed Wool',
      fit: 'Relaxed Contemporary',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'beige-linen-blazer',
    name: 'Beige Linen Blazer',
    category: 'blazers',
    occasions: ['casual', 'everyday', 'cocktail'],
    description:
      'Unstructured beige linen blazer for warm weather. Relaxed shoulders and patch pockets for effortless elegance.',
    images: getProductImages('beige-linen-blazer'),
    details: {
      fabric: 'Pure Irish Linen',
      fit: 'Relaxed Unstructured',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'textured-grey-blazer',
    name: 'Textured Grey Blazer',
    category: 'blazers',
    occasions: ['business', 'cocktail', 'everyday'],
    description:
      'Grey flannel blazer with subtle texture. Versatile piece that bridges formal and casual with ease.',
    images: getProductImages('textured-grey-blazer'),
    details: {
      fabric: 'Wool Flannel',
      fit: 'Contemporary Regular',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'blue-windowpane-blazer',
    name: 'Blue Windowpane Blazer',
    category: 'blazers',
    occasions: ['business', 'cocktail', 'everyday'],
    description:
      'Navy blazer with subtle blue windowpane check. Patterned sophistication for the modern wardrobe.',
    images: getProductImages('blue-windowpane-blazer'),
    details: {
      fabric: 'Wool with Silk Blend',
      fit: 'Contemporary Slim',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },

]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByOccasion(occasion: Occasion): Product[] {
  return products.filter((p) => p.occasions.includes(occasion))
}

export function filterProducts(
  category?: Category,
  occasion?: Occasion
): Product[] {
  return products.filter((p) => {
    if (category && p.category !== category) return false
    if (occasion && !p.occasions.includes(occasion)) return false
    return true
  })
}