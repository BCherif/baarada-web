import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomLayoutComponent} from './custom-layout/custom-layout.component';
import {AuthGuard} from "./shared/utils/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'views/dashboard-analytics',
        redirectTo: '/'
      },
      {
        path: '',
        loadChildren: () => import('./pages/views/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
        data: {
          title: 'Tableau de bord'
        }
      },
      {
        path: 'views',
        children: [
          {
            path: 'managment',
            loadChildren: () => import('./pages/views/managment/managment.module').then(m => m.ManagmentModule)
          },
        ],
        canActivate: [AuthGuard]
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
        data: {
          title: 'Login'
        }
      },

      {
        path: 'register',
        loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule),
        data: {
          title: 'Inscription'
        }
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
        data: {
          title: 'Mot de passe oublié'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
