import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthResolver implements Resolve<any> {

    constructor(
        private readonly authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.authService.getUser().pipe(
            tap((res: any) => this.authService.setUser(res.user))
        );
    }
}
