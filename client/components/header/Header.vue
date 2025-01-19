<template>
  <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
    <!-- Container of flex -->
    <div class="container flex h-16 items-center justify-between">
      <!-- Logo and page title -->
      <div class="flex items-center gap-3">
        <button @click="isOpen = true" aria-label="Open menu"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden">
          <span class="sr-only">Button used to open menu</span>
          <Icon name="heroicons:bars-2" />
        </button>
        <!-- Logo -->
        <img src="https://img.logoipsum.com/296.svg" alt="Restaurants management logo" class="h-7 w-7 object-contain" />
        <!-- Page title -->
        <NuxtLink class="text-xl font-bold" to="/admin">Restaurant Management</NuxtLink>
      </div>

      <!-- Right side of header -->
      <div class="flex items-center gap-5">
        <button @click="toggleTheme"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background">
          <Icon name="heroicons:sun" class="h-5 w-5" />
        </button>

        <!-- Profile Dropdown menu -->
        <HMenu as="div" class="relative">
          <HMenuButton
            class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background">
            <img src="assets/images/user/salman.jpg" alt="Logged in user" class="h-full w-full" />
          </HMenuButton>
          <TransitionScale :scale="0.8" origin="top right">
            <HMenuItems
              class="absolute right-0 z-10 mt-3 w-48 rounded-md border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div class="border-b px-3 py-1.5 text-sm">
                <p class="font-semibold">Hello Salman</p>
                <a href="mailto:salman@test.com" class="leading-none text-muted-foreground">admin@salman.com</a>
              </div>
              <div class="p-1">
                <template v-for="(p, i) in profileMenuOptions" :key="i">
                  <HMenuItem v-if="!p.divider" v-slot="{ active }">
                    <NuxtLink :to="p.route">
                      <button :class="[active && 'bg-muted']"
                        class="inline-flex w-full items-center rounded-md p-2 text-sm font-medium">
                        {{ p.title }}
                      </button>
                    </NuxtLink>
                  </HMenuItem>
                  <hr v-if="p.divider" class="my-1" />
                </template>
              </div>
            </HMenuItems>
          </TransitionScale>
        </HMenu>
      </div>
    </div>
    <!-- Mobile menu -->
    <MobileMenu v-model="isOpen" />
  </header>
</template>

<script setup lang="ts">
const mode = useColorMode();
const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

// Items that will be displayed in menu
const profileMenuOptions = [
  { title: "Profile", route: "/admin/profile" },
  { title: "Settings" },
  { divider: true },
  { title: "Logout" },
];

// Used to open/close menu
const isOpen = ref(false);
</script>
