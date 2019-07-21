import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/auth/signin');
        }
        return next.handle(req);
    }
}
