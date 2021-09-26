import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  validationErrors: string[] = [];

  constructor(private fb: FormBuilder) { }

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
  }

  cancel(){
  }

}
