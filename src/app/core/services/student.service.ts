import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiBaseUrl: string;


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { 
      this.apiBaseUrl = environment.baseURI;
    } 
}
