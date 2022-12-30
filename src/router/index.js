import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthLayout from '@/layout/AuthLayout.vue';
import MainLayout from '@/layout/MainLayout.vue';
import WrapperLayout from '@/layout/WrapperLayout.vue';

import Login from '@/views/auth/login.vue';
import Signup from '@/views/auth/signup.vue';

import Home from '@/views/Home.vue';

import UserManagement from '@/views/system-management/UserManagement.vue';

import PageForbidden from '@/views/error-page/page-forbidden.vue';
import PageNotFound from '@/views/error-page/page-not-found.vue';

Vue.use(VueRouter);

const staticRoutes = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        component: Login,
        name: 'login',
        meta: { title: 'Login' }
      },
      {
        path: 'signup',
        component: Signup,
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
        meta: { title: 'Home' },
      },
      {
        path: 'sys-management',
        component: WrapperLayout,
        redirect: 'sys-management/user-management',
        meta: {
          needRoles: [
            'admin',
          ],
        },
        children: [
          {
            path: 'user-management',
            component: UserManagement,
            name: 'user-management',
            meta: { 
              title: 'User Management',
            },
          },
        ],
      },
      {
        path: 'error-page',
        component: WrapperLayout,
        redirect: 'error-page/page-not-found',
        children: [
          {
            path: 'page-forbidden',
            name: 'page-forbidden',
            component: PageForbidden,
            meta: { title: 'Forbidden' },
          },
          {
            path: 'page-not-found',
            name: 'page-not-found',
            component: PageNotFound,
            meta: { title: 'Not Found' },
          },
        ],
      },
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
