import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { FontLoader } from '@/components/FontLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://suitgalleria.com'),
  title: {
    default: 'Suit Galleria · Buckingham Street Co.',
    template: '%s · Suit Galleria',
  },
  description:
    'Suit Galleria, the retail destination for Buckingham Street Co. British heritage tailoring, Italian luxury fabrics, and contemporary atelier craftsmanship.',
  keywords: [
    'menswear',
    'tailoring',
    'suits',
    'wedding suits',
    'formalwear',
    'Buckingham Street Co.',
    'Suit Galleria',
    'London tailoring',
  ],
  authors: [{ name: 'Buckingham Street Co.' }],
  creator: 'Buckingham Street Co.',
  publisher: 'Buckingham Street Co.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Suit Galleria · Buckingham Street Co.',
    title: 'Suit Galleria · Buckingham Street Co.',
    description:
      'British heritage tailoring, Italian luxury fabrics, and contemporary atelier craftsmanship.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Suit Galleria · Buckingham Street Co.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suit Galleria · Buckingham Street Co.',
    description:
      'British heritage tailoring, Italian luxury fabrics, and contemporary atelier craftsmanship.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: '',
  },
}

export const viewport: Viewport = {
  themeColor: '#191918',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <FontLoader />
        {children}
      </body>
    </html>
  )
}