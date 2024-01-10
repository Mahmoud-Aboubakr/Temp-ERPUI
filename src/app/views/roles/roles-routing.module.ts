import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRoleComponent } from './manage-role/manage-role.component';

const routes: Routes = [
  {path: '', redirectTo: 'manageRoles', pathMatch: 'full'},
  {path: 'manageRoles', component: ManageRoleComponent, title: 'manage Roles'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
