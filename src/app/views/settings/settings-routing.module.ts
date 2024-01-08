import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'changePassword', pathMatch: 'full'},
  {path: 'changePassword', component: ChangePasswordComponent, title: 'Change Password'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
