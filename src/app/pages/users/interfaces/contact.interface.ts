import { Default } from './../../../shared/interfaces/default-entity.interface';
import { Person } from './person.interface';

export interface Contact extends Default {
  personId?: number;
  person?: Person;
  contactType: string;
  value: string;
  complement?: string;
}
