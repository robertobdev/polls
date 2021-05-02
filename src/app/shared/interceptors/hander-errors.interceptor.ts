import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {
  HttpErrorResponse as IHttpErrorResponse,
  HttpResponse as IHttpResponse,
} from '../interfaces/http.interface';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToastrService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request).pipe(
      tap(
        (response) => {
          const httpResponse = response as HttpResponse<IHttpResponse>;
          const isGetMethod = httpResponse.type && request.method === 'GET';
          const isGraphql = httpResponse.url?.includes('graphql');

          if (!httpResponse.type || isGetMethod || isGraphql) {
            return;
          }
          this.toasterService.success(httpResponse.body?.message, 'Sucesso:');
        },
        ({ error }: HttpErrorResponse) => {
          const { data, message } = error as IHttpErrorResponse;

          if (!Array.isArray(data)) {
            this.toasterService.error(message, 'ERRO:');
            return;
          }

          for (const errorItem of data) {
            Object.keys(errorItem).forEach((key: string) => {
              this.toasterService.error(`${key}: ${errorItem[key]}`, 'Erro:');
            });
          }
        }
      )
    );
  }
}
