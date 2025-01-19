<template>
  <div>
    <!-- Header -->
    <Header />
    <div class="container lg:grid lg:grid-cols-12 lg:gap-10">
      <!-- Sidebar -->
      <Sidebar class="sticky top-[65px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block" />

      <!-- Main Section -->
      <main class="py-5 lg:col-span-9">
        <slot />
      </main>
    </div>
  </div>
</template>