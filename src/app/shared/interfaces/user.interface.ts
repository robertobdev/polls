import { MenuItem } from './menu.interface';

export interface User {
  name: string;
  email: string;
  avatar: string;
  cpf: string;
  birthday: string;
  gender: string;
  menus: MenuItem[];
}
