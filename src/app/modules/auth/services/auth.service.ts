import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '@app/core/models/user';
import { shareReplay } from 'rxjs/operators';
import { Jwt } from '@app/core/models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObservable = new BehaviorSubject<User|any>(null);
  userCast$ = this.userObservable.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

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
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_expires_in');
    this.router.navigateByUrl('/auth/signin');
  }

  setSession(jwt: Jwt): void {

    const expiresIn = moment().add(jwt.token.expiresIn,'second');

    localStorage.setItem('jwt_token', jwt.token.token);
    localStorage.setItem('jwt_expires_in', JSON.stringify(expiresIn.valueOf()));

    const renewalExpiresIn = moment().add(jwt.renewalToken.renewalExpiresIn,'second');

    localStorage.setItem('jwt_renewal_token', jwt.renewalToken.renewalToken);
    localStorage.setItem('jwt_renewal_expires_in', JSON.stringify(renewalExpiresIn.valueOf()));

    this.router.navigateByUrl('/dashboard');
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

  get token(): string|null {
    return localStorage.getItem('jwt_token');
  }

  get expiresIn(): any {

    const expiration = localStorage.getItem("jwt_expires_in");
    const expiresIn = JSON.parse(expiration);
    
    return moment(expiresIn);
  }

  get user(): User {
    return this.userObservable.value;
  }
}
