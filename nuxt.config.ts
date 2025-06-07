export default defineNuxtConfig({
  app: {
    baseURL: "/",
    buildAssetsDir: '/_nuxt/',
    head: {
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }, 
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
          integrity: 'sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==',
          crossorigin: 'anonymous',
        },
        {
          rel:"stylesheet",
          href:"https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css",
        },
      ],
      title: 'Masjid Oasis Ar-Rahman',
    },
  },

  build: {
    transpile: ['bootstrap'],
  },

  css: [
    'assets/main.css',
    'assets/admin.css',
    'assets/base.css',
    'assets/animate.css',
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
  ],

  ssr: true,
  nitro: {
    preset: 'node-server'
  },

  // modules: [ 
  //   'cookie-universal-nuxt',
  // ],

  plugins: [
    { src: "~/plugins/bootstrap.client.ts", mode: "client" },
  ],

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})
