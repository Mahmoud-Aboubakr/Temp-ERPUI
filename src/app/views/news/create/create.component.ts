import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CreateNew } from 'app/Core/Models/News/CreateNew';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formData = {}
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<CreateNew[]> = {
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
      newsTextAr: new UntypedFormControl('', [
        // Validators.minLength(4),
        // Validators.maxLength(9)
        
      ]),
      newsTextEn: new UntypedFormControl('', [
        // Validators.required
      ]),
      activeFrom: new UntypedFormControl('', [ 
        Validators.required
      ]),
      activeTo: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  async save(){ 
    if(this.model.valid){
    let addModel = new CreateNew(); 
    //debugger;
    addModel.activateFrom = this.datePipe.transform(this.model.controls['activeFrom'].value, 'yyyy-MM-dd'); 
    addModel.activateTo   = this.datePipe.transform(this.model.controls['activeTo'].value, 'yyyy-MM-dd'); 
    addModel.newsTextAr  = this.model.controls['newsTextAr'].value; 
    addModel.newsTextEn  = this.model.controls['newsTextEn'].value; 
    await lastValueFrom(this._commonCrudService.post("News/AddNew", addModel, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 201){ 
          this.resetForm();
          this.snackBar.open('News added successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/news']);
        } else {
          this.snackBar.open('Failed to add news. Please try again.', 'Close', {
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
