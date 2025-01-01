import { ref } from 'vue'
import { useRestaurants } from '~/stores/restaurants'

export function useFilters() {
  const store = useRestaurants()
  
  const selectedCuisine = ref('')
  const selectedPrice = ref('')
  const selectedRating = ref<number | null>(null)

  function applyFilters() {
    store.setFilters({
      cuisine: selectedCuisine.value,
      price: selectedPrice.value,
      rating: selectedRating.value
    })
  }

  return {
    selectedCuisine,
    selectedPrice,
    selectedRating,
    applyFilters
  }
}