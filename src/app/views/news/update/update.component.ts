import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CreateNew } from 'app/Core/Models/News/CreateNew';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-news-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
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
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      newsTextAr: new UntypedFormControl('', [
      ]),
      newsTextEn: new UntypedFormControl('', [
      ]),
      activeFrom: new UntypedFormControl('', [ 
        Validators.required
      ]),
      activeTo: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("News/GetNew/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['activeFrom'].setValue(res.data['activateFrom']); 
          this.model.controls['activeTo'].setValue(res.data['activateTo']); 
          this.model.controls['newsTextAr'].setValue(res.data['newsTextAr']); 
          this.model.controls['newsTextEn'].setValue( res.data['newsTextEn']); 

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/news']);
      }
    }); 

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new CreateNew(); 
      updateModel.activateFrom = this.datePipe.transform(this.model.controls['activeFrom'].value, 'yyyy-MM-dd'); 
      updateModel.activateTo   = this.datePipe.transform(this.model.controls['activeTo'].value, 'yyyy-MM-dd'); 
      updateModel.newsTextAr  = this.model.controls['newsTextAr'].value; 
      updateModel.newsTextEn  = this.model.controls['newsTextEn'].value;
      updateModel.Id  = this.Id;  
      await lastValueFrom (  this._commonCrudService.update("News/UpdateNew/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.resetForm();
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['/news']);
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
