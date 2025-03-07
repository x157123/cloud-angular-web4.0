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
        redirectTo: '/automation/serverInfo',
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
      {
        path: 'code',
        loadChildren: () => import('./module/code/code.module').then(m => m.CodeModule),
      },
      {
        path: 'automation/accountInfo',
        loadChildren: () => import('./module/automation/accountInfo/accountInfo.module').then(m => m.AccountInfoModule)
      },
      {
        path: 'automation/applicationInfo',
        loadChildren: () => import('./module/automation/applicationInfo/applicationInfo.module').then(m => m.ApplicationInfoModule)
      },
      {
        path: 'automation/applicationLog',
        loadChildren: () => import('./module/automation/applicationLog/applicationLog.module').then(m => m.ApplicationLogModule)
      },
      {
        path: 'automation/emailInfo',
        loadChildren: () => import('./module/automation/emailInfo/emailInfo.module').then(m => m.EmailInfoModule)
      },
      {
        path: 'automation/gpuInfo',
        loadChildren: () => import('./module/automation/gpuInfo/gpuInfo.module').then(m => m.GpuInfoModule)
      },
      {
        path: 'automation/serverInfo',
        loadChildren: () => import('./module/automation/serverInfo/serverInfo.module').then(m => m.ServerInfoModule)
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


