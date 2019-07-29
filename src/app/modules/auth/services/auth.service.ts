import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '@app/core/models/user';
import { shareReplay } from 'rxjs/operators';
import { Jwt } from '@app/core/models/jwt';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredComponent } from '@app/modules/session-expired/components/session-expired/session-expired.component';
import { Base } from '@app/classes/base';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Base {

  private userObservable = new BehaviorSubject<User|any>(null);
  userCast$ = this.userObservable.asObservable();

  private interval$: Observable<any> = interval(60000);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    public readonly dialog: MatDialog
  ) {
    super();
    this._initTokenChecker();
  }

  signup(data: Credential): Observable<Jwt> {
    return this.http.post<Jwt>(this._makeUrl('signup'), data).pipe(
      shareReplay()
    );
  }

  signin(data: Credential): Observable<Jwt> {
    return this.http.post<Jwt>(this._makeUrl('signin'), data).pipe(
      shareReplay()
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/signin');
  }

  setSession(jwt: Jwt): void {

    const expiresIn = moment(jwt.token.expiresIn);

    localStorage.setItem('jwt_token', jwt.token.token);
    localStorage.setItem('jwt_expires_in', JSON.stringify(expiresIn.valueOf()));

    const renewalExpiresIn = moment(jwt.renewalToken.renewalExpiresIn);

    localStorage.setItem('jwt_renewal_token', jwt.renewalToken.renewalToken);
    localStorage.setItem('jwt_renewal_expires_in', JSON.stringify(renewalExpiresIn.valueOf()));

    this.router.navigateByUrl( '/dashboard');
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.expiresIn);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this._makeUrl('/user')).pipe(
      shareReplay()
    );
  }

  setUser(user: User): void {
    this.userObservable.next(user);
  }

  private _makeUrl(uri: string = ''): string {
    return `${env.api_url}/${uri}`;
  }

  private _initTokenChecker(): void {
    this.subscriptions.add(
      this.interval$
          .pipe(shareReplay())
          .subscribe(() => {
            if (!this.isLoggedIn() && this.token !== null) {
              this.logout();
              this._openDialog();
              this.interval$ = null;
            }
          })
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

  get token(): string|null {
    return localStorage.getItem('jwt_token');
  }

  get expiresIn(): moment.Moment {

    const expiration = localStorage.getItem("jwt_expires_in");
    const expiresIn = JSON.parse(expiration);
    
    return moment(expiresIn);
  }

  get previousUrl(): string|null {
    return localStorage.getItem('previous_url');
  }

  get user(): User {
    return this.userObservable.value;
  }
}
