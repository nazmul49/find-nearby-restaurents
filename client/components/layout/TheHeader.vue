<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-primary">
          Restaurant Finder
        </NuxtLink>

        <div class="flex items-center gap-4">
          <template v-if="user">
            <NuxtLink
              v-if="user.role === 'admin'"
              to="/admin"
              class="text-gray-600 hover:text-primary"
            >
              Admin Panel
            </NuxtLink>
            <button
              @click="handleLogout"
              class="text-gray-600 hover:text-primary"
            >
              Logout
            </button>
          </template>
          <NuxtLink
            v-else
            to="/auth/login"
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const user = useState({role: 'admin'});


const handleLogout = () => {
  user.value = null
  navigateTo('/auth/login')
}</script>