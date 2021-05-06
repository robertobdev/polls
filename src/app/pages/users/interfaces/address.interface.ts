import { Default } from '../../../shared/interfaces/default-entity.interface';
import { Person } from './person.interface';

export interface Address extends Default {
  personId?: number;
  person?: Person;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
}
