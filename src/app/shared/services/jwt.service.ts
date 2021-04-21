import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../interfaces/login.interface';

export class JwtServiceUtil {
  static getDecodedAccessToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (Error) {
      return null;
    }
  }
}
