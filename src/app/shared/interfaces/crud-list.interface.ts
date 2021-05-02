import { OrderList } from './crud-list.enum';

export interface CrudList {
  field?: string;
  order?: OrderList;
  limit?: number;
  offset?: number;
  page: number;
  filter: string;
}
