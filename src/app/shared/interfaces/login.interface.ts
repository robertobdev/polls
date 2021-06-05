export interface Login {
  login: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refreshToken: string;
}
export interface DecodedToken {
  sub: string;
  iat: string;
}
