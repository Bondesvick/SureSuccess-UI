import { AddStudent } from './../models/AddStudent';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { EditStudent } from '../models/EditStudent';
import { StudentResponse } from '../models/StudentResponse';
import { PaginatedStudents } from '../models/PaginatedStudents';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiBaseUrl: string;


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { 
      this.apiBaseUrl = environment.baseURI;
    } 

    register(student: AddStudent){
      return this.http.post<any>(this.apiBaseUrl + 'create', student)
    }

    update(student: EditStudent){
      return this.http.put<StudentResponse>(this.apiBaseUrl + `update/${student.id}`, student)
    }

    getStudent(id: string){
      return this.http.get<StudentResponse>(this.apiBaseUrl + `read/${id}`)
    }

    getStudents(pageSize: number, pageIndex: number){
      return this.http.get<PaginatedStudents>(this.apiBaseUrl + `read?pageSize=${pageSize}&pageIndex=${pageIndex}`)
    }

    delteStudent(id: string){
      return this.http.delete<any>(this.apiBaseUrl + `delete/${id}`)
    }
}
