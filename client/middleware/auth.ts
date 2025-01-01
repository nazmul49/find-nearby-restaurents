export default defineNuxtRouteMiddleware((to) => {
  const user = useState('user')
  
  if (!user.value && !to.path.startsWith('/auth')) {
    return navigateTo('/auth/login')
  }
})