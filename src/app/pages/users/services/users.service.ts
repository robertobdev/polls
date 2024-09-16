/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CrudList } from 'src/app/shared/interfaces/crud-list.interface';
import {
  GraphqlList,
  GraphqlOne,
} from 'src/app/shared/interfaces/graphql.interface';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { USER_GRAPHQL_TYPES } from '../interfaces/users-graphql-type.enum';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  BASEURL = environment.baseUrl;

  private graphQL: { [key: string]: any } = {
    addresses: (id: number): string => `{
      user(id: ${id}) {
        addresses {
          id,
          zipcode,
          street,
          number,
          neighborhood,
          complement,
          city,
          state,
          country,
        }
      }
    }`,
    contacts: (id: number): string => `{
      user(id: ${id}) {
        contacts {
          id,
          contactType,
          value,
          complement
        }
      }
    }`,
  };

  constructor(private _httpClient: HttpClient, private apollo: Apollo) {}

  getPeople({
    page,
    field,
    order,
    filter,
  }: CrudList): Observable<ApolloQueryResult<GraphqlList<User>>> {
    return this.apollo.watchQuery<GraphqlList<User>>({
      query: gql`
        {
          people(
            crudList: { page: ${page},filter: "${filter}",field: "${field}", order: "${order}" }
          ) {
            totalCount
            hasNextPage
            nodes {
              id
              name
              email
              cpf
            }
          }
        }
      `,
    }).valueChanges;
  }

  saveUser(user: User): Promise<any> {
    return this._httpClient.post(`${this.BASEURL}/users`, user).toPromise();
  }

  updateUser(id: number, user: User): Promise<any> {
    return this._httpClient
      .post(`${this.BASEURL}/users/${id}`, user)
      .toPromise();
  }

  //TODO: Fix this eslint
  getUser(
    id: number,
    type: USER_GRAPHQL_TYPES
  ): Observable<ApolloQueryResult<GraphqlOne<User>>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const query = this.graphQL[type](id);

    return this.apollo.watchQuery<GraphqlOne<User>>({
      query: gql`
        ${query}
      `,
    }).valueChanges;
  }
}
