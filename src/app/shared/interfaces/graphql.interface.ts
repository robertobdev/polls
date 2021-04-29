export interface GraphqlList<T> {
  [key: string]: GraphqlListPagination<T>;
}

export interface GraphqlListPagination<T> {
  hasNextPage: boolean;
  totalCount: number;
  nodes: T[];
}
