export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('admin_token')
  
  if (to.path === '/login') {
    return
  }

  if (to.path.includes('/admin') && !token.value) {
    return navigateTo('/login')
  }
})