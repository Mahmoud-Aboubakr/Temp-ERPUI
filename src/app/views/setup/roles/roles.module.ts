import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfRolesComponent } from './list-of-roles/list-of-roles.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { AppFormsModule } from 'app/views/forms/forms.module';
import { RolesPrivilegesComponent } from './roles-privileges/roles-privileges.component';
import { TestPrivComponent } from './test-priv/test-priv.component';

@NgModule({
  declarations: [
    ListOfRolesComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    RolesPrivilegesComponent,
    TestPrivComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AppFormsModule
  ]
})
export class RolesModule { }
