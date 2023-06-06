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
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
