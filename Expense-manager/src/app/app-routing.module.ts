import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageExpenseComponent } from './manage-expense/manage-expense.component';
import { AuthGuard } from './Service/authgaurd.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  //  { path: 'manage-expense', component: ManageExpenseComponent },
  { 
    path: 'manage-expense', 
    component: ManageExpenseComponent, 
    canActivate: [AuthGuard]  
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
