import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CrudList } from 'src/app/shared/interfaces/crud-list.interface';
import { GraphqlList } from 'src/app/shared/interfaces/graphql.interface';
import { environment } from 'src/environments/environment';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  BASEURL = environment.baseUrl;

  constructor(private _httpClient: HttpClient, private apollo: Apollo) {}

  getPeople({
    page,
    field,
    order,
    filter,
  }: CrudList): Observable<ApolloQueryResult<GraphqlList<Person>>> {
    return this.apollo.watchQuery<GraphqlList<Person>>({
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

  savePerson(person: Person): Promise<any> {
    return this._httpClient.post(`${this.BASEURL}/people`, person).toPromise();
  }
  updatePerson(id: number, person: Person): Promise<any> {
    return this._httpClient
      .post(`${this.BASEURL}/people/${id}`, person)
      .toPromise();
  }

  getPerson(id: number): Promise<any> {
    return this._httpClient.get(`${this.BASEURL}/people/${id}`).toPromise();
  }
}
