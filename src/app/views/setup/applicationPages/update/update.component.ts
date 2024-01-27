
import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { pagesModel } from 'app/Core/Models/applicationPages/pagesModel';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { LookUp } from 'app/Core/Models/LookUp/LookUp';

@Component({
  selector: 'app-applicationPage-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<LookUp[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  paginationResponseModel: PaginationResponseModel<LookUp[]> = {
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
  appModules: LookUp[]; 
  PagesTypes : any[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
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
    this.getAppModules();
    this.getPagesTypes();
  }
  async getAppModules(){ 
    var paginationParam  = { 
       PageNumber : 1, 
       PageSize : 1000
     }
     await lastValueFrom(this._commonCrudService.getAll("CommonService/GetAppModules", paginationParam , this.paginationResponseModel)).then(res => {
       this.paginationResponseModel = res;
       if(res.statusCode == 200){
         this.appModules = this.paginationResponseModel.data;
       } else {
           this.snackBar.open(res.message, 'Close', {
             duration: 3000,
           });
       }
     }); 
   }

   getPagesTypes(){
    this._commonCrudService.get('CommonService/GetPagesTypes', this.PagesTypes).subscribe({
      next: res =>{ this.PagesTypes = res},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  async getData(id){ 
    this._commonCrudService.get('Pages/GetPage/' + id, this.responseModel).subscribe({
      next: res =>{ 
        this.responseModel = res;
        if(res.statusCode == 200){
          this.model.controls['applicationTblId'].setValue(res.data['applicationTblId']); 
          this.model.controls['appModuleId'].setValue( res.data['appModuleId']);
          this.model.controls['pageType'].setValue( res.data['pageType']);
          this.model.controls['pageNameEn'].setValue( res.data['pageNameEn']);
          this.model.controls['pageNameAr'].setValue( res.data['pageNameAr']);
          this.model.controls['pageDesCription'].setValue( res.data['pageNameEn']);
          this.model.controls['pageUrl'].setValue( res.data['pageUrl']);
          this.model.controls['sort'].setValue( res.data['sort']);
          this.model.controls['isActive'].setValue( res.data['isActive']);
        } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/applicationPages']);
        }
      },
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new pagesModel(); 
      updateModel.applicationTblId = this.model.controls['applicationTblId'].value; 
      updateModel.appModuleId  = this.model.controls['appModuleId'].value; 
      updateModel.pageType  = this.model.controls['pageType'].value; 
      updateModel.pageNameEn  = this.model.controls['pageNameEn'].value; 
      updateModel.pageNameAr  = this.model.controls['pageNameEn'].value; 
      updateModel.pageDesCription  = this.model.controls['pageDesCription'].value; 
      updateModel.pageUrl  = this.model.controls['pageUrl'].value; 
      updateModel.sort  = this.model.controls['sort'].value; 
      updateModel.isActive  = this.model.controls['isActive'].value; 
      updateModel.id  = this.Id;  
      await lastValueFrom ( this._commonCrudService.update("Pages/UpdatePage/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.resetForm();
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/applicationPages']);
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
