import { gStorageService } from "@/services";

const tokenInfoKey = 'token-info';

class AuthService {
  constructor({tag}) {
    this.tag = tag;
    this.tokenInfo = null;
  }

  getTokenInfo() {
    console.log('getTokenInfo Enter');

    if (!this.tokenInfo) {
      this.tokenInfo = gStorageService.getItem(tokenInfoKey);
    }

    return this.tokenInfo;
  }

  setTokenInfo(tokenInfo) {
    console.log('setTokenInfo Enter');

    gStorageService.setItem(tokenInfoKey, tokenInfo);

    this.tokenInfo = tokenInfo;
  }

  removeTokenInfo() {
    console.log('removeTokenInfo Enter');

    gStorageService.removeItem(tokenInfoKey);

    this.tokenInfo = null;
  }
}

export let authService = new AuthService({
  tag: 'default'
});
