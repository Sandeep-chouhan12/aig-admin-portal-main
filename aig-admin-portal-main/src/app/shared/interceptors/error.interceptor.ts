import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { AppUtil } from '../utils/app-util';
import { Constants } from '../utils/constants';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ComponentsRoutes } from '../utils/components-routes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong!';
        //   alert(error.status)

        switch (error.status) {
          case 0:

            AppUtil.openToast(
              'error',
              Constants.NO_INTERNET_CONNECTION_ERROR,
              'Error'
            );

            break;
          case 500: {
            AppUtil.openToast('error', 'Service Down '+error.message, 'Error');
            return EMPTY;
            break;
          }
          case 401: {
            this.authService.logOut();
            break;
          }
        }
        return throwError(error);
      })
    );
  }

}
