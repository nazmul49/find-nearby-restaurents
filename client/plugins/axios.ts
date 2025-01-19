import axios from 'axios';

export default defineNuxtPlugin(() => {
  axios.defaults.baseURL = process.env.API_BASE_URL as string;

  axios.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error)
      return Promise.reject(error)
    }
  )
});
