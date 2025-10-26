import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

/**
 * HTTP 拦截器
 * 1. 为所有请求自动添加 Authorization 头 (Bearer Token)
 * 2. 处理 401 未授权错误,重定向到 SSO 登录页
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 获取当前 Token
    const token = this.authService.getToken();

    // 克隆请求并添加 Authorization 头
    if (token) {
      // 排除 SSO 服务器的验证、登录、登出接口 (这些接口不需要 Authorization 头)
      const isSsoRequest = req.url.includes('/cloud-auth/sso/api/verify')
                        || req.url.includes('/cloud-auth/sso/login')
                        || req.url.includes('/cloud-auth/sso/logout');

      if (!isSsoRequest) {
        console.log('为请求添加 Token:', req.url);
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(req).pipe(
      tap({
        next: data => {},
        error: error => {
          // 处理 401 未授权错误
          if (error.status === 401) {
            console.warn('401 未授权,重定向到 SSO 登录页');
            // 清除本地认证信息
            this.authService.clearAuth();
            // 重定向到 SSO 登录页
            this.authService.redirectToLogin();
          }
        },
      })
    );
  }
}
