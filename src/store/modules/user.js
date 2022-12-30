import { gAuthService, gUserService } from '@/services';
import router from '@/router';

const { token, expireAt } = gAuthService.getTokenInfo() || {};
const { name } = gAuthService.getUserNameInfo() || {};
const { password } = gAuthService.getPasswordInfo() || {};

const state = {
  isAdmin: false,
  isSysAdmin: false,
  roles: null,
  name,
  token,
  password,
  expireAt,
};

const mutations = {
  setExpireAt: (state, expireAt) => {
    state.expireAt = expireAt;
  },
  setName: (state, name) => {
    state.name = name;
  },
  setPassword: (state, password) => {
    state.password = password;
  },
  setRoles: (state, roles) => {
    state.roles = roles;

    state.isAdmin = roles.some(role => {
      return role === 'admin';
    });

    state.isSysAdmin = roles.some(role => {
      return role === 'sysAdmin';
    });
  },
  setToken: (state, token) => {
    state.token = token;
  },

  resetTokenInfo: (state) => {
    state.expireAt = '';
    state.isAdmin = false;
    state.isSysAdmin = false;
    state.name = '';
    state.roles = null;
    state.token = '';
    state.password = '';
  },
};

const actions = {
  // user form login
  async formLogin({ commit }, formLoginData) {
    const { username, password } = formLoginData;

    let response = await gUserService.formLogin({ username, password });

    const { expireAt, token } = response.data;

    commit('setExpireAt', expireAt);
    commit('setToken', token);
    commit('setName', username);
    commit('setPassword', password);

    gAuthService.setTokenInfo({ token, expireAt });
    gAuthService.setUserNameInfo({ 'name': username });
    gAuthService.setPasswordInfo({ password });
  },

  // get user info
  async getUserInfo({ commit }) {
    const response = await gUserService.getUserInfo();

    const { data } = response;

    if (!data) {
      throw new Error('Verification failed, please Login again.');
    }

    const { roles, username } = data;

    // roles must be a non-null array
    if (!roles) {
      throw new Error('getUserInfo: roles must be a non-null array!');
    }

    commit('setRoles', roles);
    commit('setName', username);

    return data;
  },

  // remove tokenInfo
  async resetTokenInfo({ commit }) {
    commit('resetTokenInfo');

    gAuthService.removeTokenInfo();

    router.push({ name: 'login' });
  },

  // user logout
  async logout({ dispatch }) {
    try {
      await gUserService.logout();
    } catch {
      console.log('logout met exception');
    }

    await dispatch('resetTokenInfo');

    // clear cache
    location.reload();
  },

  // // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'

  //   commit('SET_TOKEN', token)
  //   setToken(token)

  //   const { roles } = await dispatch('getInfo')

  //   // resetRouter()

  //   // generate accessible routes map based on roles
  //   // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   // router.addRoutes(accessRoutes)
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
