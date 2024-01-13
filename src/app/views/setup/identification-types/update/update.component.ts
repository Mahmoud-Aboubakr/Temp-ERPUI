import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentificationTypes } from 'app/Core/Models/IdentificationTypes/identification-types';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  Id: string;
  formData = {};
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
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      name_ar: new UntypedFormControl('', [
        Validators.required
      ]),
      name_en: new UntypedFormControl('', [
        Validators.required
      ]),
      active: new UntypedFormControl('', [ 
        //Validators.required
      ]),
      char_accept: new UntypedFormControl('', [
        //Validators.required
      ]),
      length: new UntypedFormControl('', [
        Validators.required
      ]),
      military_id: new UntypedFormControl('', [
        //Validators.required
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("identificaions/GetIdentification/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['name_ar'].setValue(res.data['name_ar']); 
          this.model.controls['name_en'].setValue(res.data['name_en']); 
          this.model.controls['active'].setValue(res.data['active']); 
          this.model.controls['char_accept'].setValue( res.data['char_accept']); 
          this.model.controls['length'].setValue(res.data['length']); 
          this.model.controls['military_id'].setValue( res.data['military_id']);

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/identifications']);
      }
    }); 

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new IdentificationTypes(); 
      updateModel.name_ar  = this.model.controls['name_ar'].value; 
      updateModel.name_en  = this.model.controls['name_en'].value;
      updateModel.active  = this.model.controls['active'].value;
      updateModel.char_accept  = this.model.controls['char_accept'].value;
      updateModel.military_id  = this.model.controls['military_id'].value;
      updateModel.length  = this.model.controls['length'].value;
      updateModel.code  = this.Id;  

      await lastValueFrom (  this._commonCrudService.update("roles/UpdateRole/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
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
