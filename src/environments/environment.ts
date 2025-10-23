/**
 * 开发环境配置
 */
export const environment = {
  production: false,

  // SSO 认证服务器配置
  sso: {
    serverUrl: 'http://127.0.0.1:8888',  // login 需要直接重定向到此地址
    loginPath: '/sso/login',  // 完整路径：http://127.0.0.1:8888/sso/login
    logoutPath: '/api/cloud-auth/sso/logout',  // 通过 proxy.conf.json 代理转发
    verifyPath: '/api/cloud-auth/sso/api/verify'  // 通过 proxy.conf.json 代理转发
  },

  // API 服务器配置 (如果需要)
  api: {
    baseUrl: 'http://localhost:8080'
  }
};
