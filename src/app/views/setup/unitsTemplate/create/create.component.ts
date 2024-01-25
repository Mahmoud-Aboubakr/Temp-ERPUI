import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { unitsTemplateModel } from 'app/Core/Models/UnitsTemplate/unitsTemplateModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-unitsTemplate-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  baseUnits: any[];
  responseModel: ResponseModel<unitsTemplateModel[]> = {
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
    this.getBaseUnits();
    this.model = new UntypedFormGroup({
      unitTemplateCode: new UntypedFormControl('', [
         Validators.required
      ]),
      unitTemplateNameEN: new UntypedFormControl('', [ 
        Validators.required
      ]),
      unitTemplateNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      unitId: new UntypedFormControl('', [
        Validators.required
      ]),
      isActive: new UntypedFormControl('', [
      ])
    })
  }


  getBaseUnits(){
    this._commonCrudService.get('Units/GetUnits', this.baseUnits).subscribe({
      next: res =>{ debugger; this.baseUnits = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  async save(){ 
    debugger
    if(this.model.valid){
    let addModel = new unitsTemplateModel(); 
    addModel.unitTemplateCode  = this.model.controls['unitTemplateCode'].value; 
    addModel.unitTemplateNameEN  = this.model.controls['unitTemplateNameEN'].value;
    addModel.unitTemplateNameAr  = this.model.controls['unitTemplateNameAr'].value;
    addModel.unitId  = this.model.controls['unitId'].value;
    addModel.isActive  = this.model.controls['isActive'].value;

    this._commonCrudService.post('UnitTemplates/AddUnitTemplate',addModel, this.responseModel).subscribe({
      next: res =>{ 
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
        },
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
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
