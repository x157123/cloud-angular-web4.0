import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MessageComponent } from "./layouts/full/msg/message.component";

import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

//自定义分页样式
import {MatPaginatorIntlCN} from "@common/i18n/paginator.translate";
import {MatPaginatorIntl} from "@angular/material/paginator";

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "@common/http/auth.Interceptor";

@NgModule({
    declarations: [
        FullComponent,
        AppComponent,
        AppSidebarComponent,
        MessageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        MatInputModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSelectModule,
        MatOptionModule
    ],
    providers: [
      { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCN },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
  exports: [
    AppSidebarComponent
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
