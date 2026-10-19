// Centralised image configuration for Suit Galleria
// All images served locally from /images/ directory
// Add your downloaded images to public/images/ with the exact filenames below

const LOCAL = {
  // ===== SUITS & FORMALWEAR =====
  suit_navy: '/images/suit_navy.jpg',              // Navy suit - formalwear hero
  suit_charcoal: '/images/suit_charcoal.jpg',      // Charcoal suit
  suit_black: '/images/suit_black.jpg',            // Black suit/tuxedo
  suit_3piece: '/images/suit_3piece.jpg',          // Three-piece suit
  suit_double_breasted: '/images/suit_double_breasted.jpg', // Double-breasted
  suit_beige: '/images/suit_beige.jpg',            // Beige/cream formal suit
  suit_ivory: '/images/suit_ivory.jpg',            // Ivory wedding suit
  suit_burgundy: '/images/suit_burgundy.jpg',      // Burgundy wedding suit
  suit_tuxedo: '/images/suit_tuxedo.jpg',          // Black tuxedo
  suit_morning: '/images/suit_morning.jpg',        // Morning suit
  suit_grey: '/images/suit_grey.jpg',              // Grey wedding ensemble

  // ===== BLAZERS =====
  blazer_navy: '/images/blazer_navy.jpg',          // Navy blazer
  blazer_green: '/images/blazer_green.jpg',        // Forest green blazer
  blazer_tweed: '/images/blazer_tweed.jpg',        // Brown tweed blazer
  blazer_linen: '/images/blazer_linen.jpg',        // Beige linen blazer
  blazer_grey: '/images/blazer_grey.jpg',          // Textured grey blazer
  blazer_windowpane: '/images/blazer_windowpane.jpg', // Blue windowpane blazer
} as const

function l(id: keyof typeof LOCAL): string {
  return LOCAL[id]
}

// Category hero images (distinct per category)
export const categoryImages: Record<string, string> = {
  formalwear: l('suit_navy'),
  wedding: l('suit_ivory'),
  blazers: l('blazer_navy'),
}

// Product images - 18 products, each with 2 unique images
export const productImages: Record<string, string[]> = {
  // FORMALWEAR (6 products)
  'navy-formal-suit': [l('suit_navy'), l('suit_charcoal')],
  'charcoal-formal-suit': [l('suit_charcoal'), l('suit_3piece')],
  'black-tuxedo': [l('suit_tuxedo'), l('suit_3piece')],
  'three-piece-navy-suit': [l('suit_3piece'), l('blazer_navy')],
  'double-breasted-suit': [l('suit_double_breasted'), l('suit_beige')],
  'beige-formal-suit': [l('suit_beige'), l('suit_charcoal')],

  // WEDDING (6 products)
  'ivory-groom-suit': [l('suit_ivory'), l('suit_grey')],
  'burgundy-wedding-suit': [l('suit_burgundy'), l('suit_tuxedo')],
  'embroidered-wedding-jacket': [l('suit_ivory'), l('blazer_navy')],
  'luxury-wedding-tuxedo': [l('suit_tuxedo'), l('suit_morning')],
  'traditional-groom-wear': [l('suit_morning'), l('suit_grey')],
  'elegant-wedding-ensemble': [l('suit_grey'), l('suit_ivory')],

  // BLAZERS (6 products)
  'navy-blazer': [l('blazer_navy'), l('blazer_windowpane')],
  'forest-green-blazer': [l('blazer_green'), l('blazer_tweed')],
  'brown-tweed-blazer': [l('blazer_tweed'), l('blazer_linen')],
  'beige-linen-blazer': [l('blazer_linen'), l('blazer_grey')],
  'textured-grey-blazer': [l('blazer_grey'), l('blazer_green')],
  'blue-windowpane-blazer': [l('blazer_windowpane'), l('blazer_navy')],
}

// Hero & editorial images
export const heroImage = l('suit_navy')

export const editorialImages = [
  { src: l('suit_navy'), alt: 'Gentleman in navy suit walking through London streets', caption: 'The London Edit' },
  { src: l('suit_ivory'), alt: 'Groom in ivory wedding suit with boutonniere', caption: 'The Wedding Edit' },
  { src: l('blazer_navy'), alt: 'Gentleman in navy blazer adjusting pocket square', caption: 'The Blazer Edit' },
]

export const ourStoryImages = {
  atelier: l('suit_3piece'),
  tailoring: l('suit_navy'),
}

// Category-specific SVG fallback placeholders
function fallback(category: string): string {
  const labels: Record<string, string> = {
    formalwear: 'Formal Suit',
    wedding: 'Wedding Attire',
    blazers: 'Blazer',
  }
  const label = labels[category] || 'Product'
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"%3E%3Crect fill="%23F3EEE4"/%3E%3Ctext x="400" y="500" font-family="Georgia,serif" font-size="18" fill="%23806342" text-anchor="middle"%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`
}

export const fallbackImage = fallback('formalwear')

export function getProductImages(productId: string): string[] {
  return productImages[productId] || [fallbackImage, fallbackImage]
}

export function getCategoryImage(category: string): string {
  return categoryImages[category] || fallback(category)
}