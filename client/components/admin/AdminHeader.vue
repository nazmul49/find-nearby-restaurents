<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      <div class="flex items-center gap-4">
        <span class="text-gray-600">Welcome, {{ user?.name }}</span>
        <button 
          @click="handleLogout" 
          class="text-gray-600 hover:text-primary"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const user = useState('user')

const handleLogout = () => {
  user.value = null
  navigateTo('/auth/login')
}</script>