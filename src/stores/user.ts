import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import type { User } from 'app/@types';

export const useUserStore = defineStore('user', {
  state: (): { token: string | null; user: User | null } => ({
    token: LocalStorage.getItem(`${process.env.APP_NAME}_token`) || null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setToken(token: string | null) {
      this.token = token;
      LocalStorage.set(`${process.env.APP_NAME}_token`, token?.toString());
    },
    removeUser() {
      this.token = null;
      this.user = null;
      LocalStorage.clear();
    },
    async fetchUser() {
      // const { data } = await //your repo here
      // if (data) this.user = data.data;
      // console.log(this.user);
    }
  }
});
