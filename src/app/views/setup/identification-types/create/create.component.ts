import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IdentificationTypes } from 'app/Core/Models/IdentificationTypes/identification-types';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<IdentificationTypes[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  constructor(private _commonCrudService : CommonCrudService,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.model = new UntypedFormGroup({
      name_ar: new UntypedFormControl('', [
        Validators.required
        // Validators.minLength(4),
        // Validators.maxLength(9)
        
      ]),
      name_en: new UntypedFormControl('', [
        Validators.required
      ]),
      active: new UntypedFormControl(true, [ 
        //Validators.required
      ]),
      char_accept: new UntypedFormControl(false, [
        //Validators.required
      ]),
      length: new UntypedFormControl('', [
        Validators.required
      ]),
      military_id: new UntypedFormControl(false, [
        //Validators.required
      ])
    })
  }
  async save(){ 
    if(this.model.valid){
    let addModel = new IdentificationTypes(); 

    addModel.name_ar = this.model.controls['name_ar'].value; 
    addModel.name_en   = this.model.controls['name_en'].value;
    addModel.active  = this.model.controls['active'].value; 
    addModel.char_accept  = this.model.controls['char_accept'].value; 
    addModel.length  = this.model.controls['length'].value; 
    addModel.military_id  = this.model.controls['military_id'].value; 

    await lastValueFrom(this._commonCrudService.post("identifications/AddIdentification", addModel, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 201){ 
          this.resetForm();
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/identifications']);
        } else {
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
