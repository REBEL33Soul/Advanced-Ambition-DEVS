import { defineStore } from 'pinia'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut 
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async signInWithGoogle() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
      } catch (error) {
        this.error = error.message
      }
    },

    async signInWithGithub() {
      const auth = getAuth()
      const provider = new GithubAuthProvider()
      try {
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
      } catch (error) {
        this.error = error.message
      }
    },

    async logout() {
      const auth = getAuth()
      try {
        await signOut(auth)
        this.user = null
      } catch (error) {
        this.error = error.message
      }
    }
  }
})