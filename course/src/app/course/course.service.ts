import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  API = 'http://localhost:3000/api/'
  constructor(private http: HttpClient) { }

  getTrainers():Observable<any> {
    return this.http.get(this.API + 'trainer')
  }
  getTopic():Observable<any> {
    return this.http.get(this.API + 'topic')
  }
  getCategories():Observable<any> {
    return this.http.get(this.API + 'category')
  }
  getCourse():Observable<any> {
    return this.http.get(this.API + 'course')
  }
  getCourseByTrainer(id):Observable<any> {
    return this.http.get(this.API + 'course-byTrainer/' + id)
  }
  getCourseByTrainee(id):Observable<any> {
    return this.http.get(this.API + 'course-byTrainee/' + id)
  }

  getCourseById(id: string):Observable<any> {
    return this.http.get(this.API + 'course-byCourse/' + id)
  }

  addCourse(course: any):Observable<any> {
    return this.http.post(this.API + 'course', course)
  }
  editCourse(course: any):Observable<any> {
    return this.http.put(this.API + 'course?id=' + course._id, course)
  }

}
