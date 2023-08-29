import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const userStore = useUserStore();
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach(async (to, from, next) => {
    const { isAuthenticated, user } = storeToRefs(userStore);
    if (isAuthenticated.value) {
      if (!user.value) await userStore.fetchUser();
      if (to.matched.some((route) => route.meta.authRequired === false)) return next('/cac'); //set your custom route here
      // const permissionRequired = to.matched.find((route) => route.meta.required)?.meta.permission as string
      return next();
    }
    if (to.fullPath === '/') return next('login');
    next();
  });

  return Router;
});
