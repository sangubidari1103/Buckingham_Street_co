import Link from 'next/link'
import { NavigationWrapper } from '@/components/NavigationWrapper'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <NavigationWrapper />
      <main id="main-content" role="main" className="pt-16 sm:pt-20 min-h-[60vh] flex items-center justify-center bg-ivory">
        <div className="text-center px-6">
          <svg className="w-16 h-16 mx-auto mb-6 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-midnight mb-4">
            Page Not Found
          </h1>
          <p className="text-midnight/60 text-lg mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link href="/collections" className="btn-secondary">
              Browse Collections
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}