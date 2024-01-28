import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { SupplierTypeModel } from 'app/Core/Models/Suppliers/SupplierType/supplier-type-model';
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
  responseModel: ResponseModel<SupplierTypeModel[]> = {
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
      supplierName: new UntypedFormControl('', [
        Validators.required
      ]),      
    })
  }
  async save(){ 
    if(this.model.valid){
      let addType = new SupplierTypeModel(); 
      //debugger;
      addType.supplierName = this.model.controls['supplierName'].value;  

      await this._commonCrudService.post("SupplierTypes/AddSupplier", addType, this.responseModel).subscribe({
        next: result => {
          this.responseModel = result
          this.resetForm();
            this.snackBar.open(result.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['suppliers/setup/supplierTypes']);
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
