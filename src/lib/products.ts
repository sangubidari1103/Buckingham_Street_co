export type Category =
  | 'formalwear'
  | 'wedding'
  | 'blazers'
  | 'shirts'
  | 'smart-casual'

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
  { value: 'shirts', label: 'Shirts' },
  { value: 'smart-casual', label: 'Smart Casual' },
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

  // SHIRTS - 6 products
  {
    id: 'white-formal-shirt',
    name: 'White Formal Shirt',
    category: 'shirts',
    occasions: ['business', 'wedding', 'black-tie'],
    description:
      'Crisp white poplin shirt with spread collar and French cuffs. The foundation of formal dressing.',
    images: getProductImages('white-formal-shirt'),
    details: {
      fabric: '100% Cotton Poplin',
      fit: 'Classic Regular',
      origin: 'Made in Italy',
      care: 'Machine Wash Cold',
    },
  },
  {
    id: 'light-blue-shirt',
    name: 'Light Blue Shirt',
    category: 'shirts',
    occasions: ['business', 'everyday', 'cocktail'],
    description:
      'Pale blue twill shirt with subtle sheen. Versatile staple that pairs with any suit or blazer.',
    images: getProductImages('light-blue-shirt'),
    details: {
      fabric: 'Cotton Twill',
      fit: 'Contemporary Slim',
      origin: 'Made in Italy',
      care: 'Machine Wash Cold',
    },
  },
  {
    id: 'black-shirt',
    name: 'Black Dress Shirt',
    category: 'shirts',
    occasions: ['cocktail', 'black-tie', 'everyday'],
    description:
      'Midnight black poplin shirt for evening wear. Clean lines with mother-of-pearl buttons.',
    images: getProductImages('black-shirt'),
    details: {
      fabric: 'Cotton Poplin',
      fit: 'Contemporary Slim',
      origin: 'Made in Italy',
      care: 'Machine Wash Cold',
    },
  },
  {
    id: 'striped-shirt',
    name: 'Striped Oxford Shirt',
    category: 'shirts',
    occasions: ['business', 'everyday', 'casual'],
    description:
      'Blue and white university stripe on Oxford cloth. Button-down collar for smart-casual versatility.',
    images: getProductImages('striped-shirt'),
    details: {
      fabric: 'Cotton Oxford Cloth',
      fit: 'Classic Regular',
      origin: 'Made in Italy',
      care: 'Machine Wash Cold',
    },
  },
  {
    id: 'patterned-shirt',
    name: 'Patterned Silk Shirt',
    category: 'shirts',
    occasions: ['cocktail', 'wedding', 'everyday'],
    description:
      'Micro-geometric print on silk-cotton blend. Subtle pattern adds character to tailored ensembles.',
    images: getProductImages('patterned-shirt'),
    details: {
      fabric: 'Silk-Cotton Blend',
      fit: 'Contemporary Regular',
      origin: 'Made in Italy',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'premium-casual-shirt',
    name: 'Premium Casual Shirt',
    category: 'shirts',
    occasions: ['casual', 'everyday', 'business'],
    description:
      'Relaxed-fit chambray shirt with pearl snaps. Elevated casualwear in premium Japanese cotton.',
    images: getProductImages('premium-casual-shirt'),
    details: {
      fabric: 'Japanese Chambray Cotton',
      fit: 'Relaxed Regular',
      origin: 'Made in Japan',
      care: 'Machine Wash Cold',
    },
  },

  // SMART CASUAL - 6 products
  {
    id: 'linen-suit',
    name: 'Linen Suit',
    category: 'smart-casual',
    occasions: ['wedding', 'cocktail', 'everyday'],
    description:
      'Unstructured beige linen suit for summer occasions. Breathable elegance with relaxed tailoring.',
    images: getProductImages('linen-suit'),
    details: {
      fabric: 'Pure Italian Linen',
      fit: 'Relaxed Contemporary',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'knit-polo',
    name: 'Merino Knit Polo',
    category: 'smart-casual',
    occasions: ['casual', 'everyday', 'business'],
    description:
      'Fine-gauge merino wool polo in navy. Elevated knitwear that bridges casual and smart.',
    images: getProductImages('knit-polo'),
    details: {
      fabric: 'Extra-Fine Merino Wool',
      fit: 'Contemporary Regular',
      origin: 'Made in Italy',
      care: 'Hand Wash Cold',
    },
  },
  {
    id: 'overshirt',
    name: 'Wool Overshirt',
    category: 'smart-casual',
    occasions: ['casual', 'everyday', 'cocktail'],
    description:
      'Mid-weight wool overshirt in charcoal. Wear as a light jacket or layered piece.',
    images: getProductImages('overshirt'),
    details: {
      fabric: 'Wool-Cashmere Blend',
      fit: 'Relaxed Regular',
      origin: 'Made in Italy',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'chinos',
    name: 'Tailored Chinos',
    category: 'smart-casual',
    occasions: ['business', 'everyday', 'casual'],
    description:
      'Sand-coloured cotton twill chinos with tailored finish. The smart-casual trouser essential.',
    images: getProductImages('chinos'),
    details: {
      fabric: 'Cotton Twill with Stretch',
      fit: 'Contemporary Tapered',
      origin: 'Made in Italy',
      care: 'Machine Wash Cold',
    },
  },
  {
    id: 'relaxed-tailored-trousers',
    name: 'Relaxed Wool Trousers',
    category: 'smart-casual',
    occasions: ['business', 'everyday', 'cocktail'],
    description:
      'Mid-grey tropical wool trousers with relaxed seat and tapered leg. Comfort meets refinement.',
    images: getProductImages('relaxed-tailored-trousers'),
    details: {
      fabric: 'Tropical Wool',
      fit: 'Relaxed Tapered',
      origin: 'Tailored in London',
      care: 'Dry Clean Only',
    },
  },
  {
    id: 'refined-everyday-blazer',
    name: 'Unstructured Cotton Blazer',
    category: 'smart-casual',
    occasions: ['casual', 'everyday', 'business'],
    description:
      'Navy cotton-linen blazer with soft shoulders. The ultimate refined everyday jacket.',
    images: getProductImages('refined-everyday-blazer'),
    details: {
      fabric: 'Cotton-Linen Blend',
      fit: 'Relaxed Unstructured',
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