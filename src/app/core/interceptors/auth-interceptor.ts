import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        const token = localStorage.getItem('jwt_token');
        const renewalToken = localStorage.getItem('jwt_renewal_token');

        if (token) {

            const clone = req.clone({
                headers: new HttpHeaders({
                    'X-RENEWAL-TOKEN': renewalToken,
                    'Authorization': token
                })
            });
            return next.handle(clone);
        } else {
            return next.handle(req);
        }
    }
}
