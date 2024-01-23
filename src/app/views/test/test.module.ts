import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestTableComponent } from './test-table/test-table.component';

import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppFormsModule } from '../forms/forms.module';



@NgModule({
  declarations: [
    TestTableComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppFormsModule
  ]
})
export class TestModule { }
