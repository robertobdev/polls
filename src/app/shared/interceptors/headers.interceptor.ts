/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private NOTNEEDAUTH = ['/auth', 'viacep'];
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

  private hasNotNeedAuth(url: string) {
    return !this.NOTNEEDAUTH.find((router) => url.includes(router))?.length;
  }
}
