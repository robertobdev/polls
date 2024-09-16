import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Acl,
  AclResponse,
  AclSaveBody,
} from 'src/app/shared/interfaces/acl.interface';
import { environment } from 'src/environments/environment';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GraphqlList } from './../../../shared/interfaces/graphql.interface';
import { ApolloQueryResult } from '@apollo/client/core';
import { CrudList } from 'src/app/shared/interfaces/crud-list.interface';
@Injectable({
  providedIn: 'root',
})
export class AclService {
  BASEURL = environment.baseUrl;

  constructor(private _httpClient: HttpClient, private apollo: Apollo) {}

  getAcls({
    page,
    field,
    order,
    filter,
  }: CrudList): Observable<ApolloQueryResult<GraphqlList<Acl>>> {
    return this.apollo.watchQuery<GraphqlList<Acl>>({
      query: gql`
        {
          acls(
            crudList: { page: ${page},filter: "${filter}",field: "${field}", order: "${order}" }
          ) {
            totalCount
            hasNextPage
            nodes {
              id
              module {
                description
              }
              role {
                description
              }
            }
          }
        }
      `,
    }).valueChanges;
  }

  saveAcl(acl: AclSaveBody): Promise<any> {
    return this._httpClient.post(`${this.BASEURL}/acl`, acl).toPromise();
  }

  getAcl(id: number): Promise<any> {
    return this._httpClient.get(`${this.BASEURL}/acl/${id}`).toPromise();
  }

  getAclConfigurations(): Promise<AclResponse> {
    return this._httpClient
      .get<AclResponse>(`${this.BASEURL}/acl/configurations`)
      .toPromise();
  }
}
