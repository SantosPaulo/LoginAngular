import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';

export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(
        private readonly route: Route
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        // handle if session is expired
        // redirect to login if is expired

        return next.handle(req);
    }
}
