// import { apiFormLogin, apiGetUserInfo, apiRegister,
//   apiRequestIdCode, apiLogout } from '@/api/user';
import { apiRegister,
  apiRequestIdCode } from '@/api/user';

class UserService {
  constructor({tag}) {
    this.tag = tag;
  }

  formLogin(data) {
    console.log(`${this.tag} formLogin Enter`);

    // return apiFormLogin(data);

    return new Promise((resolve) => {
      console.log(`reqData ${data}`)

      let expiredAt = new Date();
      expiredAt.setDate(expiredAt.getDate() + 1);

      let rspData = {
        data: {
          token: '12345678901234561234567890123456',
          expiredAt: expiredAt.toISOString(),
        },
      }

      resolve(rspData)
    });
  }

  getUserInfo() {
    console.log(`${this.tag} getUserInfo Enter`);

    // return apiGetUserInfo();

    return new Promise((resolve) => {
      let rspData = {
        data: {
          username: 'admin',
          roles: ['sysadmin'],
        },
      }

      resolve(rspData)
    });
  }

  register(data) {
    console.log(`${this.tag} register Enter`)

    return apiRegister(data)
  }

  requestIdCode(data) {
    console.log(`${this.tag} requestIdCode Enter`)

    return apiRequestIdCode(data)
  }

  logout() {
    console.log(`${this.tag} logout Enter`);

    // return apiLogout();

    return new Promise((resolve) => {
      let rspData = {};

      resolve(rspData)
    });
  }
}

export let userService = new UserService({
  tag: 'default UserService'
});

console.log('After Create UserService');
