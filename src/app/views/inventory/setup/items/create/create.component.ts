import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ItemCategoryModel } from 'app/Core/Models/Inventory/ItemCategory/ItemCategoryModel';
import { ItemModel } from 'app/Core/Models/Inventory/Item/ItemModel';
import { environment } from 'environments/environment';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { CountryModel } from 'app/Core/Models/Countries/CountryModel';
import { ItemTypeModel } from 'app/Core/Models/Inventory/ItemType/ItemTypeModel';
import { ItemClassificationModel } from 'app/Core/Models/Inventory/ItemClassification/ItemClassificationModel';
import { CurrencyModel } from 'app/Core/Models/Currencies/CurrencyModel';
import { Stocked, StockedMapping } from 'app/Core/Models/Inventory/Item/Stocked';

@Component({
  selector: 'app-items-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<ItemModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  itemCategories: ItemCategoryModel[]; 
  itemTypes: ItemTypeModel[]; 
  itemClassifications: ItemClassificationModel[]; 
  currencies : CurrencyModel[];

  StockedMapping = StockedMapping;
  stockedOptions = Object.values(Stocked).filter(value => typeof value === 'number');

  constructor(private _commonCrudService : CommonCrudService,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.model = new UntypedFormGroup({
      serviceName: new UntypedFormControl('', [
        Validators.required
      ]),
      itemCode: new UntypedFormControl('', [
        Validators.required
      ]),
      barCode: new UntypedFormControl('', [
      ]),
      arabicName: new UntypedFormControl('', [
      ]),
      englishName: new UntypedFormControl('', [
      ]),
      isPermenant: new UntypedFormControl('', [
      ]),
      isActive: new UntypedFormControl('', [
      ]),
      hasExpiredDate: new UntypedFormControl('', [
      ]),
      itemCategoryId: new UntypedFormControl('', [
        Validators.required
      ]),
      itemTypeId: new UntypedFormControl('', [
        Validators.required
      ]),
      itemClassificationId: new UntypedFormControl('', [
        Validators.required
      ]),
      unitTemplateId: new UntypedFormControl('', [
      ]),
      costPrice: new UntypedFormControl('', [
        Validators.required
      ]),
      costPriceCurrencyId: new UntypedFormControl('', [
        Validators.required
      ]),
      wholesale: new UntypedFormControl('', [
      ]),
      wholesaleCurrencyId: new UntypedFormControl('', [
      ]),
      retail: new UntypedFormControl('', [
      ]),
      retailCurrencyId: new UntypedFormControl('', [
      ]),
      imagePath: new UntypedFormControl('', [
      ]),
      stock: new UntypedFormControl('', [
        Validators.required
      ]), 
      instruction: new UntypedFormControl('', [
      ]),
      instructionDescription: new UntypedFormControl('', [
      ]),
      notes: new UntypedFormControl('', [
      ]),
      notesDescription: new UntypedFormControl('', [
      ]),
      image: new UntypedFormControl('', [
      ]),

    })
    this.getCategories(); 
    this.getTypes();
    this.getItemClassifications();
    this.getCurrencies();
  }
  async save(){ 
    if(this.model.valid){
    let addModel = await this.serilizeData(new ItemModel()); 
    this.console.log(addModel);
    await lastValueFrom(this._commonCrudService.post("Items/AddItem", addModel, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 201){ 
          this.resetForm();
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['inventory/setup/items']);
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
      }
    }); 

    }
    
  }
  async serilizeData(data : ItemModel){
    data.ServiceName = this.model.value['serviceName'];
    data.ItemCode =  this.model.value['itemCode'];
    data.BarCode =  this.model.value['barCode'];
    data.EnglishName =  this.model.value['englishName'];
    data.ArabicName = this.model.value['arabicName'];
    data.IsPermenant = this.model.value['isPermenant'] == '' ? false : true;
    data.IsActive = this.model.value['isActive'] == '' ? false : true;
    data.HasExpiredDate = this.model.value['hasExpiredDate'] == '' ? false : true;
    data.ItemCategoryId = this.model.value['itemCategoryId'];
    data.ItemTypeId = this.model.value['itemTypeId'];
    data.ItemClassificationId =  this.model.value['itemClassificationId'];
    data.Wholesale =  this.model.value['wholesale'] != '' ? this.model.value['wholesale'] : null ;
    data.WholesaleCurrencyId = this.model.value['wholesaleCurrencyId'] != '' ? this.model.value['wholesaleCurrencyId'] : null;
    data.Retail =  this.model.value['retail'] != '' ? this.model.value['retail'] : null;
    data.RetailCurrencyId =  this.model.value['retailCurrencyId'] != '' ? this.model.value['retailCurrencyId'] : null;
    data.CostPrice = this.model.value['costPrice'];
    data.CostPriceCurrencyId = this.model.value['costPriceCurrencyId'];
    data.ItemImage =    this.model.value['imagePath'];
    data.Stocked =  this.model.value['stock'];
    data.Instruction =   this.model.value['instruction'];
    data.InstructionDescription = this.model.value['instructionDescription'];
    data.Notes = this.model.value['notes'];
    data.NotesDescription =  this.model.value['notesDescription'];
    return data;
  }

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

  onFileSelected(event: any ) {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.uploadImage(file);
      }
  }
  uploadImage(file: File) {
    if (file) {
        this._commonCrudService.uploadFile(file, "File/UploadImage/" , this.responseModel)
        .subscribe(response => {
        if(response.statusCode == 201){
          this.model.get('imagePath').setValue( response.data.filePath);
        }else{ 
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
  getImageUrl(relativePath: string): string {
    return `${environment.fileUrl}${relativePath}`;
  }
  async getCategories(){ 
    var paginationParam  = { 
       PageNumber : 1, 
       PageSize : 1000
     }
     var itemCategoriesResponseModel: PaginationResponseModel<ItemCategoryModel[]> = {
      currentPage:0,
      errorMessage: '',
      lang:'',
      message:'',
      pageSize:0,
      statusCode:0,
      totalCount:0,
      totalPages: 0,
      data: undefined
    };
     await lastValueFrom(this._commonCrudService.getAll("ItemCategories/GetItemCategories", paginationParam , itemCategoriesResponseModel)).then(res => {
       itemCategoriesResponseModel = res;
       if(res.statusCode == 200){
         this.itemCategories = itemCategoriesResponseModel.data;
       } else {
           this.snackBar.open(res.message, 'Close', {
             duration: 3000,
           });
       }
     }); 
  }
  async getTypes(){ 
    var paginationParam  = { 
       PageNumber : 1, 
       PageSize : 1000
     }
    var itemTypesResponseModel: PaginationResponseModel<ItemTypeModel[]> = {
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
     await lastValueFrom(this._commonCrudService.getAll("ItemTypes/GetItemTypes", paginationParam , itemTypesResponseModel)).then(res => {
       itemTypesResponseModel = res;
       if(res.statusCode == 200){
         this.itemTypes = itemTypesResponseModel.data;
       } else {
           this.snackBar.open(res.message, 'Close', {
             duration: 3000,
           });
       }
     }); 
  }
  async getItemClassifications(){ 
    var paginationParam  = { 
       PageNumber : 1, 
       PageSize : 1000
     }
     var itemClassificationsResponseModel: PaginationResponseModel<ItemClassificationModel[]> = {
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
     await lastValueFrom(this._commonCrudService.getAll("ItemClassifications/GetItemClassifications", paginationParam , itemClassificationsResponseModel)).then(res => {
      itemClassificationsResponseModel = res;
       if(res.statusCode == 200){
         this.itemClassifications = itemClassificationsResponseModel.data;
       } else {
           this.snackBar.open(res.message, 'Close', {
             duration: 3000,
           });
       }
     }); 
  }
  async getCurrencies(){ 
    var paginationParam  = { 
       PageNumber : 1, 
       PageSize : 1000
     }
     var responseModel: PaginationResponseModel<CurrencyModel[]> = {
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
     await lastValueFrom(this._commonCrudService.getAll("CurrencySetup/GetCurrencies", paginationParam , responseModel)).then(res => {
      responseModel = res;
       if(res.statusCode == 200){
         this.currencies = responseModel.data;
       } else {
           this.snackBar.open(res.message, 'Close', {
             duration: 3000,
           });
       }
     }); 
  }
   
}
