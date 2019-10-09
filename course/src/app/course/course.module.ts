import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseManagerComponent } from './course-manager/course-manager.component';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatFormFieldModule
} from '@angular/material';
import { ListCourseComponent } from './list-course/list-course.component';
import { FormsModule } from '@angular/forms';
import { ViewCourseComponent } from './view-course/view-course.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

 const matModule = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatFormFieldModule,
]
@NgModule({
  declarations: [CourseManagerComponent, ListCourseComponent, ViewCourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    matModule,
    HttpClientModule,
    AngularEditorModule
  ]
})
export class CourseModule { }
