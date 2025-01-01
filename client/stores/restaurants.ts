import { defineStore } from 'pinia'
import type { Restaurant } from '~/types'
import { mockRestaurants } from '~/data/mockRestaurants'

interface RestaurantState {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  error: string | null
  isLoading: boolean
  filters: {
    cuisine: string
    price: string
    rating: number | null
  }
}

export const useRestaurants = defineStore('restaurants', {
  state: (): RestaurantState => ({
    restaurants: mockRestaurants, // Initialize with mock data
    selectedRestaurant: null,
    error: null,
    isLoading: false,
    filters: {
      cuisine: '',
      price: '',
      rating: null
    }
  }),
  
  getters: {
    filteredRestaurants: (state) => {
      let filtered = [...state.restaurants]

      if (state.filters.cuisine) {
        filtered = filtered.filter(restaurant => 
          restaurant.cuisine.includes(state.filters.cuisine)
        )
      }

      if (state.filters.price) {
        filtered = filtered.filter(restaurant => 
          restaurant.priceRange === state.filters.price
        )
      }

      if (state.filters.rating) {
        filtered = filtered.filter(restaurant => 
          restaurant.rating >= state.filters.rating!
        )
      }

      return filtered
    }
  },
  
  actions: {
    setFilters(filters: Partial<RestaurantState['filters']>) {
      this.filters = { ...this.filters, ...filters }
    },

    setError(message: string) {
      this.error = message
    },

    async fetchNearbyRestaurants({ lat, lng, query }: { lat: number; lng: number; query?: string }) {
      this.isLoading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500)) // Shorter delay
        let filteredRestaurants = [...mockRestaurants]
        
        if (query) {
          const searchTerm = query.toLowerCase()
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTerm) ||
            restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm)) ||
            restaurant.description.toLowerCase().includes(searchTerm)
          )
        }
        
        this.restaurants = filteredRestaurants
      } catch (error) {
        console.error('Error fetching restaurants:', error)
        this.error = 'Failed to fetch restaurants. Please try again later.'
      } finally {
        this.isLoading = false
      }
    }
  }
})