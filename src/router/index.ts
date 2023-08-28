import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
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
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  // Router.beforeEach(async (to, from, next) => {
  //   const { isAuthenticated, user } = storeToRefs(userStore)
  //   if (to.matched.some((route) => route.meta.isAuthRequired)) {
  //     try {
  //       if (!user.value && isAuthenticated) await userStore.fetchUser()
  //     } catch (error) {}

  //     if (isAuthenticated.value) {
  //       // if (to.fullPath === '/teacher' && !permissions.value?.includes('api.v1.admin.teachers.show')) {
  //       //   return next({
  //       //     path: 'teacher/teaching-history',
  //       //     query: {
  //       //       id: user.value?.id //TODO: improve, bug
  //       //     }
  //       //   })
  //       // }
  //       // const required = to.matched.find((route) => route.meta.required)
  //       //   ? (to.matched.find((route) => route.meta.required)?.meta.required as string)
  //       //   : ''
  //       // if (permissions.value?.includes(required)) return next()
  //       // userStore.setAccessDenied()
  //       return next()
  //     }
  //     return next('/')
  //   }
  //   if (
  //     isAuthenticated.value &&
  //     (to.fullPath === '/' || to.path === 'forgot-password')
  //     //|| to.fullPath === '/contact-us'
  //   )
  //     return next('/user')
  //   next()
  // })

  return Router;
});
