import { Metadata } from 'next'
import { NavigationWrapper } from '@/components/NavigationWrapper'
import { Footer } from '@/components/Footer'
import { HeroSlideshow } from '@/components/HeroSlideshow'
import { FeaturedCollections } from '@/components/FeaturedCollections'
import { StyleStudio } from '@/components/StyleStudio'
import { EditorialCampaign } from '@/components/EditorialCampaign'
import { BrandOffering } from '@/components/BrandOffering'
import { Manufacturing } from '@/components/Manufacturing'
import { VisitUsCTA } from '@/components/VisitUsCTA'
import { NewArrivals } from '@/components/NewArrivals'

export const metadata: Metadata = {
  title: 'Suit Galleria · Buckingham Street Co.',
  description:
    'Suit Galleria, the retail destination for Buckingham Street Co. Contemporary Indian menswear with subtle Karnataka heritage.',
}

export default function HomePage() {
  return (
    <>
      <NavigationWrapper />
      <main id="main-content" role="main">
        <HeroSlideshow />
        <FeaturedCollections />
        <StyleStudio />
        <EditorialCampaign />
        <NewArrivals />
        <BrandOffering />
        <Manufacturing />
        <VisitUsCTA />
      </main>
      <Footer />
    </>
  )
}