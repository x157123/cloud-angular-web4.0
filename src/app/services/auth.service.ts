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
      // 保存到 localStorage
      localStorage.setItem(this.TOKEN_KEY, urlToken);

      // 清除 URL 中的 token 参数 (安全考虑)
      const url = new URL(window.location.href);
      url.searchParams.delete(this.TOKEN_KEY);
      window.history.replaceState({}, document.title, url.toString());

      return urlToken;
    }

    // 从 localStorage 获取
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * 验证 Token 是否有效
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.SSO_SERVER_URL}/sso/api/verify?token=${token}`)
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
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token 验证失败:', error);
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
    const loginUrl = `${this.SSO_SERVER_URL}/sso/login?redirect_url=${encodeURIComponent(cleanUrl)}`;

    console.log('重定向到 SSO 登录页:', loginUrl);
    window.location.href = loginUrl;
  }

  /**
   * 退出登录
   */
  logout(redirectUrl?: string): void {
    const targetUrl = redirectUrl || window.location.origin;
    this.clearAuth();

    const logoutUrl = `${this.SSO_SERVER_URL}/sso/logout?redirect_url=${encodeURIComponent(targetUrl)}`;
    window.location.href = logoutUrl;
  }

  /**
   * 清除本地认证信息
   */
  clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * 判断用户是否已登录 (仅检查本地 Token 是否存在)
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
