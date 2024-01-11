import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ApplicationPagePrefixModel } from 'app/Core/Models/applicationPagePrefix/applicationPagePrefixModel';
@Component({
  selector: 'app-applicationPagePrefix-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<ApplicationPagePrefixModel[]> = {
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
      PageName: new UntypedFormControl('', [
        Validators.required
      ]),
      Prefix: new UntypedFormControl('', [ 
        Validators.required
      ]),
      Length: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  async save(){ 
    if(this.model.valid){
    let addModel = new ApplicationPagePrefixModel(); 
    debugger;
    addModel.PageName  = this.model.controls['PageName'].value; 
    addModel.Prefix  = this.model.controls['Prefix'].value; 
    addModel.Length  = parseInt(this.model.controls['Length'].value); 
    await lastValueFrom(this._commonCrudService.post("ApplicationPagePrefix/AddApplicationPagePrefix", addModel, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 201){ 
          this.resetForm();
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/applicationPagePrefix']);
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
