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
import { CurrencyModel } from 'app/Core/Models/Currencies/CurrencyModel';
import { ItemModel } from 'app/Core/Models/Inventory/Item/ItemModel';
import { environment } from 'environments/environment';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { Stocked, StockedMapping } from 'app/Core/Models/Inventory/Item/Stocked';

@Component({
  selector: 'app-Item-Categories-delete',
  templateUrl: './delete.component.html',
  styleUrls:['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<ItemCategoryModel[]> = {
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
  isPermenant = false; 
  isActive = false;
  hasExpiredDate = false;  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
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
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Items/GetItem/" + id, this.responseModel)).then(async res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          await this.deserilizeData(res.data);
            this.isPermenant = res.data['isPermenant']; 
            this.isActive = res.data['isActive'];
            this.hasExpiredDate = res.data['hasExpiredDate']; 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['inventory/setup/items']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("Items/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
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
  async deserilizeData(data : ItemModel){
    this.model.controls['serviceName'].setValue(data['serviceName']);
    this.model.controls['itemCode'].setValue(data['itemCode']);
    this.model.controls['barCode'].setValue(data['barCode']);
    this.model.controls['englishName'].setValue(data['englishName']);
    this.model.controls['arabicName'].setValue(data['arabicName']);
    this.model.controls['isPermenant'].setValue(data['isPermenant']);
    this.model.controls['isActive'].setValue(data['isActive']);
    this.model.controls['hasExpiredDate'].setValue(data['hasExpiredDate']);
    this.model.controls['itemCategoryId'].setValue(data['itemCategoryId']);
    this.model.controls['itemTypeId'].setValue(data['itemTypeId']);
    this.model.controls['itemClassificationId'].setValue(data['itemClassificationId']);
    this.model.controls['wholesale'].setValue(data['wholesale']);
    this.model.controls['wholesaleCurrencyId'].setValue(data['wholesaleCurrencyId']);
    this.model.controls['retail'].setValue(data['retail']);
    this.model.controls['retailCurrencyId'].setValue(data['retailCurrencyId']);
    this.model.controls['costPrice'].setValue(data['costPrice']);
    this.model.controls['costPriceCurrencyId'].setValue(data['costPriceCurrencyId']);
    this.model.controls['imagePath'].setValue(data['itemImage']);
    this.model.controls['stock'].setValue(data['stocked']);
    this.model.controls['instruction'].setValue(data['instruction']);
    this.model.controls['instructionDescription'].setValue(data['instructionDescription']);
    this.model.controls['notes'].setValue(data['notes']);
    this.model.controls['notesDescription'].setValue(data['notesDescription']);
    return data; 
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
