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
        path: 'deploy',
        loadChildren: () => import('./module/sync/deploy/deploy.module').then(m => m.DeployModule)
      },
      {
        path: 'flowableInitiateTask',
        loadChildren: () => import('./module/flowable/flowableInitiateTask/flowableInitiateTask.module').then(m => m.FlowableInitiateTaskModule)
      },
      {
        path: 'flowableManage',
        loadChildren: () => import('./module/flowable/flowableManage/flowableManage.module').then(m => m.FlowableManageModule)
      },
      {
        path: 'flowableTask',
        loadChildren: () => import('./module/flowable/flowableTask/flowableTask.module').then(m => m.FlowableTaskModule)
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
