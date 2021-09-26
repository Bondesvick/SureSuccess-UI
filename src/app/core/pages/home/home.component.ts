import { PaginatedStudents } from './../../models/PaginatedStudents';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentResponse } from '../../models/StudentResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['FirstName', 'LastName', 'Phone', 'Email','view','edit','delete'];

  paginatedStudents: PaginatedStudents;

  pageNumber: number = 1;
  pageSize: number = 10

  constructor(private service: StudentService) { }

  ngOnInit() {
    this.loadStudents()
  }

  loadStudents(){
  
    this.service.getStudents(this.pageSize, this.pageNumber).subscribe(response => {
      console.log(response)
      this.paginatedStudents = response;
      this.pageNumber = response.pageIndex;

    },
    (error)=>{
     
    })
  } 

  resetFilters(){
    // this.params = this.service.resetParams();
    // this.params.pageNumber = 1;
    //this.loadAccounts();
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadStudents();
    // this.service.setParams(this.params, this.status);
    // this.loadAccounts();
  }

  viewStudent(student: StudentResponse){
    console.log(student)
  }

  editStudent(student: StudentResponse){
    console.log(student)
  }

  deleteStudent(student: StudentResponse){
    console.log(student)
  }

  

}
