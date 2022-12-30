const getters = {
  isAdmin: state => state.user.isAdmin,
  isSysAdmin: state => state.user.isSysAdmin,
  roles: state => state.user.roles,
  token: state => state.user.token,
  username: state => state.user.name,
  password: state => state.user.password,
};

export default getters;
