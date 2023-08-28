import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { UserInfo } from 'src/components/models'
import { authenRepo } from 'src/repositories/authen'
import { APIService } from 'src/utils/api-service'

export const useUserStore = defineStore('user', {
  state: (): { token: string | null; user: UserInfo | null } => ({
    token: LocalStorage.getItem(`${process.env.APP_NAME}_token`) || null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setUser(user: UserInfo) {
      this.user = user
    },
    setToken(token: string | null) {
      this.token = token
      LocalStorage.set(`${process.env.APP_NAME}_token`, token?.toString())
    },
    removeUser() {
      this.token = null
      this.user = null
      LocalStorage.clear()
    },
    async fetchUser() {
      await APIService(() => authenRepo.fetchUser(), {
        success_callback: ({ data: user }) => {
          this.user = user
        }
      })
    }
  }
})
