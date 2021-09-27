import { PaginatedStudents } from './../../models/PaginatedStudents';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentResponse } from '../../models/StudentResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../modals/delete-popup/delete-popup.component';

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

  showSpinner: Boolean = false;
  class = '';
  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(private service: StudentService, private _snackBar: MatSnackBar,
    private router: Router,  public dialog: MatDialog) { }

  ngOnInit() {
    this.loadStudents()
  }

  loadStudents(){
  
    this.showSpinner = true
    this.service.getStudents(this.pageSize, this.pageNumber).subscribe(response => {
      console.log(response)
      this.showSpinner = false;
      this.paginatedStudents = response;
      this.pageNumber = response.pageIndex;

      this._snackBar.open(`Students data successfuly pulled!`, 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 5000,
      });

    },
    (error)=>{
     this.showSpinner = false

     this._snackBar.open(`Error encounterd while fetching students data!`, 'Failed', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
    });
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
    this.router.navigate(["view/"+student.id])
          .then(() => {
            window.location.reload();
          });
  }

  editStudent(student: StudentResponse){
    console.log(student)
  }

  deleteStudent(student: StudentResponse){
    console.log(student)

    const dialogRef = this.dialog.open(DeletePopupComponent , {
      width: '600px',
      height: '200px',
      data: {
        yes: true,
        no: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
        if(result){
          console.log(result)

          this.showSpinner = true
          this.service.delteStudent(student.id).subscribe(response => {
            console.log(response)

            this._snackBar.open(`Students data successfuly deleted!`, 'OK', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 5000,
            });

            this.loadStudents()

          },
          (error)=>{
          this.showSpinner = false

          this._snackBar.open(`Error encounterd while deleteing students data!`, 'Failed', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 5000,
          });
          })
        }
      }
    );

  }

  

}
