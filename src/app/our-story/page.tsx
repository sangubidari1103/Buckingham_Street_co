import { Metadata } from 'next'
import { NavigationWrapper } from '@/components/NavigationWrapper'
import { Footer } from '@/components/Footer'
import { OurStoryClient } from './OurStoryClient'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Discover the story behind Suit Galleria and Buckingham Street Co. — British heritage tailoring, Italian luxury fabrics, and contemporary atelier craftsmanship.',
}

export default function OurStoryPage() {
  return (
    <>
      <NavigationWrapper />
      <main id="main-content" role="main" className="pt-16 sm:pt-20">
        <OurStoryClient />
      </main>
      <Footer />
    </>
  )
}