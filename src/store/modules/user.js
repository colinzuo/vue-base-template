import { gAuthService, gUserSerivce } from '@/services';
import router from '@/router';

const {token, expiredAt} = gAuthService.getTokenInfo() || {};

const state = {
  expiredAt,
  name: '',
  roles: [],
  token,
};

const mutations = {
  setExpiredAt: (state, expiredAt) => {
    state.expiredAt = expiredAt;
  },
  setName: (state, name) => {
    state.name = name;
  },
  setRoles: (state, roles) => {
    state.roles = roles;
  },
  setToken: (state, token) => {
    state.token = token;
  },

  resetTokenInfo: (state) => {
    state.expiredAt = '';
    state.name = '';
    state.roles = [];
    state.token = '';
  },
};

const actions = {
  // user form login
  async formLogin({ commit }, formLoginData) {
    const { username, password } = formLoginData;

    let response = await gUserSerivce.formLogin({ username, password });

    const { expiredAt, token } = response.data;

    commit('setExpiredAt', expiredAt);
    commit('setToken', token);

    gAuthService.setTokenInfo({ token, expiredAt });
  },

  // get user info
  async getUserInfo({ commit }) {
    const response = await gUserSerivce.getUserInfo();

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

    router.push({name: 'login'});
  },

  // user logout
  async logout({ dispatch }) {
    await gUserSerivce.logout();
    await dispatch('resetTokenInfo');
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
