import { apiFormLogin, apiGetUserInfo, apiRegister,
  apiRequestIdCode, apiLogout } from '@/api/user';

class UserService {
  constructor({tag}) {
    this.tag = tag;
  }

  formLogin(data) {
    console.log(`${this.tag} formLogin Enter`);

    return apiFormLogin(data);
  }

  getUserInfo() {
    console.log(`${this.tag} getUserInfo Enter`);

    return apiGetUserInfo();
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

    return apiLogout();
  }
}

export let userService = new UserService({
  tag: 'default UserService'
});

console.log('After Create UserService');
