import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { User } from '@app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private readonly http: HttpClient
  ) {}

  test(): Observable<User> {
    return this.http.get<User>(env.api_url + '/user');
  }
}
