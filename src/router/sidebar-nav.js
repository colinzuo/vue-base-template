
export const mainNavItemsFull = [
  {
    icon: 'mdi-home',
    title: 'Home',
    route: {
      name: 'home',
    },
  },
  {
    icon: 'mdi-cog',
    title: 'System Management',
    needRoles: [
      'admin',
    ],
    children: [
      {
        title: 'User Management',
        route: {
          name: 'user-management',
        },
      },
    ],
  },
];
