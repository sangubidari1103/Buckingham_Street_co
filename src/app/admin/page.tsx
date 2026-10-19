'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { NewArrivalProduct } from '@/types/new-arrivals'

interface NewArrivalFormData {
  name: string
  image: File | null
  previewUrl: string | null
}

export function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [products, setProducts] = useState<NewArrivalProduct[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const [formData, setFormData] = useState<NewArrivalFormData>({
    name: '',
    image: null,
    previewUrl: null,
  })
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/check-auth')
      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsCheckingAuth(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const fetchProducts = useCallback(async () => {
    setIsLoadingProducts(true)
    try {
      const res = await fetch('/api/admin/new-arrivals')
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setIsLoadingProducts(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated, fetchProducts])

  const handleLogin = async (email: string, password: string) => {
    setIsLoggingIn(true)
    setLoginError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setIsAuthenticated(true)
        fetchProducts()
      } else {
        setLoginError(data.error || 'Login failed')
      }
    } catch {
      setLoginError('Network error. Please try again.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setProducts([])
    } catch {
      console.error('Logout failed')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, image: file, previewUrl }))
    } else {
      setFormData(prev => ({ ...prev, image: null, previewUrl: null }))
    }
    setPublishError(null)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }))
    setPublishError(null)
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setPublishError(null)
    setPublishSuccess(null)

    if (!formData.name.trim()) {
      setPublishError('Product name is required')
      return
    }

    if (!formData.image) {
      setPublishError('Please select an image')
      return
    }

    setIsPublishing(true)
    try {
      const fd = new FormData()
      fd.append('name', formData.name.trim())
      fd.append('image', formData.image)

      const res = await fetch('/api/admin/new-arrivals', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()

      if (res.ok && data.product) {
        setPublishSuccess('Product published successfully!')
        setFormData({ name: '', image: null, previewUrl: null })
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        fetchProducts()
      } else {
        setPublishError(data.error || 'Failed to publish product')
      }
    } catch {
      setPublishError('Network error. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return
    }

    setIsDeleting(id)
    setDeleteError(null)
    try {
      const res = await fetch(`/api/admin/new-arrivals/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id))
        setDeleteConfirmId(null)
      } else {
        setDeleteError(data.error || 'Failed to delete product')
      }
    } catch {
      setDeleteError('Network error. Please try again.')
    } finally {
      setIsDeleting(null)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bronze" aria-label="Loading" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        onLogin={handleLogin}
        error={loginError}
        isLoading={isLoggingIn}
      />
    )
  }

  return (
    <AdminDashboard
      products={products}
      isLoadingProducts={isLoadingProducts}
      formData={formData}
      isPublishing={isPublishing}
      publishError={publishError}
      publishSuccess={publishSuccess}
      deleteConfirmId={deleteConfirmId}
      isDeleting={isDeleting}
      deleteError={deleteError}
      onLogout={handleLogout}
      onImageChange={handleImageChange}
      onNameChange={handleNameChange}
      onPublish={handlePublish}
      onDelete={handleDelete}
      onTriggerFileInput={triggerFileInput}
      fileInputRef={fileInputRef}
      fetchProducts={fetchProducts}
    />
  )
}

function AdminLoginForm({
  onLogin,
  error,
  isLoading,
}: {
  onLogin: (email: string, password: string) => void
  error: string | null
  isLoading: boolean
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-midnight mb-2">
            Admin Access
          </h1>
          <p className="text-midnight/60">
            Sign in to manage New Arrivals
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-midnight/10 p-8 shadow-sm" noValidate>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg" role="alert">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-midnight mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@suitgalleria.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-midnight mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-midnight/40 text-sm mt-6">
          Suit Galleria · Buckingham Street Co.
        </p>
      </div>
    </div>
  )
}

function AdminDashboard({
  products,
  isLoadingProducts,
  formData,
  isPublishing,
  publishError,
  publishSuccess,
  deleteConfirmId,
  isDeleting,
  deleteError,
  onLogout,
  onImageChange,
  onNameChange,
  onPublish,
  onDelete,
  onTriggerFileInput,
  fileInputRef,
  fetchProducts,
}: {
  products: NewArrivalProduct[]
  isLoadingProducts: boolean
  formData: NewArrivalFormData
  isPublishing: boolean
  publishError: string | null
  publishSuccess: string | null
  deleteConfirmId: string | null
  isDeleting: string | null
  deleteError: string | null
  onLogout: () => void
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPublish: (e: React.FormEvent) => void
  onDelete: (id: string) => void
  onTriggerFileInput: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  fetchProducts: () => void
}) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white border-b border-midnight/10 sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-4">
              <h1 className="font-serif text-xl md:text-2xl font-medium text-midnight">
                New Arrivals Admin
              </h1>
              <span className="hidden sm:inline-block w-px h-6 bg-midnight/10" aria-hidden="true" />
              <span className="text-sm text-midnight/50">
                Suit Galleria · Buckingham Street Co.
              </span>
            </div>
            <button
              onClick={onLogout}
              className="btn-secondary text-sm px-6 py-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <section className="bg-white rounded-lg border border-midnight/10 p-6 shadow-sm" aria-labelledby="publish-heading">
              <h2 id="publish-heading" className="font-serif text-xl font-medium text-midnight mb-6">
                Publish New Arrival
              </h2>

              <form onSubmit={onPublish} noValidate>
                <div className="mb-6">
                  <label htmlFor="product-name" className="block text-sm font-medium text-midnight mb-2">
                    Product Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    value={formData.name}
                    onChange={onNameChange}
                    className="input-field"
                    placeholder="e.g., Navy Double-Breasted Suit"
                    maxLength={100}
                    required
                    disabled={isPublishing}
                    aria-describedby="name-hint"
                  />
                  <p id="name-hint" className="mt-1 text-xs text-midnight/50">
                    Maximum 100 characters
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-midnight mb-2">
                    Product Image <span className="text-red-500" aria-hidden="true">*</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    id="product-image"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={onImageChange}
                    className="sr-only"
                    aria-describedby="image-hint"
                    disabled={isPublishing}
                  />

                  <div className="border-2 border-dashed border-midnight/20 rounded-lg p-6 text-center transition-colors hover:border-bronze/50 cursor-pointer"
                    onClick={onTriggerFileInput}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTriggerFileInput() }}}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload product image"
                  >
                    {formData.previewUrl ? (
                      <div className="relative aspect-[3/4] max-w-xs mx-auto mb-4">
                        <Image
                          src={formData.previewUrl}
                          alt="Preview of selected product image"
                          fill
                          className="object-cover rounded"
                          sizes="200px"
                        />
                        <button
                          type="button"
                          onClick={e => { e.preventDefault(); e.stopPropagation(); onImageChange({ target: { files: null } } as any); }}
                          className="absolute top-2 right-2 p-1 rounded-full bg-midnight/80 text-ivory hover:bg-midnight transition-colors"
                          aria-label="Remove image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg className="w-12 h-12 mx-auto text-midnight/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-midnight/60 mb-1">Click or drag to upload</p>
                        <p id="image-hint" className="text-xs text-midnight/40">JPEG, PNG, WebP, AVIF · Max 5MB</p>
                      </>
                    )}
                  </div>
                </div>

                {publishError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg" role="alert">
                    {publishError}
                  </div>
                )}

                {publishSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg" role="status">
                    {publishSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPublishing || !formData.name.trim() || !formData.image}
                  className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPublishing ? 'Publishing...' : 'Publish Product'}
                </button>
              </form>
            </section>
          </div>

          <div className="lg:col-span-2">
            <section aria-labelledby="list-heading">
              <div className="flex items-center justify-between mb-6">
                <h2 id="list-heading" className="font-serif text-xl font-medium text-midnight">
                  Published New Arrivals
                </h2>
                <button
                  onClick={fetchProducts}
                  disabled={isLoadingProducts}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  {isLoadingProducts ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {deleteError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg" role="alert">
                  {deleteError}
                </div>
              )}

              {isLoadingProducts ? (
                <div className="bg-white rounded-lg border border-midnight/10 p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bronze mx-auto mb-3" aria-label="Loading" />
                  <p className="text-midnight/60">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white rounded-lg border border-midnight/10 p-12 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-serif text-xl text-midnight mb-2">No products published yet</h3>
                  <p className="text-midnight/60">Publish your first New Arrival using the form on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Published new arrivals">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isDeleting={isDeleting === product.id}
                      onDelete={() => onDelete(product.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-charcoal text-ivory/50 py-6 mt-12">
        <div className="container-custom text-center text-sm">
          Suit Galleria · Buckingham Street Co. — Admin Panel
        </div>
      </footer>
    </div>
  )
}

function ProductCard({
  product,
  isDeleting,
  onDelete,
}: {
  product: NewArrivalProduct
  isDeleting: boolean
  onDelete: () => void
}) {
  const formattedDate = new Date(product.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <article className="bg-white rounded-lg border border-midnight/10 overflow-hidden card-hover" role="listitem">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          loading="lazy"
        />
        {isDeleting && (
          <div className="absolute inset-0 bg-midnight/70 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ivory" aria-label="Deleting" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-midnight mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-midnight/50 text-xs mb-3">
          Published {formattedDate}
        </p>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="btn-secondary w-full text-sm py-2 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Remove Product'}
        </button>
      </div>
    </article>
  )
}

export default function AdminPageWrapper() {
  return <AdminPage />
}