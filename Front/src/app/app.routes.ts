import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { AppKanbanComponent } from './kanban/kanban.component';

export const routes: Routes = [

  // 🔹 Redirección inicial
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 🔹 LOGIN (layout blanco)
  {
    path: 'login',
    component: AppSideLoginComponent,
    children: [
      {
        path: '',
        component: AppSideLoginComponent
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'sample-page',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },

    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: 'login',
    component: BlankComponent,
    children: [
      {
        path: '',
        component: AppSideLoginComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
