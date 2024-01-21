import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NewsModel } from 'app/Core/Models/News/NewsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ItemTypeModel } from 'app/Core/Models/Inventory/ItemType/ItemTypeModel';
import { ItemCategoryModel } from 'app/Core/Models/Inventory/ItemCategory/ItemCategoryModel';
import { ItemClassificationModel } from 'app/Core/Models/Inventory/ItemClassification/ItemClassificationModel';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { CountryModel } from 'app/Core/Models/Countries/CountryModel';
import { CurrencyModel } from 'app/Core/Models/Currencies/CurrencyModel';

@Component({
  selector: 'app-item-classification-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<CountryModel[]> = {
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
  countries: CountryModel[]; 
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
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
  async getData(id){ 
  await lastValueFrom(this._commonCrudService.get("CurrencySetup/GetCurrency/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['arabicName'].setValue(res.data['arabicName']); 
          this.model.controls['englishName'].setValue(res.data['englishName']); 
          this.model.controls['symbol'].setValue(res.data['symbol']); 
          this.model.controls['rate'].setValue(res.data['rate']); 
          this.model.controls['countryId'].setValue(res.data['countryId']); 
          this.model.controls['isDefault'].setValue(res.data['isDefault']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/currencies']);
      }
    }); 

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new CurrencyModel(); 
      updateModel.ArabicName = this.model.controls['arabicName'].value; 
      updateModel.EnglishName = this.model.controls['englishName'].value; 
      updateModel.Rate = this.model.controls['rate'].value; 
      updateModel.Symbol = this.model.controls['symbol'].value; 
      updateModel.CountryId = this.model.controls['countryId'].value; 
      updateModel.IsDefault = this.model.controls['isDefault'].value == ""? false : true; 
      updateModel.Id  = this.Id;  
      await lastValueFrom ( this._commonCrudService.updatePatch("CurrencySetup/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
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
  async resetForm() {
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
