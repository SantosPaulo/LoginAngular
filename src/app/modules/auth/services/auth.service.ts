import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '@app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObservable = new BehaviorSubject<User>(null);
  userCast = this.userObservable.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  signin(data: Credential): Observable<any> {
    return this.http.post<Credential>(this._makeUrl('signup'), data);
  }

  signup(data: Credential) {
    return this.http.post<Credential>(this._makeUrl('signin'), data);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_expires_in');
    this.router.navigateByUrl('/auth/signin');
  }

  setSession(token: string) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('jwt_expires_in', '0');

    this.getUser().subscribe((res: any) => {
      this.userObservable.next(res.user);
    });
    this.router.navigateByUrl('/dashboard');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    return token ? true: false;
    // return moment().isBefore(this.expiresin);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this._makeUrl('/user'));
  }

  private _makeUrl(uri: string = ''): string {
    return `${env.api_url}/${uri}`;
  }

  get expiresin(): string|null {
    return localStorage.getItem('jwt_expires_in');
  }
}
