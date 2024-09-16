import { Default } from './../../../shared/interfaces/default-entity.interface';
import { User } from './user.interface';

export interface Contact extends Default {
  userId?: number;
  user?: User;
  contactType: string;
  value: string;
  complement?: string;
}
