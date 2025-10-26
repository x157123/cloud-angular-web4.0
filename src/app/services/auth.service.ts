import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * SSO 认证服务
 * 负责 Token 管理、用户验证和 SSO 登录重定向
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // SSO 服务器配置 (从环境配置读取)
  private readonly SSO_SERVER_URL = environment.sso.serverUrl;
  private readonly TOKEN_KEY = 'sso_token';
  private readonly USER_KEY = 'sso_user';
  private readonly INVALID_TOKEN_KEY = 'invalid_sso_token'; // 记录无效的 token
  private readonly TOKEN_VERIFY_TIME_KEY = 'sso_token_verify_time'; // 记录上次验证时间
  private readonly TOKEN_CACHE_DURATION = 5 * 60 * 1000; // Token 缓存时间：5分钟

  constructor(private http: HttpClient) {}

  /**
   * 获取 Token
   * 1. 先从 URL 参数中获取 (SSO 登录成功后重定向回来时)
   * 2. 如果 URL 中没有,从 localStorage 获取
   */
  getToken(): string | null {
    // 检查 URL 参数中是否有 sso_token
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get(this.TOKEN_KEY);

    if (urlToken) {
      // 检查这个 token 是否之前被标记为无效
      const invalidToken = localStorage.getItem(this.INVALID_TOKEN_KEY);
      if (invalidToken === urlToken) {
        console.warn('URL 中的 Token 已被标记为无效，清除 URL 参数并重定向');
        // 清除 URL 中的 token
        const url = new URL(window.location.href);
        url.searchParams.delete(this.TOKEN_KEY);
        window.history.replaceState({}, document.title, url.toString());
        // 不保存到 localStorage，直接返回 null
        return null;
      }

      // 保存到 localStorage
      localStorage.setItem(this.TOKEN_KEY, urlToken);
      return urlToken;
    }

    // 从 localStorage 获取
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * 清除 URL 中的 token 参数
   * 注意: 这个方法应该在路由守卫验证成功后调用,而不是在 getToken 中调用
   * 避免在路由导航过程中修改 URL 导致路由混乱
   */
  clearTokenFromUrl(): void {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(this.TOKEN_KEY)) {
      const url = new URL(window.location.href);
      url.searchParams.delete(this.TOKEN_KEY);
      window.history.replaceState({}, document.title, url.toString());
    }
  }

  /**
   * 验证 Token 是否有效（带缓存机制）
   */
  async verifyToken(token: string, forceVerify: boolean = false): Promise<boolean> {
    try {
      // 检查这个 token 是否之前验证失败过
      const invalidToken = localStorage.getItem(this.INVALID_TOKEN_KEY);
      if (invalidToken === token) {
        console.warn('该 Token 之前验证失败过，跳过重复验证');
        return false;
      }

      // 如果不是强制验证，检查缓存
      if (!forceVerify) {
        const lastVerifyTime = localStorage.getItem(this.TOKEN_VERIFY_TIME_KEY);
        if (lastVerifyTime) {
          const timeSinceLastVerify = Date.now() - parseInt(lastVerifyTime);
          if (timeSinceLastVerify < this.TOKEN_CACHE_DURATION) {
            console.log(`Token 验证缓存命中，距上次验证 ${Math.round(timeSinceLastVerify / 1000)} 秒`);
            // 检查本地是否有用户信息
            const userInfo = this.getUserInfo();
            if (userInfo?.valid) {
              return true;
            }
          }
        }
      }

      console.log('向服务器验证 Token...');
      const response = await firstValueFrom(
        this.http.get<any>(`${environment.sso.verifyPath}?token=${token}`)
      );

      if (response.success && response.data?.valid) {
        // 保存用户信息
        if (response.data.username) {
          const userInfo = {
            username: response.data.username,
            valid: true
          };
          localStorage.setItem(this.USER_KEY, JSON.stringify(userInfo));
        }
        // 记录验证时间
        localStorage.setItem(this.TOKEN_VERIFY_TIME_KEY, Date.now().toString());
        // 清除无效 token 标记
        localStorage.removeItem(this.INVALID_TOKEN_KEY);
        return true;
      }

      // Token 验证失败，记录这个无效的 token
      console.warn('Token 验证失败，标记为无效:', token.substring(0, 20) + '...');
      localStorage.setItem(this.INVALID_TOKEN_KEY, token);
      return false;
    } catch (error) {
      console.error('Token 验证请求失败:', error);
      // 网络错误时也标记为无效，避免循环
      localStorage.setItem(this.INVALID_TOKEN_KEY, token);
      return false;
    }
  }

  /**
   * 检查登录状态
   * 返回用户信息,如果未登录或 Token 无效则返回 null
   */
  async checkLogin(): Promise<any | null> {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    // 验证 Token 是否有效
    const isValid = await this.verifyToken(token);

    if (!isValid) {
      this.clearAuth();
      return null;
    }

    // 返回用户信息
    return this.getUserInfo();
  }

  /**
   * 获取用户信息
   */
  getUserInfo(): any | null {
    const userInfoStr = localStorage.getItem(this.USER_KEY);
    return userInfoStr ? JSON.parse(userInfoStr) : null;
  }

  /**
   * 重定向到 SSO 登录页面
   */
  redirectToLogin(): void {
    const currentUrl = window.location.href;
    // 清除 URL 中可能存在的旧 token 参数
    const url = new URL(currentUrl);
    url.searchParams.delete(this.TOKEN_KEY);

    const cleanUrl = url.toString();
    const loginUrl = `${this.SSO_SERVER_URL}${environment.sso.loginPath}?redirect_url=${encodeURIComponent(cleanUrl)}`;

    console.log('重定向到 SSO 登录页:', loginUrl);
    window.location.href = loginUrl;
  }

  /**
   * 退出登录
   */
  logout(redirectUrl?: string): void {
    const targetUrl = redirectUrl || window.location.origin;
    this.clearAuth();

    const logoutUrl = `${environment.sso.logoutPath}?redirect_url=${encodeURIComponent(targetUrl)}`;
    window.location.href = logoutUrl;
  }

  /**
   * 清除本地认证信息
   */
  clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.INVALID_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_VERIFY_TIME_KEY);
  }

  /**
   * 判断用户是否已登录 (仅检查本地 Token 是否存在)
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
