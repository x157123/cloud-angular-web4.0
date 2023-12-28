import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'index',
        loadChildren: () => import('./module/index/index.module').then(m => m.IndexModule)
      },
      {
        path: 'flex',
        loadChildren: () => import('./module/flex/flex.module').then(m => m.FlexModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'flowable',
        loadChildren: () => import('./module/flowable/flowable.module').then(m => m.FlowableModule)
      },
      {
        path: 'deploy',
        loadChildren: () => import('./module/sync/deploy/deploy.module').then(m => m.DeployModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./module/sync/deploy/deploy.module').then(m => m.DeployModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
