import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function ProductNotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" role="main" className="pt-16 sm:pt-20 min-h-[60vh] flex items-center justify-center bg-ivory">
        <div className="text-center px-6">
          <svg className="w-16 h-16 mx-auto mb-6 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-midnight mb-4">
            Product Not Found
          </h1>
          <p className="text-midnight/60 text-lg mb-8 max-w-md mx-auto">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/collections" className="btn-secondary inline-flex">
            Back to Collections
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}