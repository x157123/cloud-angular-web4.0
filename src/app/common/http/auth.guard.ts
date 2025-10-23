import {ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

// 重定向计数器 - 用于检测重定向循环
let redirectCount = 0;
let lastRedirectTime = 0;
const MAX_REDIRECTS = 3; // 最大重定向次数
const REDIRECT_RESET_TIME = 10000; // 10秒后重置计数器

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
    // 检测重定向循环
    const now = Date.now();
    if (now - lastRedirectTime > REDIRECT_RESET_TIME) {
      // 超过重置时间，重置计数器
      redirectCount = 0;
    }

    redirectCount++;
    lastRedirectTime = now;

    if (redirectCount > MAX_REDIRECTS) {
      console.error('【路由守卫】检测到重定向循环！已阻止第', redirectCount, '次重定向');
      console.error('可能的原因：1) SSO 服务器返回的 token 无效 2) token 验证接口异常 3) 网络问题');
      console.error('请检查浏览器控制台的网络请求，或清除 localStorage 后重试');
      // 清除所有认证信息，停止重定向
      authService.clearAuth();
      alert('登录失败：检测到重定向循环。请刷新页面重试，或联系管理员。');
      return false;
    }

    // 未登录或 Token 无效,重定向到 SSO 登录页
    console.warn('【路由守卫】未登录,重定向到 SSO 登录页 (第', redirectCount, '次)');
    authService.redirectToLogin();
    return false;
  }

  // 登录成功，重置计数器
  redirectCount = 0;
  console.log('【路由守卫】登录验证通过,用户:', userInfo.username);

  // 验证成功后清除 URL 中的 token 参数 (安全考虑)
  // 必须在路由守卫验证完成后才能清除,避免导航过程中修改 URL 引起路由混乱
  authService.clearTokenFromUrl();

  return true;
};
