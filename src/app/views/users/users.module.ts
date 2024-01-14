import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';

import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedMaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class UsersModule { }
