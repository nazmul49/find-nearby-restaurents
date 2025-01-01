<template>
  <div class="flex flex-wrap gap-4">
    <!-- Cuisine Filter -->
    <select
      v-model="cuisineModel"
      class="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      <option value="">All Cuisines</option>
      <option v-for="cuisine in CUISINES" :key="cuisine" :value="cuisine">
        {{ cuisine }}
      </option>
    </select>

    <!-- Price Range Filter -->
    <select
      v-model="priceModel"
      class="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      <option value="">All Prices</option>
      <option v-for="price in PRICE_RANGES" :key="price" :value="price">
        {{ price }}
      </option>
    </select>

    <!-- Rating Filter -->
    <select
      v-model="ratingModel"
      class="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      <option value="">All Ratings</option>
      <option v-for="option in RATING_OPTIONS" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <button
      @click="$emit('filter')"
      class="px-4 py-1.5 bg-secondary text-white rounded-md hover:bg-secondary/90"
    >
      Apply Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { CUISINES, PRICE_RANGES, RATING_OPTIONS } from '~/utils/constants'

const props = defineProps<{
  cuisine: string
  price: string
  rating: number | null
}>()

const emit = defineEmits<{
  'update:cuisine': [value: string]
  'update:price': [value: string]
  'update:rating': [value: number | null]
  'filter': []
}>()

const cuisineModel = computed({
  get: () => props.cuisine,
  set: (value) => emit('update:cuisine', value)
})

const priceModel = computed({
  get: () => props.price,
  set: (value) => emit('update:price', value)
})

const ratingModel = computed({
  get: () => props.rating?.toString() ?? '',
  set: (value) => emit('update:rating', value ? Number(value) : null)
})
</script>