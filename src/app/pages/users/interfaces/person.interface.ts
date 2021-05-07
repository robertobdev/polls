import { Address } from './address.interface';
import { Default } from 'src/app/shared/interfaces/default-entity.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Contact } from './contact.interface';
import { GENDER } from './gender.enum';

export interface Person extends Default {
  name: string;
  cpf: string;
  email: string;
  birthday: string;
  gender: GENDER;
  avatar: string;
  user?: User;
  addresses?: Address[];
  contacts?: Contact[];
}
