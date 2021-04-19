/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { IHttpErro } from '../interfaces/httpError.interface';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request).pipe(
      tap(
        () => {},
        ({ error }: HttpErrorResponse) => {
          const errors = error as IHttpErro[];
          for (const err of errors) {
            this.toasterService.error(err.message, 'ERRO:');
          }
        }
      )
    );
  }
}
