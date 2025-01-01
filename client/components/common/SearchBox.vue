<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Search restaurants..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <button
        @click="$emit('search')"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-md hover:bg-primary/90"
      >
        Search
      </button>
    </div>
    
    <div class="flex flex-wrap gap-4">
      <RestaurantFilters 
        v-model:cuisine="selectedCuisine"
        v-model:price="selectedPrice"
        v-model:rating="selectedRating"
        @filter="applyFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': []
}>()

defineProps<{
  modelValue: string
}>()

const selectedCuisine = ref<string>('')
const selectedPrice = ref<string>('')
const selectedRating = ref<number | null>(null)

const applyFilters = () => {
  emit('search')
}
</script>