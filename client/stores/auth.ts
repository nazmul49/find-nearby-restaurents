export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedInUser: null as any,
  }),
  actions: {
    async login(email: string, password: string): Promise<any> {
      console.log('Login successful.');
      this.loggedInUser = {
        id: 1,
        role: 'admin'
      }
    },
  }
});