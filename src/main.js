import Vue from 'vue';

import vuetify from './plugins/vuetify';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from './router';
import store from './store';

import './permission'; // permission control

import { setStore } from '@/utils/request';

setStore(store);

console.log("main.js Enter");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
