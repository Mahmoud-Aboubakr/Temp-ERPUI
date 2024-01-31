import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { MainStoreComponent } from './stores-tab/main-store/main-store.component';
import { SubStoreComponent } from './stores-tab/sub-store/sub-store.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { StoresTabComponent } from './stores-tab/stores-tab.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainStoreComponent,
    SubStoreComponent,
    StoresTabComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    SharedMaterialModule,
    TranslateModule,
    //SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoresModule { }
