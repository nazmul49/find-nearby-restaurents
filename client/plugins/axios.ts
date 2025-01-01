import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  axios.defaults.baseURL = config.public.apiBaseUrl
  
  axios.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error)
      return Promise.reject(error)
    }
  )
})