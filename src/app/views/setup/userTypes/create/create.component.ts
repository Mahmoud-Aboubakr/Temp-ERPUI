import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { userTypeModel } from 'app/Core/Models/userType/userTypeModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-userType-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<userTypeModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  constructor(private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.model = new UntypedFormGroup({
      // newsTextAr: new UntypedFormControl('', [
      //   // Validators.minLength(4),
      //   // Validators.maxLength(9)
        
      // ]),
      typeName: new UntypedFormControl('', [
         Validators.required
      ]),
      descNameEn: new UntypedFormControl('', [ 
        Validators.required
      ]),
      descNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      fullDesc: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  async save(){ 
    debugger
    if(this.model.valid){
    let addModel = new userTypeModel(); 
    //debugger;
    addModel.typeName = this.model.controls['typeName'].value; 
    addModel.descNameEn  = this.model.controls['descNameEn'].value; 
    addModel.descNameAr  = this.model.controls['descNameAr'].value; 
    addModel.fullDesc  = this.model.controls['fullDesc'].value; 
    await lastValueFrom(this._commonCrudService.post("UserType/AddUserType", addModel, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 201){ 
          this.resetForm();
          this.snackBar.open(this.responseModel.message, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        } else {
          this.snackBar.open(this.responseModel.message, 'Close', {
            duration: 3000,
          });
      }
    }); 

    }
    
  }

    // Method to reset form controls
    resetForm() {
      // Iterate over each control and clear validators
      Object.keys(this.model.controls).forEach(key => {
        const control = this.model.get(key);
        control.clearValidators();
        control.updateValueAndValidity();
      });
  
      // Reset the form to its initial state
      this.model.reset();
    }
}
