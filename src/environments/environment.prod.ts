/**
 * 生产环境配置
 */
export const environment = {
  production: true,

  // SSO 认证服务器配置
  sso: {
    serverUrl: 'http://127.0.0.1:8888',  // login 需要直接重定向到此地址（生产环境需修改）
    loginPath: '/sso/login',  // 完整路径：http://127.0.0.1:8888/sso/login
    logoutPath: '/api/cloud-auth/sso/logout',  // 通过代理或 Nginx 转发
    verifyPath: '/api/cloud-auth/sso/api/verify'  // 通过代理或 Nginx 转发
  },

  // API 服务器配置 (根据生产环境实际配置)
  api: {
    baseUrl: 'https://your-production-api.com'
  }
};
