<template>
  <div>
    <section class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">Find Restaurants Near You</h1>
      <CommonSearchBox v-model="searchQuery" @search="handleSearch" class="mb-8" />
      <RestaurantNearBy />
    </section>
  </div>
</template>

<script setup lang="ts">
const { searchQuery, handleSearch } = useRestaurantSearch()
</script>