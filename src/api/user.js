import request from '@/utils/request'
import { apiPrefix } from '@/settings'

export function apiFormLogin(data) {
  return request({
    url: `${apiPrefix}/user/form-login`,
    method: 'post',
    data
  })
}

export function apiGetUserInfo() {
  return request({
    url: `${apiPrefix}/user/user-info`,
    method: 'get',
  })
}

export function apiRegister(data) {
  return request({
    url: `${apiPrefix}/user/register`,
    method: 'post',
    data
  })
}

export function apiRequestIdCode(data) {
  return request({
    url: `${apiPrefix}/user/request-id-code`,
    method: 'post',
    data
  })
}

export function apiLogout() {
  return request({
    url: `${apiPrefix}/user/logout`,
    method: 'post'
  })
}
