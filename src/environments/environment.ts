/**
 * 开发环境配置
 */
export const environment = {
  production: false,

  // SSO 认证服务器配置
  sso: {
    serverUrl: 'http://127.0.0.1:8888',
    loginPath: '/sso/login',
    logoutPath: '/sso/logout',
    verifyPath: '/sso/api/verify'
  },

  // API 服务器配置 (如果需要)
  api: {
    baseUrl: 'http://localhost:8080'
  }
};
