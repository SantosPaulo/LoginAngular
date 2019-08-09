import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as  env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private readonly http: HttpClient) {}

  downloadTestFile(): Observable<any> {
    return this.http.get(env.api_url + '/download', {
      responseType: 'blob' as 'json'
    });
  }
}
