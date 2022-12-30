import { gStorageService } from "./storage-service";

const tokenInfoKey = 'token-info';
const userNameInfoKey = 'username-info';
const passwordInfoKey = 'password-info';

class AuthService {
  constructor({ tag }) {
    this.tag = tag;
    this.tokenInfo = null;
    this.userNameInfo = null;
    this.passwordInfo = null;
  }

  getTokenInfo() {
    console.log(`${this.tag} getTokenInfo Enter`);

    if (!this.tokenInfo) {
      this.tokenInfo = gStorageService.getItem(tokenInfoKey);
    }

    return this.tokenInfo;
  }

  setTokenInfo(tokenInfo) {
    console.log(`${this.tag} setTokenInfo Enter`);

    console.log('tokenInfo', tokenInfo);

    gStorageService.setItem(tokenInfoKey, tokenInfo);

    this.tokenInfo = tokenInfo;
  }

  removeTokenInfo() {
    console.log(`${this.tag}  removeTokenInfo Enter`);

    gStorageService.removeItem(tokenInfoKey);

    this.tokenInfo = null;
  }
  getUserNameInfo() {
    console.log(`${this.tag} getUserNameInfo Enter`);

    if (!this.userNameInfo) {
      this.userNameInfo = gStorageService.getItem(userNameInfoKey);
    }

    return this.userNameInfo;
  }

  setUserNameInfo(userNameInfo) {
    console.log(`${this.tag} setUserNameInfo Enter`);

    console.log('userNameInfo', userNameInfo);

    gStorageService.setItem(userNameInfoKey, userNameInfo);

    this.userNameInfo = userNameInfo;
  }

  removeUserNameInfo() {
    console.log(`${this.tag}  removeUserNameInfo Enter`);

    gStorageService.removeItem(userNameInfoKey);

    this.userNameInfo = null;
  }

  getPasswordInfo() {
    console.log(`${this.tag} getPasswordInfo Enter`);

    if (!this.passwordInfo) {
      this.passwordInfo = gStorageService.getItem(passwordInfoKey);
    }

    return this.passwordInfo;
  }

  setPasswordInfo(passwordInfo) {
    console.log(`${this.tag} setPasswordInfo Enter`);

    gStorageService.setItem(passwordInfoKey, passwordInfo);

    this.passwordInfo = passwordInfo;
  }

  removePasswordInfo() {
    console.log(`${this.tag}  removePasswordInfo Enter`);

    gStorageService.removeItem(passwordInfoKey);

    this.passwordInfo = null;
  }
}

export let authService = new AuthService({
  tag: 'default AuthService'
});

export let gAuthService = authService;

console.log('After Create AuthService');
