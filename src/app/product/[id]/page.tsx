import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ProductDetailClient } from './ProductDetailClient'
import { getProductById } from '@/lib/products'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = getProductById(resolvedParams.id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = getProductById(resolvedParams.id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main id="main-content" role="main" className="pt-16 sm:pt-20">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  )
}