import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '@app/core/models/user';
import { shareReplay } from 'rxjs/operators';

// window.moment = moment;

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

  signup(data: Credential): Observable<any> {
    return this.http.post<Credential>(this._makeUrl('signup'), data).pipe(
      shareReplay()
    );
  }

  signin(data: Credential) {
    return this.http.post<Credential>(this._makeUrl('signin'), data).pipe(
      shareReplay()
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_expires_in');
    this.router.navigateByUrl('/auth/signin');
  }

  setSession(token: string, expires_in: number) {

    const expiresIn = moment().add(expires_in,'second');

    localStorage.setItem('jwt_token', token);
    localStorage.setItem('jwt_expires_in', JSON.stringify(expiresIn.valueOf()));

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
