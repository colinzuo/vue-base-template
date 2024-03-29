import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title';
import { hasRoutePermission } from '@/utils/permission';

router.beforeEach(async (to, from, next) => {
  console.log(`global beforeEach Enter for ${to.path}`)

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const token = store.state.user.token

  if (token) {
    if (to.name === 'login') {
      // if is logged in, redirect to the home page
      next({ name: 'home' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } 
    else {
      let roles = store.getters.roles;

      if (!roles) {
        try {
          await store.dispatch('user/getUserInfo');
        } catch (err) {
          store.dispatch('user/resetTokenInfo');
        }
      }

      if (hasRoutePermission(to)) {
        next();
      } else {
        next({name: 'page-forbidden', replace: true});
        NProgress.done();
      }
    }
  } else {
    /* has no token*/
    if (!to.matched.some(record => record.meta.requiresAuth)) {
      next()
    } else {
      console.log(`need token to access ${to.path}, redirect to login page`)
      // other pages that do not have permission to access are redirected to the login page.
      next(`/auth/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
