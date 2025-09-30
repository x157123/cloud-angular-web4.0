import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCN } from '@common/i18n/paginator.translate';
import { AuthInterceptor } from '@common/http/auth.Interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCN },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};