import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseManagerComponent } from './course-manager/course-manager.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { ViewCourseComponent } from './view-course/view-course.component';


const routes: Routes = [
  { path: 'course', component: ListCourseComponent},
  { path: 'course-edit/:id', component: CourseManagerComponent},
  { path: 'course-view/:id', component: ViewCourseComponent},
  { path: 'course-add', component: CourseManagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
