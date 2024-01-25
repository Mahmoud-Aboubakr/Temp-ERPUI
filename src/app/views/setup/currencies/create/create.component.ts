import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ItemCategoryModel } from 'app/Core/Models/Inventory/ItemCategory/ItemCategoryModel';
import { ItemClassificationModel } from 'app/Core/Models/Inventory/ItemClassification/ItemClassificationModel';
import { CountryModel } from 'app/Core/Models/Countries/CountryModel';
import { PaginationParamWithSearch } from 'app/Core/Models/ResponseModels/PaginationParamWithSearch';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { CurrencyModel } from 'app/Core/Models/Currencies/CurrencyModel';

@Component({
  selector: 'app-item-classification-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  countries: CountryModel[]; 
  responseModel: ResponseModel<CurrencyModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  paginationResponseModel: PaginationResponseModel<CountryModel[]> = {
    currentPage:0,
    errorMessage: '',
    lang:'',
    message:'',
    pageSize:0,
    statusCode:0,
    totalCount:0,
    totalPages: 0,
    data: undefined
  }
  constructor(private _commonCrudService : CommonCrudService,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.model = new UntypedFormGroup({
      arabicName: new UntypedFormControl('', [
        Validators.required
      ]),
      englishName: new UntypedFormControl('', [
        Validators.required
      ]),
      rate: new UntypedFormControl('', [
      ]),
      symbol: new UntypedFormControl('', [
        Validators.required
      ]),
      isDefault: new UntypedFormControl('', [
      ]),
      countryId: new UntypedFormControl('', [
        Validators.required
      ]),
    }); 
    this.getCountreis();
  }
  async getCountreis(){ 
   var paginationParam  = { 
      PageNumber : 1, 
      PageSize : 1000
    }
    await lastValueFrom(this._commonCrudService.getAll("Countries/GetCountries", paginationParam , this.paginationResponseModel)).then(res => {
      this.paginationResponseModel = res;
      if(res.statusCode == 200){
        this.countries = this.paginationResponseModel.data;
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
      }
    }); 
  }
  async save(){ 
    if(this.model.valid){
    let addModel = new CurrencyModel(); 
    //debugger;
    addModel.ArabicName = this.model.controls['arabicName'].value; 
    addModel.EnglishName = this.model.controls['englishName'].value; 
    addModel.Rate = this.model.controls['rate'].value; 
    addModel.Symbol = this.model.controls['symbol'].value; 
    addModel.CountryId = this.model.controls['countryId'].value; 
    addModel.IsDefault = this.model.controls['isDefault'].value == "" ? false : true; 
    await lastValueFrom(this._commonCrudService.post("CurrencySetup/AddCurrency", addModel, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 201){ 
          this.resetForm();
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/currencies']);
        } else {
          this.snackBar.open(res.message, 'Close', {
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
