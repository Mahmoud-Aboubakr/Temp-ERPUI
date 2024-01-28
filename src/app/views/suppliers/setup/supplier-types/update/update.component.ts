import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { SupplierTypeModel } from 'app/Core/Models/Suppliers/SupplierType/supplier-type-model';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  Id: number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<SupplierTypeModel[]> = {
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
      supplierName: new UntypedFormControl('', [
      ]),
    })
  }

  async getData(id){ 
    this._commonCrudService.get('SupplierTypes/GetSupplierType/' + id, this.responseModel).subscribe({
      next: res => {
          this.model.controls['supplierName'].setValue(res.data['supplierName']); 
          this.Id = res.data.id;
      },
      error: err => {
        this.console.log(err)
        this.snackBar.open(err.error.message, 'Close', {
          duration: 3000,
        });
        this.router.navigate(['suppliers/setup/supplierTypes']);
      }
    })
  }

  async update(){ 
    if(this.model.valid){
      let updateModel = new SupplierTypeModel(); 
      updateModel.supplierName  = this.model.controls['supplierName'].value; 
      updateModel.id = this.Id;
      
      debugger;
      await this._commonCrudService.update('SupplierTypes/UpdateSupplier/' + this.Id, updateModel, this.responseModel).subscribe({
        next: res => {
          this.resetForm();
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['suppliers/setup/supplierTypes']);
        },
        error: err => {
          this.console.log(err)
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
