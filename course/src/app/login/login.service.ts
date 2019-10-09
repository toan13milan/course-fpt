import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) { }
  logIn(userName: string, password: string, role: string): Observable<any> {
    return this.http.post(this.url + 'login', { userName, password, role })
  }
}
