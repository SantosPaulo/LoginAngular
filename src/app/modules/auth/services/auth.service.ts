import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '@app/core/models/user';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObservable = new BehaviorSubject<User|any>(null);
  userCast = this.userObservable.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  signin(data: Credential): Observable<any> {
    return this.http.post<Credential>(this._makeUrl('signup'), data).pipe(
      shareReplay()
    );
  }

  signup(data: Credential) {
    return this.http.post<Credential>(this._makeUrl('signin'), data).pipe(
      shareReplay()
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_expires_in');
    this.router.navigateByUrl('/auth/signin');
  }

  /**
   * @param token
   * @todo Implement jwt_expires_in
   */
  setSession(token: string) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('jwt_expires_in', '0');
    this.router.navigateByUrl('/dashboard');
  }

  /**
   * @todo Implement expiration token.
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    return token ? true: false;
    // return moment().isBefore(this.expiresin);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this._makeUrl('/user'));
  }

  setUser(user: User): void {
    this.userObservable.next(user);
  }

  private _makeUrl(uri: string = ''): string {
    return `${env.api_url}/${uri}`;
  }

  get expiresin(): string|null {
    return localStorage.getItem('jwt_expires_in');
  }

  get user(): User {
    return this.userObservable.value;
  }
}
