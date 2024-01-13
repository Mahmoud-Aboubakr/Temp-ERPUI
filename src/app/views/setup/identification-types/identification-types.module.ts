import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentificationTypesRoutingModule } from './identification-types-routing.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    IdentificationTypesRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class IdentificationTypesModule { }
