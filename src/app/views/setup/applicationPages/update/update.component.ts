import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { pagesModel } from 'app/Core/Models/applicationPages/pagesModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

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
  appModules: any;
  applicationList: any;
  PagesTypes:any[];
  responseModel: ResponseModel<pagesModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }

    
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getApplicationsNames();
    this.getAppModules(); 
    this.getPagesTypes(); 
    this.getData(this.Id); 
      this.model = new UntypedFormGroup({
        applicationTblId: new UntypedFormControl('', [
           Validators.required
        ]),
        appModuleId: new UntypedFormControl('', [ 
          Validators.required
        ]),
        appPageTypeId: new UntypedFormControl('', [
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
 
  async update(){ 
    if(this.model.valid){
      let updateModel = new pagesModel(); 
      updateModel.applicationTblId = this.model.controls['applicationTblId'].value; 
      updateModel.appModuleId  = this.model.controls['appModuleId'].value; 
      updateModel.appPageTypeId  = this.model.controls['appPageTypeId'].value; 
      updateModel.pageNameEn  = this.model.controls['pageNameEn'].value; 
      updateModel.pageNameAr  = this.model.controls['pageNameEn'].value; 
      updateModel.pageDesCription  = this.model.controls['pageDesCription'].value; 
      updateModel.pageUrl  = this.model.controls['pageUrl'].value; 
      updateModel.sort  = this.model.controls['sort'].value; 
      updateModel.isActive  = this.model.controls['isActive'].value; 
      
      updateModel.id  = this.Id;  
      await lastValueFrom (  this._commonCrudService.update("Pages/UpdatePage/" + this.Id, updateModel, this.responseModel)
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

  getApplicationsNames(){
   
    this._commonCrudService.get('Pages/GetApplicationsNames', this.applicationList).subscribe({
      next: res =>{ this.applicationList = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  getAppModules(){
    this._commonCrudService.get('Pages/GetAppModules', this.appModules).subscribe({
      next: res =>{ this.appModules = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  getPagesTypes(){
    this._commonCrudService.get('Pages/GetPagesTypes', this.PagesTypes).subscribe({
      next: res =>{ this.PagesTypes = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  getData(id){
    this._commonCrudService.get('Pages/GetPage/' + id, this.responseModel).subscribe({
      next: res =>{ 
        this.responseModel = res;
        if(res.statusCode == 200){
          this.model.controls['applicationTblId'].setValue(res.data['applicationTblId']); 
          this.model.controls['appModuleId'].setValue( res.data['appModuleId']);
          this.model.controls['appPageTypeId'].setValue( res.data['appPageTypeId']);
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
}