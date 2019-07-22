import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredComponent } from '../components/session-expired/session-expired.component';

export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        public readonly dialog: MatDialog
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        this._openDialog();
        
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/auth/signin');
        }
        return next.handle(req);
    }

    private _openDialog(): void {
        this.dialog.open(SessionExpiredComponent, {
            maxWidth: 'none',
            width: '100vw',
            height: '100vh',
            disableClose: true,
            closeOnNavigation: true
        });
    }
}
