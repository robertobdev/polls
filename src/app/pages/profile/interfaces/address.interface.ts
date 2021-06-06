export interface Address {
  id?: number;
  zipcode: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  complement?: string;
}
