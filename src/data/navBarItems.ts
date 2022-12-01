export const navBar = [
  {
    title: 'Home',
    href: '/',
  },
];

export const navBarAdmin: any[] = [
  {
    title: 'Profile',
    href: '/admin/profile',
  },
  {
    title: 'Logout',
    href: '/admin/login',
  },
];

const navBarItems: { navBar: object[]; navBarAdmin: object[] } = {
  navBar,
  navBarAdmin,
};

export default navBarItems;
