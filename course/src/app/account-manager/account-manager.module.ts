import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { AccountManagerRoutingModule } from './account-manager-routing.module';


import {
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

const modules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule
];


@NgModule({
  declarations: [AccountManagerComponent],
  imports: [
    CommonModule,
    AccountManagerRoutingModule,
    FormsModule,
    modules
  ]
})
export class AccountManagerModule { }
