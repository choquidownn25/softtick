import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Starter',
    iconName: 'solar:chart-line-duotone',
    route: '/starter',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-unlocked-line-duotone',
    route: '/authentication/login',
  },
  {
    navCap: 'Other',
  },
  {
    displayName: 'Menu Level',
    iconName: 'solar:full-screen-square-line-duotone',
    route: '/menu-level',
    children: [
      {
        displayName: 'Menu 1',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/menu-1',
        children: [
          {
            displayName: 'Menu 1',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/menu-1',
          },

          {
            displayName: 'Menu 2',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/menu-2',
          },
        ],
      },

      {
        displayName: 'Menu 2',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/menu-2',
      },
    ],
  },
  {
    displayName: 'Disabled',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/disabled',
    disabled: true,
  },
];
