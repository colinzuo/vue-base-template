import { gStorageService } from "@/services";

const tokenInfoKey = 'token-info';

class AuthService {
  constructor({tag}) {
    this.tag = tag;
    this.tokenInfo = null;
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

    gStorageService.setItem(tokenInfoKey, tokenInfo);

    this.tokenInfo = tokenInfo;
  }

  removeTokenInfo() {
    console.log(`${this.tag}  removeTokenInfo Enter`);

    gStorageService.removeItem(tokenInfoKey);

    this.tokenInfo = null;
  }
}

export let authService = new AuthService({
  tag: 'default AuthService'
});

console.log('After Create AuthService');
