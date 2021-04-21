import jwtDecode from 'jwt-decode';
import { IUser } from '../interfaces/user.interface';

export class JwtServiceUtil {
  static getDecodedAccessToken(token: string): IUser | null {
    try {
      return jwtDecode<IUser>(token);
    } catch (Error) {
      return null;
    }
  }
}
