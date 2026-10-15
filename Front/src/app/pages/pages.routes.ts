import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AppKanbanComponent } from './apps/kanban/kanban.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      breadcrumb: true,
      urls: [
        // { title: 'Dashboard', url: '/dashboards/dashboard1' },
        // { title: 'Starter Page' },

        { title: 'Login', url: '/login' },
        { title: 'Starter Page' },
      ],
    },
  },
  {
    path: 'kanban',
    component: AppKanbanComponent,
    data: {
      title: 'Kanban Page',
      breadcrumb: true,
      urls: [
        // { title: 'Dashboard', url: '/dashboards/dashboard1' },
        // { title: 'Kanban Page' },
        { title: 'Login', url: '/login' },
        { title: 'Kanban Page' },
      ],
    },
  }
];
