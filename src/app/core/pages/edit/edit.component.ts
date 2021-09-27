import { EditStudent } from './../../models/EditStudent';
import { element } from 'protractor';
import { StudentResponse } from './../../models/StudentResponse';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddStudent } from '../../models/AddStudent';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  validationErrors: string[] = [];

  currentStudent : StudentResponse

  editStudent: EditStudent

  showSpinner: Boolean = false;
  class = '';
  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  constructor(private fb: FormBuilder, private service: StudentService, 
    private _snackBar: MatSnackBar,  private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm()

    this.activeRoute.params.subscribe(
      (params: Params) => {
        //console.log(this.route.url)
        console.log(params['id']);
       if(params['id'])
        this.fetchStudent(params['id'])
      }
    );
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

      console.log(this.mapUpdateStudentData())

      this.showSpinner = true
        this.service.update(this.mapUpdateStudentData()).subscribe(
          (respose)=>{
            this.showSpinner = false
              console.log(respose)
  
              this._snackBar.open(`Student data successfuly updated!`, 'OK', {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 5000,
              });

              this.router.navigate(["home/"])
          }
        ),
        (error) => {
          this.showSpinner = false;
          console.log(error)
  
          this._snackBar.open(`Techincal error occurred while updating student information`, 'Failed', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 5000,
          });
        }
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

            this.router.navigate(["home/"])
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

  mapUpdateStudentData() : EditStudent {

    let aStudent : EditStudent = {
      id : this.currentStudent?.id,
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      phone: this.registerForm.controls.phoneNumber.value,
      country: this.registerForm.controls.country.value,
      state: this.registerForm.controls.state.value
        }

    return aStudent;
  }

  fetchStudent(id: string){

    this.showSpinner = true
    this.service.getStudent(id).subscribe(
      (respose: StudentResponse)=>{

        console.log(respose)

        this.currentStudent = respose;

        this.registerForm.controls.firstName.setValue(respose.firstName)
        this.registerForm.controls.lastName.setValue(respose.lastName)
        this.registerForm.controls.email.setValue(respose.email)
        this.registerForm.controls.phoneNumber.setValue(respose.phone)
        this.registerForm.controls.country.setValue(respose.country)
        this.registerForm.controls.state.setValue(respose.state)

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
