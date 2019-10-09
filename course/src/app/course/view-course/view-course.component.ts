import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit, AfterViewInit {

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private router: Router ) { }
  course = null;
  ngOnInit() {
    if(!localStorage.getItem("role")) {
      this.router.navigateByUrl('/login');
    }
  }
  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      console.log(paramsId.id);
      this.courseService.getCourseById(paramsId.id).subscribe(val => {
        this.course = val.result
        document.getElementById("courseDetail").innerHTML = this.course.detail
      })
  });
  }
}
