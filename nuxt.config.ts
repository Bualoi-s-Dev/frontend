import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  runtimeConfig: {
    public: {
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      apiUrl: process.env.API_URL,
      s3URL: process.env.S3_URL,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY, 
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  modules: ['@pinia/nuxt', 'nuxt-toastify'],
  toastify: {
    position: 'top-right',
    theme: 'light',
    clearOnUrlChange: false
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
