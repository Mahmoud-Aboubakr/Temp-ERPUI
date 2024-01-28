import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { unitsModel } from 'app/Core/Models/Units/unitsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-units-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<unitsModel[]> = {
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
      unitCode: new UntypedFormControl('', [
         Validators.required
      ]),
      unitNameEn: new UntypedFormControl('', [ 
        Validators.required
      ]),
      unitNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      unitDescription: new UntypedFormControl('', [
        Validators.required
      ]),
      isActive: new UntypedFormControl('', [
      ])
    })
  }
  async save(){ 
    debugger
    if(this.model.valid){
    let addModel = new unitsModel(); 
    addModel.unitCode  = this.model.controls['unitCode'].value; 
    addModel.unitNameEn  = this.model.controls['unitNameEn'].value;
    addModel.unitNameAr  = this.model.controls['unitNameAr'].value;
    addModel.unitDescription  = this.model.controls['unitDescription'].value;
    addModel.isActive  = this.model.controls['isActive'].value;

    await lastValueFrom(this._commonCrudService.post("Units/AddUnit", addModel, this.responseModel)).then(res => {
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
