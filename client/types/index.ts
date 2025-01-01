export interface Restaurant {
  id: string
  name: string
  description: string
  address: string
  rating: number
  images: string[]
  cuisine: string[]
  priceRange: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}