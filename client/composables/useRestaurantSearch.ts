import { ref, watch } from 'vue'
import { useFilters } from './useFilters'
// import { useLocationSearch } from './useLocationSearch'

export function useRestaurantSearch() {
  const searchQuery = ref('')
  const { selectedCuisine, selectedPrice, selectedRating, applyFilters } = useFilters()
  // const { searchNearby } = useLocationSearch()

  watch(searchQuery, async () => {
    await handleSearch()
  })

  async function handleSearch() {
    // await searchNearby(searchQuery.value)
    applyFilters()
  }

  return {
    searchQuery,
    selectedCuisine,
    selectedPrice,
    selectedRating,
    handleSearch
  }
}