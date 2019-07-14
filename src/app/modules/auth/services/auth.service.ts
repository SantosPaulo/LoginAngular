import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    this.router.navigateByUrl('/signin');
  }

  setSession(token: string) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('jwt_expires_in', '0');
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.expiresin);
  }

  private _makeUrl(uri: string = ''): string {
    return `${env.api_url}/${uri}`;
  }

  get expiresin(): string|null {
    return localStorage.getItem('jwt_expires_in');
  }
}
