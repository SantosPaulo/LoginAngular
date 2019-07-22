import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredComponent } from '@app/modules/session-expired/components/session-expired/session-expired.component';

export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthService,
        public readonly dialog: MatDialog
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (!this.authService.isLoggedIn()) {
            // this._openDialog();
            this.authService.logout();
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
