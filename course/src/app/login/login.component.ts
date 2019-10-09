import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  isLoginFalse = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  roles = [
    'admin', 'trainer', 'trainee'
  ]
  
  submit(userName: string, password: string, role: string) {
    console.log(userName, password, role);
    
    if (this.form.valid) {
      this.loginService.logIn(userName, password, role).subscribe(val => {
        console.log(val);
        if (val.code === 200) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', val.userId);
          if (role === 'admin') {
            this.router.navigateByUrl('/account-manager');
          } else {
            this.router.navigateByUrl('/course');
          }
        } else {
          this.isLoginFalse = val.message;
        }
      } , (err) => {
        this.isLoginFalse = err;
      })
    }
  }
  ngOnInit() {
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

}
