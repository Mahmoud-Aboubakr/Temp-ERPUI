import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CountryModel } from 'app/Core/Models/Countries/CountryModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formData = {}
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
  constructor(private _commonCrudService : CommonCrudService,
    private router: Router,
    private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.model = new UntypedFormGroup({
      Code: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(40)
      ]),
      EnglishName: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(40)
      ]),
      ArabicName: new UntypedFormControl('', [ 
        Validators.required,
        Validators.maxLength(40)
      ])
    })
  }
  
  async save(){ 
    if(this.model.valid){
    let newModel = new CountryModel(); 
    newModel.Code  = this.model.controls['Code'].value; 
    newModel.EnglishName  = this.model.controls['EnglishName'].value; 
    newModel.ArabicName  = this.model.controls['ArabicName'].value; 
    await lastValueFrom(this._commonCrudService.post("Countries/AddCountry", newModel, this.responseModel)).then(res => {
      this.responseModel = res;
      
      if(res.statusCode == 201){ 
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/countries']);
        } else {
          this.resetForm();
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
