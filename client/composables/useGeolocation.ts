import { ref, onMounted } from 'vue'

export function useGeolocation() {
  const coordinates = ref<{ latitude: number; longitude: number } | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const getLocation = () => {
    loading.value = true
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported'
      loading.value = false
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
      }
    )
  }

  onMounted(() => {
    getLocation()
  })

  return {
    coordinates,
    error,
    loading,
    getLocation
  }
}