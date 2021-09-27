import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validationErrors: string[] = [];

  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logIn(){

  }

  cancel(){

  }

}
