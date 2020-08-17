const APIUrl = 'http://127.0.0.1:8080/cca/';

const ouathPath = '';

export const environment = {

  production: false,
  oauth_path: ouathPath,

  TokenWhitelistedDomains: [/localhost:8080/],
  TokenBlacklistedRoutes: [/\/oauth\/token/],

  TokenBasic: 'Basic Y2xpZW50LWNvbnRyb2xlLWFuaW1haXM6Y29udHJvbGUtYW5pbWFpcy1zZWNyZXQ=',

  APICatalog: {
    APILogin: APIUrl + 'oauth/token',
    APIMenu: APIUrl + 'menu',
    APIPerfil: APIUrl + 'perfil',
    APIUser: APIUrl + 'user',
    APICorreios: APIUrl + 'correios'
  }
};
