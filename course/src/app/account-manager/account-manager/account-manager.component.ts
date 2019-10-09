import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AccountService } from '../account.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private accountService: AccountService, private router: Router) { }

  displayedColumns: string[] = ['no', 'userName', 'password', 'age' ,'department', 'phone', 'email', 'action'];
  trainers = [];
  trainees = [];
  trainersSource = new MatTableDataSource(this.trainers);
  traineesSource = new MatTableDataSource(this.trainees);
  addTrainer() {
    let data = this.trainersSource.data
    data.push({
      no: this.trainers.length,
      name: '',
      phone: '',
      department: '',
      email: '',
      password: '',
      isEdit: true
    })
    this.trainersSource.data = data
  }
  addTrainee() {
    let data = this.traineesSource.data
    data.push({
      no: this.trainees.length,
      userName: '',
      phone: '',
      email: '',
      password: '',
      isEdit: true
    })
    this.traineesSource.data = data
  }
  ngOnInit() {

    if(!localStorage.getItem("role")) {
      this.router.navigateByUrl('/login');
    }
    this.accountService.getAccounts('trainer').subscribe((val) => {
      console.log(val);
      val.result.map((trainer, index) => {
        trainer.no = index;
        trainer.isEdit = false;
        trainer.isEdited = false;
      })
      if (val.result) {
        this.trainers = val.result;
        this.trainersSource = new MatTableDataSource<any>(this.trainers);
        this.trainersSource.paginator = this.paginator;
      }
    })
    this.accountService.getAccounts('trainee').subscribe((val) => {
      console.log(val);
      val.result.map((trainee, index) => {
        trainee.no = index;
        trainee.isEdit = false;
        trainee.isEdited = false;
      })
      if (val.result) {
        this.trainers = val.result;
        this.traineesSource = new MatTableDataSource<any>(this.trainers);
        this.traineesSource.paginator = this.paginator;
      }
    })
  }

  // TRAINER

  editTrainer(i: number) {
    let data = this.trainersSource.data;
    data[i].isEdit = true;
  }
  applyFilter(filterValue: string) {
    this.trainersSource.filter = filterValue.trim().toLowerCase();
  }
  save(e, i) {
    e.isEdit = false;
    e.isEdited = true;
    let data = this.trainersSource.data;
    data[i] = e
  }

  saveTrainer() {
    let dataEdit = this.trainersSource.data.filter(trainer => {
      return trainer.isEdited
    });
    
    let dataAdd = this.trainersSource.data.filter(trainer => {
      return !trainer._id
    });
    
    
    console.log(dataAdd);
    
    if (dataAdd.length) {
      this.accountService.addTrainer(dataAdd).subscribe(val => {
        console.log(val);
      })
    }
    if (dataEdit.length) {
      this.accountService.editTrainer(dataEdit).subscribe(val => {
        console.log(val);
      })
    }
  }
  deleteTrainer(id, index) {
    console.log(index);
    console.log(id);
    if (id) {
      console.log('xxx');
      
      this.accountService.deleteTrainer(id).subscribe(val => {
        console.log(val);
      })
    }
      let data = this.trainersSource.data;
      data.splice(index, 1)
      console.log(data);
      this.trainersSource.data = data
  }
  // TRAINEE 

  editTrainee(i: number) {
    let data = this.traineesSource.data;
    data[i].isEdit = true;
  }
  applyFilterTrainee(filterValue: string) {
    this.traineesSource.filter = filterValue.trim().toLowerCase();
  }
  saveTraineeRow  (e, i) {
    e.isEdit = false;
    e.isEdited = true;
    let data = this.traineesSource.data;
    data[i] = e
  }

  saveTrainee() {
    let dataEdit = this.traineesSource.data.filter(trainer => {
      return trainer.isEdited
    });
    
    let dataAdd = this.traineesSource.data.filter(trainer => {
      return !trainer._id
    });
    console.log(dataAdd);
    
    if (dataAdd.length) {
      this.accountService.addTrainee(dataAdd).subscribe(val => {
        console.log(val);
      })
    }
    if (dataEdit.length) {
      this.accountService.editTrainee(dataEdit).subscribe(val => {
        console.log(val);
      })
    }
  }
  deleteTrainee(id, index) {
    if (id) {
      this.accountService.deleteTrainee(id).subscribe(val => {
        console.log(val);
        
      })
    }

      let data = this.traineesSource.data;
      data.splice(index, 1)
      this.traineesSource.data = data
  }
}
