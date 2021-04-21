import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpError } from '../interfaces/httpError.interface';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToastrService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request).pipe(
      tap(
        () => {},
        ({ error }: HttpErrorResponse) => {
          const errors = error as HttpError[];
          for (const err of errors) {
            this.toasterService.error(err.message, 'ERRO:');
          }
        }
      )
    );
  }
}
