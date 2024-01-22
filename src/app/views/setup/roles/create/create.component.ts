import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { RolesModel } from 'app/Core/Models/Roles/RolesModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<RolesModel[]> = {
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
      name: new UntypedFormControl('', [
        Validators.required
        // Validators.minLength(4),
        // Validators.maxLength(9)
        
      ]),      
      descriptionAr: new UntypedFormControl('', [
        Validators.required
      ]),
      descriptionEn: new UntypedFormControl('', [ 
        Validators.required
      ]),
      fulDescription: new UntypedFormControl('', [
        //Validators.required
      ])
    })
  }
  async save(){ 
    if(this.model.valid){
      let addModel = new RolesModel(); 
      //debugger;
      addModel.name = this.model.controls['name'].value; 
      addModel.descriptionAr   = this.model.controls['descriptionAr'].value;
      addModel.descriptionEn  = this.model.controls['descriptionEn'].value; 
      addModel.fulDescription  = this.model.controls['fulDescription'].value; 

      await this._commonCrudService.post("Authentication/role", addModel, this.responseModel).subscribe({
        next: result => {
          this.responseModel = result
          this.resetForm();
            this.snackBar.open(result.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['setup/roles']);
        },
        error: err => {
          this.snackBar.open(err.message, 'Close', {
            duration: 3000,
          });
        }
      })
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
