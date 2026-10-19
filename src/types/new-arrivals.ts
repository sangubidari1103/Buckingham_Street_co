export interface NewArrivalProduct {
  id: string
  name: string
  image_url: string
  created_at: string
}

export interface NewArrivalFormData {
  name: string
  image: File | null
}

export interface AdminSession {
  isAuthenticated: boolean
  user?: {
    id: string
    email: string
  }
}