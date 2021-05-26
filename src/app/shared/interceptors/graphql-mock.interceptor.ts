/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO: Fix it
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as usersList from '../mocks/users-list.json';

const auth = (usersList as any).default;

const urls = [
  {
    url: `${environment.baseUrl.replace('/v1', '')}/graphql`,
    json: auth,
    query:
      '{"variables":{},"query":"{\\n  people(crudList: {page: 1, filter: \\"\\", field: \\"id\\", order: \\"desc\\"}) {\\n    totalCount\\n    hasNextPage\\n    nodes {\\n      id\\n      name\\n      email\\n      cpf\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
  },
];

@Injectable()
export class GraphqlMockInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {
    for (const element of urls) {
      const sameUrl = httpRequest.url === element.url;
      const sameQuery = JSON.stringify(httpRequest.body) === element.query;
      if (sameUrl && sameQuery) {
        return of(new HttpResponse({ status: 200, body: element.json }));
      }
    }

    return next.handle(httpRequest);
  }
}
