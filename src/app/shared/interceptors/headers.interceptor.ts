/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private NOT_NEED_AUTH = ['/auth', 'viacep'];
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && this.hasNotNeedAuth(httpRequest.url)) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(httpRequest);
  }

  private hasNotNeedAuth(fullUrl: string) {
    const endPoint = fullUrl.replace(environment.baseUrl, '');
    return !this.NOT_NEED_AUTH.find((router) => endPoint === router)?.length;
  }
}
