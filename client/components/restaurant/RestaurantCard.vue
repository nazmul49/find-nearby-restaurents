<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img 
      :src="restaurant.images[0]" 
      :alt="restaurant.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ restaurant.name }}</h3>
      <p class="text-gray-600 mb-2">{{ restaurant.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-primary font-medium">{{ restaurant.priceRange }}</span>
        <div class="flex items-center">
          <StarIcon class="w-5 h-5 text-yellow-400" />
          <span class="ml-1">{{ restaurant.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/20/solid'
import type { Restaurant } from '~/types'

defineProps<{
  restaurant: Restaurant
}>()</script>