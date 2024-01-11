import { Component, OnInit, Inject, LOCALE_ID, Input  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { NewsModel } from 'app/Core/Models/News/NewsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeFrom } from 'app/Core/Froms/Employee/employeeFrom';

@Component({
  selector: 'app-hr-employee-employment-data',
  templateUrl: './employmentData.component.html',
  styleUrls:['./employmentData.component.css'],
})
export class EmploymentDataComponent implements OnInit {
  @Input() employeeForm: EmployeeFrom;
  @Input() form: FormGroup;

  ngOnInit() {
    if (!this.form) {
      this.form = EmployeeFrom.getFormGroup();
      this.form.patchValue(this.employeeForm); // Populate form with existing data
    }
  }
}
