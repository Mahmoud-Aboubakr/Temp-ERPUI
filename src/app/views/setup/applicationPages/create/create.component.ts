import { Component, OnInit, Inject, LOCALE_ID,Input  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators,FormGroup } from '@angular/forms';
import { pagesModel } from 'app/Core/Models/applicationPages/pagesModel';
import { LookUp } from 'app/Core/Models/LookUp/LookUp';

import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-applicationPage-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {};
  @Input() form: FormGroup;
  console = console;
  model: UntypedFormGroup;
  responseModel:  ResponseModel<pagesModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  };
  appModules: LookUp[]; 
  applicationList: any;
  PagesTypes:any[];
  constructor(private _commonCrudService : CommonCrudService,
    private snackBar: MatSnackBar ) { }
  ngOnInit() { 
  //this.getApplicationsNames();
  this.getAppModules(); 
  this.getPagesTypes(); 
  
    this.model = new UntypedFormGroup({
      applicationTblId: new UntypedFormControl('', [
         Validators.required
      ]),
      appModuleId: new UntypedFormControl('', [ 
        Validators.required
      ]),
      pageType: new UntypedFormControl('', [
        Validators.required
      ]),
      pageNameEn: new UntypedFormControl('', [
        Validators.required
      ]),
      pageNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      pageUrl: new UntypedFormControl('', [
        Validators.required
      ]),
      sort: new UntypedFormControl('', [
        Validators.required
      ]),
      pageDesCription: new UntypedFormControl('', [
      ]),
      isActive: new UntypedFormControl('', [
      ]),
    })
  }

  getApplicationsNames(){
   
    this._commonCrudService.get('CommonDropDown/GetApplicationsNames', this.applicationList).subscribe({
      next: res =>{ this.applicationList = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  getAppModules(){
    this._commonCrudService.get('CommonDropDown/GetAppModules', this.appModules).subscribe({
      next: res =>{ this.appModules = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  getPagesTypes(){
    this._commonCrudService.get('CommonDropDown/GetPagesTypes', this.PagesTypes).subscribe({
      next: res =>{ this.PagesTypes = res},
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
    let addModel = new pagesModel(); 
    addModel.applicationTblId = this.model.controls['applicationTblId'].value; 
    addModel.appModuleId  = this.model.controls['appModuleId'].value; 
    addModel.pageType  = this.model.controls['pageType'].value; 
    addModel.pageNameEn  = this.model.controls['pageNameEn'].value; 
    addModel.pageNameAr  = this.model.controls['pageNameEn'].value; 
    addModel.pageDesCription  = this.model.controls['pageDesCription'].value; 
    addModel.pageUrl  = this.model.controls['pageUrl'].value; 
    addModel.sort  = this.model.controls['sort'].value; 
    addModel.isActive  = JSON.parse(this.model.controls['isActive'].value); 
    await lastValueFrom(this._commonCrudService.post("Pages/AddPage", addModel, this.responseModel)).then(res => {
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
