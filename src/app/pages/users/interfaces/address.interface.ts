import { Default } from '../../../shared/interfaces/default-entity.interface';
import { User } from './user.interface';

export interface Address extends Default {
  userId?: number;
  user?: User;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
}
