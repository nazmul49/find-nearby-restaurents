<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-2">Total Restaurants</h3>
        <p class="text-3xl font-bold text-primary">{{ restaurants.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const restaurantStore = useRestaurants()
const restaurants = computed(() => restaurantStore.restaurants)</script>