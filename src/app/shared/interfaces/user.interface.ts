import { ModuleItem } from './menu.interface';
import { Role } from './role.interface';

export interface User {
  name: string;
  email: string;
  avatar: string;
  cpf: string;
  birthday: string;
  gender: string;
  modules: ModuleItem[];
  roles: Role[];
  acl: Array<string>;
}
