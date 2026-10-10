import { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { FeaturedCollections } from '@/components/FeaturedCollections'
import { EditorialCampaign } from '@/components/EditorialCampaign'
import { BrandOffering } from '@/components/BrandOffering'
import { Manufacturing } from '@/components/Manufacturing'
import { VisitUsCTA } from '@/components/VisitUsCTA'

export const metadata: Metadata = {
  title: 'Suit Galleria · Buckingham Street Co.',
  description:
    'Suit Galleria, the retail destination for Buckingham Street Co. British heritage tailoring, Italian luxury fabrics, and contemporary atelier craftsmanship.',
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" role="main">
        <Hero />
        <FeaturedCollections />
        <EditorialCampaign />
        <BrandOffering />
        <Manufacturing />
        <VisitUsCTA />
      </main>
      <Footer />
    </>
  )
}