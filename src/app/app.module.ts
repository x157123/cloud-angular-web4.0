import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {FullComponent} from './layouts/full/full.component';
import {AppSidebarComponent} from './layouts/full/sidebar/sidebar.component';
import {MessageComponent} from "./layouts/full/msg/message.component";

import {SharedModule} from './shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

//自定义分页样式
import {MatPaginatorIntlCN} from "@common/i18n/paginator.translate";
import {MatPaginatorIntl} from "@angular/material/paginator";

import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from "@common/http/auth.Interceptor";
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    FullComponent,
    AppComponent,
    AppSidebarComponent,
    MessageComponent,
  ],
  exports: [
    AppSidebarComponent
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatInputModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCN},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
}
