/**
 * 生产环境配置
 */
export const environment = {
  production: true,

  // SSO 认证服务器配置
  sso: {
    serverUrl: 'http://127.0.0.1:8888',
    loginPath: '/sso/login',
    logoutPath: '/sso/logout',
    verifyPath: '/sso/api/verify'
  },

  // API 服务器配置 (根据生产环境实际配置)
  api: {
    baseUrl: 'https://your-production-api.com'
  }
};
