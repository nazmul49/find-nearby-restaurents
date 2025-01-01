// import { useGeolocation } from '@vueuse/core'
// import { useRestaurants } from '~/stores/restaurants'

// export function useLocationSearch() {
//   const { coords, isSupported } = useGeolocation()
//   const store = useRestaurants()

//   async function searchNearby(query?: string) {
//     if (!isSupported.value) {
//       store.setError('Geolocation is not supported in your browser')
//       return
//     }

//     if (!coords.value) {
//       store.setError('Location access is required to find nearby restaurants')
//       return
//     }

//     await store.fetchNearbyRestaurants({
//       lat: coords.value.latitude,
//       lng: coords.value.longitude,
//       query
//     })
//   }

//   return {
//     coords,
//     isSupported,
//     searchNearby
//   }
// }