import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import AuthLayout from '@/layout/AuthLayout.vue';
import MainLayout from '@/layout/MainLayout.vue';

Vue.use(VueRouter);

const staticRoutes = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/login'),
        name: 'login',
        meta: { title: 'Login' }
      },
      {
        path: 'signup',
        component: () => import('@/views/auth/login'),
        name: 'signup',
        meta: { title: 'Signup' }
      },
    ]
  },
  {
    path: '/main',
    component: MainLayout,
    redirect: '/main/home',
    meta: {
      requiresAuth: true,
    },
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
  },
  {
    path: '/',
    redirect: '/main/home',
  },
]

const router = new VueRouter({
  routes: staticRoutes
})

export default router
