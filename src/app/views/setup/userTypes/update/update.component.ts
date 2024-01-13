import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { userTypeModel } from 'app/Core/Models/userType/userTypeModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-userType-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<userTypeModel[]> = {
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
      descNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      descNameEn: new UntypedFormControl('', [
        Validators.required
      ]),
      typeName: new UntypedFormControl('', [ 
        Validators.required
      ]),
      fullDesc: new UntypedFormControl('', [ 
      ]),
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("UserType/GetUserType/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['typeName'].setValue(res.data['typeName']); 
          this.model.controls['descNameAr'].setValue(res.data['descNameAr']); 
          this.model.controls['descNameEn'].setValue( res.data['descNameEn']); 
          this.model.controls['fullDesc'].setValue( res.data['fullDesc']); 

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/userTypes']);
      }
    }); 

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new userTypeModel(); 
      updateModel.typeName  = this.model.controls['typeName'].value; 
      updateModel.descNameEn  = this.model.controls['descNameEn'].value;
      updateModel.descNameAr  = this.model.controls['descNameAr'].value;
      updateModel.fullDesc  = this.model.controls['fullDesc'].value;
      updateModel.id  = this.Id;  
      await lastValueFrom (  this._commonCrudService.update("UserType/UpdateUserType/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.resetForm();
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/userTypes']);
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
