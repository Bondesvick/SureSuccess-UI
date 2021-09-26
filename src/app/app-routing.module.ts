import { LoginComponent } from './core/pages/login/login.component';
import { ViewComponent } from './core/pages/view/view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './core/pages/edit/edit.component';
import { HomeComponent } from './core/pages/home/home.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
   {
    path:"",
    redirectTo:"home",
    pathMatch: "full"
  },
  {
    path:"home",
    component:HomeComponent,
    pathMatch: "full"
  },
  {
    path:"edit",
    component:EditComponent,
    pathMatch: "full"
  },
  {
    path:"view",
    component:ViewComponent,
    pathMatch: "full"
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch: "full"
  },
  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
