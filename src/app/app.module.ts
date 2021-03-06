import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ViewComponent } from './core/pages/view/view.component';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { EditComponent } from './core/pages/edit/edit.component';
import { LoginComponent } from './core/pages/login/login.component';
import { DeletePopupComponent } from './core/pages/modals/delete-popup/delete-popup.component';
import { HomeComponent } from './core/pages/home/home.component';
import { StudentService } from './core/services/student.service';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    ViewComponent,
    LoginComponent,
    DeletePopupComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    StudentService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
