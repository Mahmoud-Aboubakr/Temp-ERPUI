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

@NgModule({
  declarations: [
    ListOfRolesComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
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
