import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { RolesModel } from 'app/Core/Models/Roles/RolesModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';

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
  responseModel: ResponseModel<RolesModel[]> = {
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
      name: new UntypedFormControl('', [
      ]),
      descriptionAr: new UntypedFormControl('', [
      ]),
      descriptionEn: new UntypedFormControl('', [ 
        Validators.required
      ]),
      fulDescription: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  async getData(id){ 
    this._commonCrudService.get('Authentication/rolebyid?roleId=' + id, this.responseModel).subscribe({
      next: res => {
          this.model.controls['name'].setValue(res.data['name']); 
          this.model.controls['descriptionAr'].setValue(res.data['descriptionAr']); 
          this.model.controls['descriptionEn'].setValue(res.data['descriptionEn']); 
          this.model.controls['fulDescription'].setValue( res.data['fulDescription']);
      },
      error: err => {
        this.snackBar.open(err.error.message, 'Close', {
          duration: 3000,
        });
        this.router.navigate(['setup/roles']);
      }
    })
  }

  async update(){ 
    if(this.model.valid){
      let updateModel = new RolesModel(); 
      updateModel.name  = this.model.controls['name'].value; 
      updateModel.descriptionAr  = this.model.controls['descriptionAr'].value;
      updateModel.descriptionEn  = this.model.controls['descriptionEn'].value;
      updateModel.fulDescription  = this.model.controls['fulDescription'].value;
      updateModel.id  = this.Id; 
      
      await this._commonCrudService.update('Authentication/role', updateModel, this.responseModel).subscribe({
        next: res => {
          this.resetForm();
          this.snackBar.open(res.message, 'Close', {
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
