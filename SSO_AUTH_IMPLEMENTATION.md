# SSO 认证集成实施文档

## 概述

本文档描述了 Angular Web 应用与 Cloud Auth Server SSO 服务的集成实现。

## 架构设计

### 认证流程

```
┌─────────────────┐
│  用户访问应用    │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│  路由守卫验证登录状态    │ (auth.guard.ts)
└────────┬────────────────┘
         │
         ↓ 未登录
┌──────────────────────────────────────────┐
│  重定向到 SSO 登录页                      │
│  http://127.0.0.1:8888/sso/login     │
│  ?redirect_url=http://current-page       │
└────────┬─────────────────────────────────┘
         │
         ↓ 登录成功
┌──────────────────────────────────────────┐
│  SSO 服务器重定向回原页面 + Token         │
│  http://current-page?sso_token=xxx       │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│  AuthService 提取并保存 Token             │
│  存入 localStorage                        │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│  HTTP 拦截器自动添加 Bearer Token         │
│  Authorization: Bearer {token}           │
└──────────────────────────────────────────┘
```

## 核心文件说明

### 1. AuthService (src/app/services/auth.service.ts)

**职责:**
- Token 管理 (存储、读取、清除)
- SSO 登录重定向
- Token 验证
- 用户信息管理

**核心方法:**
- `getToken()`: 从 URL 或 localStorage 获取 Token
- `verifyToken(token)`: 调用 SSO 服务验证 Token
- `checkLogin()`: 完整的登录状态检查
- `redirectToLogin()`: 重定向到 SSO 登录页
- `logout()`: 退出登录

**配置:**
```typescript
// 从环境配置读取 SSO 服务器地址
private readonly SSO_SERVER_URL = environment.sso.serverUrl;
```

### 2. AuthInterceptor (src/app/common/http/auth.Interceptor.ts)

**职责:**
- 自动为所有 HTTP 请求添加 `Authorization` 头
- 处理 401 未授权错误

**工作原理:**
```typescript
// 1. 从 AuthService 获取 Token
const token = this.authService.getToken();

// 2. 克隆请求并添加 Authorization 头
req = req.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`
  }
});

// 3. 处理 401 错误
if (error.status === 401) {
  this.authService.redirectToLogin();
}
```

**已在应用配置中注册:**
```typescript
// src/app/app.config.ts
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
```

### 3. Auth Guard (src/app/common/http/auth.guard.ts)

**职责:**
- 路由进入前验证登录状态
- 未登录时阻止访问并重定向

**工作原理:**
```typescript
export const profileGuard: CanActivateChildFn = async (route, state) => {
  const authService = inject(AuthService);
  const userInfo = await authService.checkLogin();

  if (!userInfo) {
    authService.redirectToLogin();
    return false; // 阻止路由
  }

  return true; // 允许访问
};
```

**应用范围:**
```typescript
// src/app/app.routes.ts
{
  path: '',
  component: FullComponent,
  canActivateChild: [profileGuard], // 保护所有子路由
  children: [...]
}
```

### 4. 环境配置 (src/environments/)

**开发环境 (environment.ts):**
```typescript
export const environment = {
  production: false,
  sso: {
    serverUrl: 'http://127.0.0.1:8888',
    loginPath: '/sso/login',
    logoutPath: '/sso/logout',
    verifyPath: '/sso/api/verify'
  }
};
```

**生产环境 (environment.prod.ts):**
根据实际生产环境配置修改 `serverUrl`

### 5. 登录组件 (src/app/module/login/)

**login.component.ts:**
- 检查登录状态
- 自动重定向到 SSO 登录页

**login.component.html:**
- 显示登录提示
- 加载动画

## Token 管理机制

### Token 存储

```typescript
// LocalStorage 键名
private readonly TOKEN_KEY = 'sso_token';
private readonly USER_KEY = 'sso_user';
```

### Token 获取优先级

1. **URL 参数** (SSO 登录后重定向):
   ```
   http://your-app.com/page?sso_token=eyJhbGc...
   ```
   - 提取 Token → 保存到 localStorage
   - 清除 URL 中的 token 参数 (安全考虑)

2. **LocalStorage** (已登录用户):
   ```typescript
   localStorage.getItem('sso_token')
   ```

### Token 验证

调用 SSO 服务器验证接口:
```
GET http://127.0.0.1:8888/sso/api/verify?token={token}

Response:
{
  "success": true,
  "data": {
    "valid": true,
    "username": "admin"
  }
}
```

## 使用示例

### 在组件中使用 AuthService

```typescript
import { AuthService } from '@services/auth.service';

export class YourComponent {
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    // 检查登录状态
    const userInfo = await this.authService.checkLogin();

    if (userInfo) {
      console.log('当前用户:', userInfo.username);
    }
  }

  // 退出登录
  logout() {
    this.authService.logout();
  }

  // 获取用户信息
  getUserInfo() {
    return this.authService.getUserInfo();
  }
}
```

### 在模板中显示用户信息

```html
<div *ngIf="authService.isLoggedIn()">
  <p>欢迎, {{ authService.getUserInfo()?.username }}</p>
  <button (click)="logout()">退出</button>
