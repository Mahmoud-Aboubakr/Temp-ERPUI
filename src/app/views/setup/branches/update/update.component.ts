import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchModel } from 'app/Core/Models/Branches/BranchModel';
import { CompanyModel } from 'app/Core/Models/Companies/CompanyModel';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<BranchModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  componies: PaginationResponseModel<CompanyModel[]> = {
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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      Code: new UntypedFormControl('', [
      ]),
      EnglishName: new UntypedFormControl('', [
      ]),
      ArabicName: new UntypedFormControl('', [
      ]),
      IsActive: new UntypedFormControl('', [
      ]),
      CompanyId: new UntypedFormControl('', [
      ]),
    })
  }

  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Branches/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['Code'].setValue(res.data['code']); 
          this.model.controls['EnglishName'].setValue(res.data['englishName']); 
          this.model.controls['ArabicName'].setValue(res.data['arabicName']); 
          this.model.controls['IsActive'].setValue(res.data['isActive']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/branches']);
      }
    }); 

    await lastValueFrom(this._commonCrudService.getAll("Companies", { 
    PageNumber : 1, 
    PageSize : 1000
  }, this.componies))
    .then(res => {
      this.componies = res;
    }); 
  }

  async update(){ 
    if(this.model.valid){
      let updatedModel = new BranchModel(); 
      updatedModel.Id  = this.Id; 
      updatedModel.Code = this.model.controls['Code'].value;
      updatedModel.EnglishName  = this.model.controls['EnglishName'].value; 
      updatedModel.ArabicName  = this.model.controls['ArabicName'].value; 
      updatedModel.IsActive  = this.model.controls['IsActive'].value;
      let CompanyId = this.model.controls['CompanyId'].value as number;
      if(CompanyId)
        updatedModel.CompanyId  = CompanyId;

      await lastValueFrom(this._commonCrudService.update("Branches/" + this.Id, updatedModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/branches']);
          } else {
            this.resetForm();
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
