import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';

/**
 * 登录组件
 * 由于使用 SSO 统一登录,本组件主要用于:
 * 1. 显示登录提示信息
 * 2. 自动重定向到 SSO 登录页
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [
      CommonModule
    ]
})
export class LoginComponent implements OnInit {

  redirecting = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // 检查是否已经登录
    const token = this.authService.getToken();

    if (token) {
      console.log('用户已登录,Token 已存在');
      // 可以在这里跳转到首页或其他页面
      // this.router.navigate(['/']);
    } else {
      console.log('用户未登录,准备重定向到 SSO 登录页');
      // 自动重定向到 SSO 登录页
      this.redirectToSSO();
    }
  }

  /**
   * 重定向到 SSO 登录页
   */
  redirectToSSO(): void {
    this.redirecting = true;
    setTimeout(() => {
      this.authService.redirectToLogin();
    }, 1000); // 延迟 1 秒,让用户看到提示信息
  }

  /**
   * 手动触发登录
   */
  login(): void {
    this.authService.redirectToLogin();
  }
}
