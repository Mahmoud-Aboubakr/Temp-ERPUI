import { NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routing';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { GeneralInformationComponent } from './create/generalInformation/generalInformation.component';
import { EmploymentDataComponent } from './create/employmentData/employmentData.component';
import { AddressAndContatctInfoComponent } from './create/addressAndContactInfo/addressAndContatctInfo.component';
import { CreateEmployeeComponent } from './create/create.component';


@NgModule({
  imports: [
    MatPaginatorModule,
    TranslateModule,
    MatTableModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    SharedMaterialModule,
    RouterModule.forChild(EmployeeRoutes),
  ], 
  declarations: [GeneralInformationComponent, EmploymentDataComponent, AddressAndContatctInfoComponent, CreateEmployeeComponent],
})
export class EmployeeModule { }