</div>
```

### 发送带 Token 的 HTTP 请求

不需要手动添加 Token,拦截器会自动处理:

```typescript
// HTTP 请求会自动携带 Authorization: Bearer {token}
this.http.get('/api/user/profile').subscribe(data => {
  console.log(data);
});
```

## SSO 服务器端点

### 1. 登录页面
```
GET http://127.0.0.1:8888/sso/login?redirect_url={url}
```

### 2. API 登录
```
POST http://127.0.0.1:8888/sso/api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123",
  "redirectUrl": "http://your-app.com"
}
```

### 3. Token 验证
```
GET http://127.0.0.1:8888/sso/api/verify?token={token}
```

### 4. 退出登录
```
GET http://127.0.0.1:8888/sso/logout?redirect_url={url}
```

## 测试步骤

### 1. 启动 SSO 服务器

```bash
cd D:\code\java\service\spring-cloud\cloud-auth\cloud-auth-server
mvn spring-boot:run -Dspring-boot.run.profiles=sso
```

### 2. 配置 SSO 服务器

确保 `application-sso.yml` 配置正确:

```yaml
sso:
  jwt:
    secret: cloud-sso-secret-key-for-jwt-token-signing-minimum-256-bits-required
    expiration: 7200
  allowed-domains: http://localhost:4200,http://12.23.56.34
```

### 3. 启动 Angular 应用

```bash
cd D:\code\web\cloud-angular-web
npm install
ng serve
```

### 4. 测试流程

1. 访问 `http://localhost:4200`
2. 应自动重定向到 `http://127.0.0.1:8888/sso/login?redirect_url=...`
3. 输入用户名密码登录
4. 登录成功后自动返回应用
5. 打开浏览器开发者工具 → Application → Local Storage
   - 检查 `sso_token` 是否存在
6. 打开 Network 标签,查看后续请求
   - 检查请求头是否包含 `Authorization: Bearer {token}`

### 5. 测试退出

```typescript
// 在浏览器控制台执行
angular.element(document.body).injector.get('AuthService').logout();
```

## 安全注意事项

### 1. Token 存储安全

- ✅ Token 存储在 localStorage (刷新页面不丢失)
- ⚠️ XSS 风险: 确保应用没有 XSS 漏洞
- ✅ URL 中的 Token 立即清除 (防止泄露)

### 2. HTTPS

生产环境必须使用 HTTPS:
```typescript
// 修改 environment.prod.ts
sso: {
  serverUrl: 'https://sso.yourdomain.com'
}
```

### 3. Token 过期处理

- Token 过期时间: 2 小时 (可在 SSO 服务器配置)
- 过期后自动重定向到登录页

### 4. 白名单配置

SSO 服务器必须配置允许的重定向域名:
```yaml
sso:
  allowed-domains: http://localhost:4200,https://your-production-domain.com
```

## 故障排查

### 问题 1: 无限重定向循环

**原因:** SSO 服务器未启动或配置错误

**解决:**
1. 检查 SSO 服务器是否运行
2. 检查 `environment.ts` 中的 `serverUrl` 是否正确
3. 检查浏览器控制台错误

### 问题 2: Token 验证失败

**原因:** JWT 密钥不匹配或 Token 过期

**解决:**
1. 检查 SSO 服务器日志
2. 清除浏览器 localStorage
3. 重新登录

### 问题 3: 401 错误

**原因:** 后端服务未正确验证 Token

**解决:**
1. 检查后端服务是否配置了 JWT 验证
2. 确保 JWT 密钥与 SSO 服务器一致
3. 检查请求头是否包含 `Authorization: Bearer {token}`

### 问题 4: CORS 跨域错误

**原因:** SSO 服务器未配置 CORS

**解决:**
在 SSO 服务器添加 CORS 配置:
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
```

## 后续优化建议

### 1. Token 自动刷新

实现 Token 即将过期时自动刷新:
```typescript
// 在 AuthInterceptor 中添加
if (isTokenExpiringSoon(token)) {
  await this.authService.refreshToken();
}
```

### 2. 记住我功能

使用更长有效期的 Token:
```typescript
login(rememberMe: boolean) {
  // 传递 rememberMe 参数给 SSO 服务器
}
```

### 3. 多 Tab 同步

使用 BroadcastChannel 同步多个标签页的登录状态:
```typescript
const channel = new BroadcastChannel('auth_channel');
channel.postMessage({ type: 'logout' });
```

### 4. 离线检测

网络断开时暂时不验证 Token:
```typescript
if (navigator.onLine) {
  await this.verifyToken(token);
}
```

## 技术栈

- Angular 17+
- TypeScript
- RxJS
- Angular Router
- HttpClient
- LocalStorage API

## 相关文档

- [SSO 集成指南](D:\code\java\service\spring-cloud\cloud-auth\cloud-auth-server\SSO_INTEGRATION_GUIDE.md)
- [SSO 重新设计总结](D:\code\java\service\spring-cloud\cloud-auth\cloud-auth-server\SSO_REDESIGN_SUMMARY.md)

---

**实施完成日期:** 2025-10-22
**版本:** 1.0.0
