# Suit Galleria · Buckingham Street Co.

A luxury menswear website for Suit Galleria, the retail destination of Buckingham Street Co.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter (sans) + Playfair Display (serif) via Google Fonts
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── collections/       # Collections page with filters
│   ├── product/[id]/      # Product detail pages
│   ├── our-story/         # Brand story page
│   ├── visit-us/          # Contact & location page
│   ├── globals.css        # Global styles & design tokens
│   └── layout.tsx         # Root layout with navigation/footer
├── components/            # React components
│   ├── Navigation.tsx     # Responsive navigation bar
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── FeaturedCollections.tsx
│   ├── EditorialCampaign.tsx
│   ├── BrandOffering.tsx
│   ├── Manufacturing.tsx
│   ├── VisitUsCTA.tsx
│   ├── FontLoader.tsx
│   └── ...
├── config/
│   └── business.ts        # Business configuration (EDIT THIS)
├── lib/
│   └── products.ts        # Product data & utilities
└── types/                 # TypeScript types
```

## Configuration

**All business details are configured in one file:**

Edit `src/config/business.ts` to add real information:

```typescript
export const businessConfig = {
  brand: {
    parent: 'Buckingham Street Co.',
    retail: 'Suit Galleria',
    tagline: 'British Heritage · Italian Luxury · Contemporary Atelier',
  },
  contact: {
    phone: '+44 20 7946 0123',
    whatsapp: '442079460123',
    email: 'info@suitgalleria.com',
    address: {
      line1: '123 Savile Row',
      line2: 'Mayfair',
      city: 'London',
      postcode: 'W1S 3BT',
      country: 'United Kingdom',
    },
    mapsUrl: 'https://www.google.com/maps/embed?...',
    reviewsUrl: 'https://g.page/.../review',
  },
  hours: {
    monday: '10:00–19:00',
    tuesday: '10:00–19:00',
    wednesday: '10:00–19:00',
    thursday: '10:00–19:00',
    friday: '10:00–19:00',
    saturday: '10:00–18:00',
    sunday: 'Closed',
  },
  social: {
    instagram: 'https://instagram.com/suitgalleria',
    facebook: 'https://facebook.com/suitgalleria',
  },
}
```

## Features Implemented

### Homepage
- Cinematic hero with brand hierarchy
- Featured collections grid (6 categories)
- Editorial campaign section
- Brand offering (RTW, MTM, Bespoke, Accessories)
- Manufacturing transparency section
- Visit Us CTA with contact actions

### Collections
- Responsive product grid
- Category & occasion filters (multi-select)
- URL-synced filter state
- Empty states with clear filters
- No public pricing

### Product Detail
- Image gallery with thumbnails
- Product name, category, description
- Details (fabric, fit, origin, care)
- Occasion tags
- **WhatsApp enquiry with prefilled product name**
- Back to collections link
- No stock/size claims

### Our Story
- Brand introduction
- Philosophy pillars
- Tailoring process overview
- Appointment CTA

### Visit Us
- Contact information (phone, WhatsApp, email)
- Google Maps embed
- Google Reviews link
- Opening hours
- Appointment booking actions
- Graceful placeholders when unconfigured

## Design System

### Colors
- Midnight: `#191918`
- Ivory: `#F3EEE4`
- Bronze: `#806342`
- Forest: `#354138`

### Typography
- Headlines: Playfair Display (serif)
- Body: Inter (sans)

### Components
- `.btn-primary` / `.btn-secondary` / `.btn-whatsapp`
- `.container-custom`
- `.card-hover` / `.image-zoom`
- Focus-visible states
- Reduced-motion support

## Deployment (Vercel)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Vercel auto-detects Next.js
4. Add environment variables if needed
5. Deploy

The site is fully static except for product detail pages (dynamic routes).

## Assets Required

Replace placeholder images in components with actual brand assets:
- Hero background image
- Category card images (6)
- Campaign images (3)
- Product images (2 per product)
- About/Manufacturing images
- `public/og-image.jpg` for social sharing
- Logo files (if available)

## Accessibility

- Semantic HTML5
- ARIA labels & roles
- Keyboard navigation
- Focus-visible states
- Reduced-motion support
- Alt text for all images
- Color contrast compliance

## License

Proprietary - Buckingham Street Co.