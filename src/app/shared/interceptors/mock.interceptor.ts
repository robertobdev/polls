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
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as authMock from '../mocks/auth-login.mock.json';
import * as authUserMock from '../mocks/auth-user.mock.json';
import * as aclConfigurationsMock from '../mocks/acl-configuration.mock.json';
import { LoginResponse } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';

const authToken: LoginResponse = (authMock as any).default;
const authUser: User = (authUserMock as any).default;
const aclConfigurations = (aclConfigurationsMock as any).default;

const urls = [
  {
    url: `${environment.baseUrl}/auth`,
    json: authToken,
    method: 'POST',
    hasError: () => false,
  },
  {
    url: `${environment.baseUrl}/auth/user`,
    json: authUser,
    method: 'GET',
    hasError: () => false,
  },
  {
    url: `${environment.baseUrl}/acl/configurations`,
    json: aclConfigurations,
    method: 'GET',
    hasError: () => false,
  },
];

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {
    for (const element of urls) {
      const sameUrl = httpRequest.url === element.url;
      const sameMethod = httpRequest.method === element.method;
      if (sameUrl && sameMethod) {
        if (element.hasError()) {
          return throwError({
            error: {
              code: 404,
              message: 'Token indisponível!',
            },
          });
        }
        return of(new HttpResponse({ status: 200, body: element.json }));
      }
    }

    return next.handle(httpRequest);
  }
}
