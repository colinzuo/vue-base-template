import axios from 'axios';

import { gMessageService } from '@/services';

import { translateError } from './translate';

let store = null;

// create an axios instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
instance.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store?.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.error) {
      gMessageService.add({
        type: 'error',
        message: translateError(res.error),
      });

      // let error = res.error

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (error.code === 50008 || error.code === 50012 || error.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetTokenInfo').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error, error); // for debug

    gMessageService.add({
      type: 'error',
      message: error.message,
    });

    if (error.response.status == 401) {
      store.dispatch('user/resetTokenInfo').then(() => {
              location.reload()
            });
    }

    return Promise.reject(error);
  }
);

export function setStore(value) {
  store = value;
}

export default instance;
