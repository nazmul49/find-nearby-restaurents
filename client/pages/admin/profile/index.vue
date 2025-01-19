<template>
  <div>
    <ProfileInfo />
    <hr class="my-5" />
    <Reminders />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});

const restaurantStore = useRestaurants();
const restaurants = computed(() => restaurantStore.restaurants);
</script>