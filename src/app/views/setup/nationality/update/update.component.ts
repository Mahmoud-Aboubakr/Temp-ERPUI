import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { nationalityModel } from 'app/Core/Models/Nationality/nationalityModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-nationality-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<nationalityModel[]> = {
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
      nationalityNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      nationalityNameEn: new UntypedFormControl('', [
        Validators.required
      ]),
      countryCode: new UntypedFormControl('', [ 
        Validators.required
      ]),
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Nationality/GetNationality/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['countryCode'].setValue(res.data['countryCode']); 
          this.model.controls['nationalityNameAr'].setValue(res.data['nationalityNameAr']); 
          this.model.controls['nationalityNameEn'].setValue( res.data['nationalityNameEn']); 

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/nationalities']);
      }
    }); 

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new nationalityModel(); 
      updateModel.countryCode  = this.model.controls['countryCode'].value; 
      updateModel.nationalityNameEn  = this.model.controls['nationalityNameEn'].value;
      updateModel.nationalityNameAr  = this.model.controls['nationalityNameAr'].value;
      updateModel.id  = this.Id;  
      await lastValueFrom (  this._commonCrudService.update("Nationality/UpdateNationality/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.resetForm();
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/nationalities']);
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
