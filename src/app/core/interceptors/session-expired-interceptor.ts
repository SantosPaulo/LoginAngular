import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredComponent } from '@app/modules/session-expired/components/session-expired/session-expired.component';
import { tap } from 'rxjs/operators';

export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthService,
        public readonly dialog: MatDialog
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        return next.handle(req)
                   .pipe(
                       tap(
                           () => {},
                           err => {
                                if (err instanceof HttpErrorResponse) {
                                    if (err.status === 401) {
                                        this._openDialog();
                                        this.authService.logout();
                                    }
                                }
                           }
                       )
                   );
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
