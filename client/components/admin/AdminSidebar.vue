<template>
  <aside class="w-64 bg-gray-800 text-white">
    <div class="p-4">
      <h2 class="text-xl font-semibold">Admin Panel</h2>
    </div>
    <nav class="mt-4">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="block px-4 py-2 hover:bg-gray-700"
        :class="{ 'bg-gray-700': route.path === item.path }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const menuItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Restaurants', path: '/admin/restaurants' },
  { label: 'Settings', path: '/admin/settings' }
]</script>