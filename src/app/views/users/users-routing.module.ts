import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'createUser', pathMatch: 'full'},
  {path: 'createUser', component: CreateUserComponent, title: 'Create a new user'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
