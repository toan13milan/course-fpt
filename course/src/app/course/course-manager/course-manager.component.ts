import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
  invalid = true;
  form: FormGroup = new FormGroup({
  });
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '150px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: '',
    sanitize: true,
    toolbarPosition: 'top',
};
  course = {
    name: "",
    description: "",
    topicId: null,
    categoryId: null,
    trainerId: null,
    detail: ""
  }
  role = '';
  trainers = [];
  categories = [];
  topics = [];
  type = '';
  constructor(private courseService: CourseService,private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    console.log(this.router.url); 

    if(!this.role) {
      this.router.navigateByUrl('/login');
    }
    this.type = this.router.url.split('/')[2]
    if (this.type === 'course-edit') {
      this.activatedRoute.params.subscribe(paramsId => {
        console.log(paramsId.id);
        this.courseService.getCourseById(paramsId.id).subscribe(val => {
          this.course = val.result
        })
    });
    } else  {
      // this.router.navigateByUrl('/course');
    }
    this.courseService.getCategories().subscribe(val => {
      this.categories = val.result
      console.log(this.categories);
      
    });
    this.courseService.getTopic().subscribe(val => {
      this.topics = val.result
      console.log(this.topics);
    });
    this.courseService.getTrainers().subscribe(val => {
      this.trainers = val.result
      console.log(this.trainers);
    });
  }

  save() {
    if (this.type === 'course-edit') {
      this.courseService.editCourse(this.course).subscribe(val => {
        if (val.code === 200) {
          this.router.navigateByUrl('/course');
        }
      })
    } else {
      this.courseService.addCourse(this.course).subscribe(val => {
        if (val.code === 200) {
          this.router.navigateByUrl('/course');
        }
      })
    }
  }
  cancel() {
    this.router.navigateByUrl('/course');
  }
}
