import { element } from 'protractor';
import { StudentResponse } from './../../models/StudentResponse';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddStudent } from '../../models/AddStudent';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  validationErrors: string[] = [];

  currentStudent : StudentResponse

  showSpinner: Boolean = false;
  class = '';
  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(private fb: FormBuilder, private service: StudentService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, 
        Validators.pattern(/^[0-9]\d*$/), 
        Validators.minLength(11),Validators.maxLength(11)]],
      email: ['', [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      country: ['', Validators.required],
      state: ['',[Validators.required]],
    })
  }

  register(){
    console.log("reg")

    if(this.currentStudent?.id){
        //this.service.update()
    }
    else{

      console.log(this.mapNewStudentData())

      this.showSpinner = true
      this.service.register(this.mapNewStudentData()).subscribe(
        (respose)=>{
          this.showSpinner = false
            console.log(respose)

            this._snackBar.open(`Student successfuly added!`, 'OK', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 5000,
            });
        }
      ),
      (error) => {
        this.showSpinner = false;
        console.log(error)

        this._snackBar.open(`Techincal error occurred while saving student information`, 'Failed', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000,
        });
      }
    }
  }

  cancel(){
  }

  mapNewStudentData() : AddStudent {

    let aStudent : AddStudent = {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      phone: this.registerForm.controls.phoneNumber.value,
      country: this.registerForm.controls.country.value,
      state: this.registerForm.controls.state.value
        }

    return aStudent;
  }

}
