// import { apiFormLogin, apiGetUserInfo, apiRegister,
//   apiRequestIdCode, apiLogout } from '@/api/user';
import { apiRegister,
  apiRequestIdCode, apiLogout } from '@/api/user';

class UserService {
  constructor({tag}) {
    this.tag = tag;
  }

  formLogin(data) {
    console.log('formLogin Enter');

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
    console.log('getUserInfo Enter');

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
    console.log('register Enter')

    return apiRegister(data)
  }

  requestIdCode(data) {
    console.log('requestIdCode Enter')

    return apiRequestIdCode(data)
  }

  logout(data) {
    console.log('logout Enter')

    return apiLogout(data)
  }
}

export let userService = new UserService({
  tag: 'default'
});
