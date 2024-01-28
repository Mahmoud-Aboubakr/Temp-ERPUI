import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierTypesRoutingModule } from './supplier-types-routing.module';
import { ListComponent } from './list/list.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { AppFormsModule } from 'app/views/forms/forms.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    SupplierTypesRoutingModule,
    SharedMaterialModule,
    AppFormsModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SupplierTypesModule { }
