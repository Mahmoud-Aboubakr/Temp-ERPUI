import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { unitsTemplateModel } from 'app/Core/Models/UnitsTemplate/unitsTemplateModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-unitsTemplate-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<unitsTemplateModel[]> = {
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
    this.getData(this.Id); 
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
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("UnitTemplates/GetUnitTemplate/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['unitTemplateCode'].setValue(res.data['unitTemplateCode']); 
          this.model.controls['unitTemplateNameEN'].setValue(res.data['unitTemplateNameEN']); 
          this.model.controls['unitTemplateNameAr'].setValue( res.data['unitTemplateNameAr']); 
          this.model.controls['unitId'].setValue( res.data['unitId']); 
          this.model.controls['isActive'].setValue( res.data['isActive']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/unitsTemplate']);
      }
    }); 
  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new unitsTemplateModel(); 
      updateModel.unitTemplateCode  = this.model.controls['unitTemplateCode'].value; 
      updateModel.unitTemplateNameEN  = this.model.controls['unitTemplateNameEN'].value;
      updateModel.unitTemplateNameAr  = this.model.controls['unitTemplateNameAr'].value;
      updateModel.unitId  = this.model.controls['unitId'].value;
      updateModel.isActive  = this.model.controls['isActive'].value;
      updateModel.id  = this.Id;  
      await lastValueFrom (  this._commonCrudService.update("UnitTemplates/UpdateUnitTemplate/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.resetForm();
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/unitsTemplate']);
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
