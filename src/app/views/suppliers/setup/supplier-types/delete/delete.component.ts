import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { SupplierTypeModel } from 'app/Core/Models/Suppliers/SupplierType/supplier-type-model';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  Id:number;
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
  async delete(){ 
    if(this.model.valid){
      await this._commonCrudService.delete('SupplierTypes/DeleteSupplier/' + this.Id).subscribe({
        next: res => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.router.navigate(['suppliers/setup/supplierTypes']);
        },
        
        error: err => this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        })
      })
    }
  }

}
