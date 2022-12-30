import store from '@/store';

export function hasRole(targetRole) {
  const roles = store.getters && store.getters.roles;

  const has = roles.some(role => {
    return role === targetRole;
  });

  return has;
}

export function hasOneOfRole(roleList) {
  if (roleList && roleList instanceof Array && roleList.length > 0) {
    const roles = store.getters && store.getters.roles;

    const hasOneOf = roles.some(role => {
      return roleList.includes(role);
    });

    return hasOneOf;
  } else {
    throw new Error('hasOneOfRole: invalid input');
  }
}

export function hasRoutePermission(route) {
  for (const record of route.matched) {
    if (!record.meta.needRoles) {
      continue;
    }

    if (!hasOneOfRole(record.meta.needRoles)) {
      return false;
    }
  }

  return true;
}

