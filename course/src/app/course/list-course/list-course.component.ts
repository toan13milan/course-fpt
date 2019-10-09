import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  role = '';
  userId = '';
  courseData = []
  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.role = localStorage.getItem('role')

    if(!this.role) {
      this.router.navigateByUrl('/login');
    }
    this.userId = localStorage.getItem('userId')
    if (this.role === 'admin') {
      this.courseService.getCategories().subscribe(val => {
        val.result.map(cate => {
          this.courseData.push({
            id: cate._id,
            name: cate.name,
            data: []
          })
        })
      this.courseService.getCourse().subscribe(course => {
        if (course.result.length) {
          this.courseData.map(c => {
            course.result.map(d => {
              if (d.categoryId === c.id) {
                c.data.push(d)
              }
            })
          })
        }
      })
      })
    } else if (this.role === 'trainer') {

      this.courseService.getCategories().subscribe(val => {
        val.result.map(cate => {
          this.courseData.push({
            id: cate._id,
            name: cate.name,
            data: []
          })
        })
      this.courseService.getCourseByTrainer(this.userId).subscribe(course => {
        if (course.result.length) {
          this.courseData.map(c => {
            course.result.map(d => {
              if (d.categoryId === c.id) {
                c.data.push(d)
              }
            })
          })
        }
      })
      })
    } else if (this.role === 'trainee') {
      this.courseService.getCategories().subscribe(val => {
        val.result.map(cate => {
          this.courseData.push({
            id: cate._id,
            name: cate.name,
            data: []
          })
        })
      this.courseService.getCourseByTrainee(this.userId).subscribe(course => {
        if (course.result.length) {
          this.courseData.map(c => {
            course.result.map(d => {
              if (d.categoryId === c.id) {
                c.data.push(d)
              }
            })
          })
        }
      })
      })
    }
  }

}
