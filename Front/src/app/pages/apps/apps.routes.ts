import { Routes } from '@angular/router';
import { AppKanbanComponent } from './kanban/kanban.component';




export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'kanban',
        component: AppKanbanComponent,
        data: {
          title: 'Kanban',
          urls: [
            { title: 'Kanban' },
          ],
        },
      },






    ],
  },
];
