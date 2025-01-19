<template>
  <div>
    <div v-if="store.isLoading" class="text-center">
      <LoadingSpinner />
    </div>

    <div v-else-if="store.error" class="text-center text-red-500 p-4">
      {{ store.error }}
    </div>

    <div v-else-if="restaurants.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>

    <div v-else class="text-center text-gray-500">
      No restaurants found in your area
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useRestaurants();

const restaurants = computed(() => store.filteredRestaurants)
</script>