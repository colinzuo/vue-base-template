import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'

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
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! 
          // such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getUserInfo');

          console.log(`roles: ${roles}`);

          // // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // // dynamically add accessible routes
          // router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // next({ ...to, replace: true })
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetTokenInfo')
          // Message.error(error || 'Has Error')
          next(`/auth/login?redirect=${to.path}`)
          NProgress.done()
        }
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
