import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryModel } from 'app/Core/Models/Countries/CountryModel';
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
  responseModel: ResponseModel<CountryModel[]> = {
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
    private snackBar: MatSnackBar ) { }
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
      ])
    })
  }

  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Countries/GetCountry/" + id, this.responseModel))
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
          this.router.navigate(['setup/countries']);
      }
    }); 
  }

  async update(){ 
    if(this.model.valid){
      let updatedModel = new CountryModel(); 
      updatedModel.Id  = this.Id; 
      updatedModel.Code = this.model.controls['Code'].value;
      updatedModel.EnglishName  = this.model.controls['EnglishName'].value; 
      updatedModel.ArabicName  = this.model.controls['ArabicName'].value; 
      updatedModel.IsActive  = this.model.controls['IsActive'].value;

      await lastValueFrom(this._commonCrudService.update("Countries/" + this.Id, updatedModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
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
