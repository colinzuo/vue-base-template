import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import HomeLayout from '@/layout/HomeLayout.vue';
import NotLoginLayout from '@/layout/NotLoginLayout.vue';

Vue.use(VueRouter);

const staticRoutes = [
  {
    path: '/auth',
    component: NotLoginLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/login'),
        name: 'Login',
        meta: { title: 'Login' }
      }
    ]
  },
  {
    path: '/',
    component: HomeLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home',
        meta: { title: 'Home' }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes: staticRoutes
})

export default router
