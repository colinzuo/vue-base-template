import request from '@/utils/request'
import { apiPrefix } from '@/settings'

let store;

export class UserApi {
  static setStore(value) {
    store = value;
  }
  
  static addUser(data) {
    return request({
      url: `${apiPrefix}/user/add-user`,
      method: 'post',
      data
    });
  }

  static delUser(userId) {
    return request({
      url: `${apiPrefix}/user/del-user/${userId}`,
      method: 'delete',
    });
  }

  static getUserBaseList(params) {
    return request({
      url: `${apiPrefix}/user/user-base-list`,
      method: 'get',
      params,
    })
  }

  static getUserList(params) {
    // return request({
    //   url: `${apiPrefix}/user/user-list`,
    //   method: 'get',
    //   params,
    // })
    let userList = [
      {
        username: "user",
      }
    ];

    if (params.admin) {
      userList.push({
        username: "admin",
      })
    }

    if (params.sysAdmin) {
      userList.push({
        username: "sysadmin",
      })
    }

    return {
      data: {
        list: userList,
        total: userList.length,
      }
    }
  }

  static getUserRoleList(userId) {
    return request({
      url: `${apiPrefix}/user/user-role-list/${userId}`,
      method: 'get',
    })
  }

  static updateUser({userId, data}) {
    return request({
      url: `${apiPrefix}/user/update-user/${userId}`,
      method: 'post',
      data
    });
  }

  static updateUserPassword(data) {
    return request({
      url: `${apiPrefix}/user/update-user-password`,
      method: 'post',
      data
    });
  }

  static updateUserRoleList({userId, data}) {
    return request({
      url: `${apiPrefix}/user/update-user-role-list/${userId}`,
      method: 'post',
      data
    });
  }

  static formLogin(data) {
    let { username, password } = data;

    if (["sysadmin", "admin", "user"].includes(username) && password == "20222022") {
      return {
        data: {
          expireAt: -1,
          token: "demo-token",
        }
      }
    }

    throw new Error("Auth failed")
  }

  static getUserInfo() {
    // return request({
    //   url: `${apiPrefix}/user/user-info`,
    //   method: 'get',
    // })
    let username = store.state.user.name;

    if (username === 'sysadmin') {
      return {
        data: {
          username,
          roles: ['sysAdmin', 'admin'],
        }
      }
    }

    if (username === 'admin') {
      return {
        data: {
          username,
          roles: ['admin'],
        }
      }
    }

    if (username === 'user') {
      return {
        data: {
          username,
          roles: [],
        }
      }
    }

    throw new Error(`unexpected username ${username}`)
  }

  static logout() {
    // return request({
    //   url: `${apiPrefix}/user/logout`,
    //   method: 'post'
    // })
  }

  static register(data) {
    return request({
      url: `${apiPrefix}/user/register`,
      method: 'post',
      data
    })
  }

  static requestIdCode(data) {
    return request({
      url: `${apiPrefix}/user/request-id-code`,
      method: 'post',
      data
    })
  }

  static getRoleList(params) {
    return request({
      url: `${apiPrefix}/user/role-list`,
      method: 'get',
      params,
    })
  }
}
