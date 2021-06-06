import { Address } from './address.interface';
import { Default } from 'src/app/shared/interfaces/default-entity.interface';
import { Contact } from './contact.interface';
import { GENDER } from './gender.enum';
import { ModuleItem } from '../../../shared/interfaces/menu.interface';
import { Role } from '../../../shared/interfaces/role.interface';

export interface User extends Default {
  id: number;
  name: string;
  cpf: string;
  email: string;
  birthday: string;
  gender: GENDER;
  avatar: string;
  addresses?: Address[];
  contacts?: Contact[];
  modules?: ModuleItem[];
  roles?: Role[];
  acl?: Array<string>;
}
