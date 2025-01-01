export default defineNuxtConfig({
  devServer: {
    port: 4000, // Replace 4000 with your desired port
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Restaurant Finder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Find the best restaurants near you'
        }
      ]
    }
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },

  // Disable dev tools in production
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  compatibilityDate: '2024-12-29'
})