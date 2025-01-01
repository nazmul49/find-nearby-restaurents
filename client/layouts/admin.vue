<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="flex-1 overflow-auto">
      <AdminHeader />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin']
})
</script>