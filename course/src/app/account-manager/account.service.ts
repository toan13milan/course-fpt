import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = 'http://localhost:3000/api/'
  constructor(private http: HttpClient) { }

  getAccounts(role: string): Observable<any> {
    return this.http.get(this.url + 'accounts?role=' + role)
  }

  addTrainer(trainers: any[]): Observable<any> {
    return this.http.post(this.url + 'trainer', trainers)
  }

  editTrainer(trainers: any[]): Observable<any> {
    return this.http.put(this.url + 'trainer', trainers)
  }
  deleteTrainer(id): Observable<any> {
    return this.http.delete(this.url + 'trainer/' + id)
  }



  addTrainee(trainers: any[]): Observable<any> {
    return this.http.post(this.url + 'trainee', trainers)
  }

  editTrainee(trainers: any[]): Observable<any> {
    return this.http.put(this.url + 'trainee', trainers)
  }
  deleteTrainee(id): Observable<any> {
    return this.http.delete(this.url + 'trainee/' + id)
  }

}
