import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentResponse } from './../../models/StudentResponse';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  viewId : string = ""

  studentResponse: StudentResponse

  showSpinner: Boolean = false;
  class = '';
  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private service: StudentService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(
      (params: Params) => {
        //console.log(this.route.url)
        console.log(params['id']);
        this.viewId = params['id']
        this.fetchStudent(params['id'])
      }
    );
  }

  fetchStudent(id: string){

    this.showSpinner = true
    this.service.getStudent(id).subscribe(
      (respose: StudentResponse)=>{

        console.log(respose)

        this.studentResponse = respose;

        this.showSpinner = false
        this._snackBar.open(`Students' data successfuly pulled!`, 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000,
        });

      },
      (error)=>{
        console.log(error)
        this.showSpinner = false
        this._snackBar.open(`An erro occurred while pulling student data!`, 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000,
        });
      }
    )
  }

}
