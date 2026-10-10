import { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { VisitUsClient } from './VisitUsClient'

export const metadata: Metadata = {
  title: 'Visit Us',
  description:
    'Visit Suit Galleria, the retail destination for Buckingham Street Co. Find our location, contact details, opening hours, and directions.',
}

export default function VisitUsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" role="main" className="pt-16 sm:pt-20">
        <VisitUsClient />
      </main>
      <Footer />
    </>
  )
}