import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

// mat module 

// matt element 

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule
];
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LoginRoutingModule,
    modules,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
