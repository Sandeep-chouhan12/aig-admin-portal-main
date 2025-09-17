import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService, private loaderService: LoaderService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



        this.shouldShowLoader(request) && this.showLoader();
        this.updateDataLoadedStatus(false)
        const token = this.authService.getToken();
        if (token != null) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(request).pipe(
                finalize(() => {
                    this.shouldShowLoader(request) && this.hideLoader();
                    this.updateDataLoadedStatus(true);
                })
            );

        } else {
            return next.handle(request);
        }

    }

    private showLoader() {
        this.updateDataLoadedStatus(false)
        this.loaderService.showLoader();
    }

    private hideLoader() {
        this.updateDataLoadedStatus(true);
        this.loaderService.hideLoader();
    }

    updateDataLoadedStatus(status: boolean) {
        this.loaderService.updateDataLoadedStatus(status);
    }

    shouldShowLoader(request: HttpRequest<unknown>): boolean {

        if (request.method === 'PUT' || request.method === 'DELETE') {
            return false; // no loader for PUT/DELETE
        }

        if (request.method === 'POST') {
            const body: any = request.body;
            if (body?.pageNo != null || body?.pageSize != null) {
                return true; // show loader if pagination in body
            }
            return request.params.keys().some(
                key =>
                    key === 'page' ||
                    key === 'size' ||
                    key === 'pageSize' ||
                    key === 'pageNo'
            );
        }

        return true;
    }
}
