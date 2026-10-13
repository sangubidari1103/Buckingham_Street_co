'use client'

import { Suspense } from 'react'
import { Navigation } from './Navigation'

export function NavigationWrapper() {
  return (
    <Suspense fallback={<div className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 bg-ivory border-b border-charcoal/10" />}>
      <Navigation />
    </Suspense>
  )
}