import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { ManageRoleComponent } from './manage-role/manage-role.component';

import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';


@NgModule({
  declarations: [
    ManageRoleComponent,
    ManageRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
