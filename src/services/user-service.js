import { UserApi } from '@/api/user';

class UserService {
  constructor({tag}) {
    this.tag = tag;
    this.cachedUserBaseListMap = new Map();
  }

  clearCache() {
    this.cachedUserBaseListMap = new Map();
  }

  addUser(data) {
    console.log(`${this.tag} addUser Enter`);

    this.clearCache();

    return UserApi.addUser(data);
  }

  delUser(data) {
    console.log(`${this.tag} delUser Enter`);

    this.clearCache();

    return UserApi.delUser(data);
  }

  async getUserBaseList({params = {}, forceSync = false}) {
    console.log(`${this.tag} getUserBaseList Enter`);

    const paramsStr = JSON.stringify(params);

    if (this.cachedUserBaseListMap.has(paramsStr) && !forceSync) {
      return this.cachedUserBaseListMap.get(paramsStr);
    }

    const userBaseList = await UserApi.getUserBaseList(params);
    this.cachedUserBaseListMap.set(paramsStr, userBaseList);

    return userBaseList;
  }

  getUserList(params) {
    console.log(`${this.tag} getUserList Enter`);

    return UserApi.getUserList(params);
  }

  getUserRoleList(data) {
    console.log(`${this.tag} getUserRoleList Enter`);

    return UserApi.getUserRoleList(data);
  }

  updateUser(data) {
    console.log(`${this.tag} updateUser Enter`);

    this.clearCache();

    return UserApi.updateUser(data);
  }

  updateUserPassword(data) {
    console.log(`${this.tag} updateUserPassword Enter`);

    return UserApi.updateUserPassword(data);
  }

  updateUserRoleList(data) {
    console.log(`${this.tag} updateUserRoleList Enter`);

    return UserApi.updateUserRoleList(data);
  }

  formLogin(data) {
    console.log(`${this.tag} formLogin Enter`);

    return UserApi.formLogin(data);
  }

  getUserInfo() {
    console.log(`${this.tag} getUserInfo Enter`);

    return UserApi.getUserInfo();
  }

  logout() {
    console.log(`${this.tag} logout Enter`);

    return UserApi.logout();
  }

  register(data) {
    console.log(`${this.tag} register Enter`);

    return UserApi.register(data);
  }

  requestIdCode(data) {
    console.log(`${this.tag} requestIdCode Enter`);

    return UserApi.requestIdCode(data);
  }

  addPermission(data) {
    console.log(`${this.tag} addPermission Enter`);

    return UserApi.addPermission(data);
  }

  delPermission(data) {
    console.log(`${this.tag} delPermission Enter`);

    return UserApi.delPermission(data);
  }

  getPermissionList(params) {
    console.log(`${this.tag} getPermissionList Enter`);

    return UserApi.getPermissionList(params);
  }

  updatePermission(data) {
    console.log(`${this.tag} updatePermission Enter`);

    return UserApi.updatePermission(data);
  }

  addRole(data) {
    console.log(`${this.tag} addRole Enter`);

    return UserApi.addRole(data);
  }

  delRole(data) {
    console.log(`${this.tag} delRole Enter`);

    return UserApi.delRole(data);
  }

  getRoleList(params) {
    console.log(`${this.tag} getRoleList Enter`);

    return UserApi.getRoleList(params);
  }

  getRolePermissionList(data) {
    console.log(`${this.tag} getRolePermissionList Enter`);

    return UserApi.getRolePermissionList(data);
  }

  updateRole(data) {
    console.log(`${this.tag} updateRole Enter`);

    return UserApi.updateRole(data);
  }

  updateRolePermissionList(data) {
    console.log(`${this.tag} updateRolePermissionList Enter`);

    return UserApi.updateRolePermissionList(data);
  }
}

export let userService = new UserService({
  tag: 'default UserService'
});

export let gUserService = userService;

console.log('After Create UserService');
