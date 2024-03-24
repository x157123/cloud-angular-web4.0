import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import {profileGuard} from '@common/http/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivateChild: [profileGuard],
    children: [
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import('./module/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'index',
        loadChildren: () => import('./module/index/index.module').then(m => m.IndexModule),
      },
      {
        path: 'flex',
        loadChildren: () => import('./module/flex/flex.module').then(m => m.FlexModule),
      },
      {
        path: 'deploy',
        loadChildren: () => import('./module/sync/deploy/deploy.module').then(m => m.DeployModule),
      },
      {
        path: 'flowable/flowableInitiateTask',
        loadChildren: () => import('./module/flowable/flowableInitiateTask/flowableInitiateTask.module').then(m => m.FlowableInitiateTaskModule),
      },
      {
        path: 'flowable/flowableManage',
        loadChildren: () => import('./module/flowable/flowableManage/flowableManage.module').then(m => m.FlowableManageModule),
      },
      {
        path: 'flowable/flowableTask',
        loadChildren: () => import('./module/flowable/flowableTask/flowableTask.module').then(m => m.FlowableTaskModule),
      },
      {
        path: 'help',
        loadChildren: () => import('./module/test/test.module').then(m => m.TestModule),
      },
      {
        path: 'form',
        loadChildren: () => import('./module/form/form-customization/form-customization.module').then(m => m.FormCustomizationModule),
      },

    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}


