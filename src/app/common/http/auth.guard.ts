import {ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

/**
 * 路由守卫
 * 在进入路由前检查用户是否已登录
 * 如果未登录或 Token 无效,则重定向到 SSO 登录页
 */
export const profileGuard: CanActivateChildFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {

  const authService = inject(AuthService);

  console.log('【路由守卫】检查登录状态:', route.url.toString());

  // 检查登录状态
  const userInfo = await authService.checkLogin();

  if (!userInfo) {
    // 未登录或 Token 无效,重定向到 SSO 登录页
    console.warn('【路由守卫】未登录,重定向到 SSO 登录页');
    authService.redirectToLogin();
    return false;
  }

  console.log('【路由守卫】登录验证通过,用户:', userInfo.username);
  return true;
};
