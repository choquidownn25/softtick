import { NavItem } from './nav-item/nav-item';

export const navItems: any[] = [
  {
    id: 1,
    name: 'Sample Page',
    children: [
      { navCap: 'Sample Page' },
      {
        displayName: 'Starter',
        iconName: 'solar:widget-add-line-duotone',
        route: '/starter',
      },
      {
        displayName: 'Kanban',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/starter/kanban',
      },

    ],
  },
  {
    id: 2,
    name: 'Authentication Pages',
    children: [
      { navCap: 'Auth' },
      {
        displayName: 'Login',
        iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
        route: '/authentication/login',
      },
      {
        displayName: 'Register',
        iconName: 'solar:user-plus-rounded-line-duotone',
        route: '/authentication/side-register',
      },
    ],
  },
  {
    id: 3,
    name: 'Other',
    children: [
      { navCap: 'Other' },
      {
        displayName: 'Menu Level',
        iconName: 'solar:align-horizontal-center-line-duotone',
        route: '/menu-level',
        children: [
          {
            displayName: 'Menu 1',
            iconName: 'solar:round-alt-arrow-right-line-duotone',
            route: '/menu-1',
            children: [
              {
                displayName: 'Menu 1',
                subItemIcon: true,
                iconName: 'solar:round-alt-arrow-right-line-duotone',
                route: '/menu-1',
              },

              {
                displayName: 'Menu 2',
                subItemIcon: true,
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
        iconName: 'solar:bookmark-circle-line-duotone',
        route: '/disabled',
        disabled: true,
      },
      {
        displayName: 'Chip',
        iconName: 'solar:branching-paths-up-line-duotone',
        route: '/',
        chip: true,
        chipClass: 'bg-primary text-white',
        chipContent: '9',
      },
      {
        displayName: 'Outlined',
        iconName: 'solar:add-square-line-duotone',
        route: '/',
        chip: true,
        chipClass: 'b-1 border-primary text-primary',
        chipContent: 'outlined',
      },
      {
        displayName: 'External Link',
        iconName: 'solar:link-round-angle-bold-duotone',
        route: 'https://www.google.com/',
        external: true,
      },
    ],
  }
];
