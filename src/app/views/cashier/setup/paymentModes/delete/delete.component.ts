import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NewsModel } from 'app/Core/Models/News/NewsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ItemTypeModel } from 'app/Core/Models/Inventory/ItemType/ItemTypeModel';
import { ContactTypeModel } from 'app/Core/Models/Inventory/ContactTypes/ContactTypeModel';
import { PaymentGroupModel } from 'app/Core/Models/Cashier/Setup/PaymentGroup/PaymentGroupModel';
import { PaymentModeTypes } from 'app/Core/Models/Cashier/Setup/PaymentModeTypes/PaymentModeTypes';
import { PaymentModesModel } from 'app/Core/Models/Cashier/Setup/PaymentModes/PaymentModesModel';

@Component({
  selector: 'app-payment-modes-delete',
  templateUrl: './delete.component.html',
  styleUrls:['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<PaymentModesModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  paginationResponseModel: ResponseModel<PaymentModeTypes[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  paymentModeTypes:PaymentModeTypes[]; 
  isActive = true; 
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _commonCrudService : CommonCrudService,
    private datePipe: DatePipe,private snackBar: MatSnackBar ) { }
  ngOnInit() {
    this.Id  = this.route.snapshot.params['id'];
    this.getData(this.Id); 
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      paymentModeName: new UntypedFormControl('', [
        Validators.required
      ]),
      paymentModeTypeId: new UntypedFormControl('', [
        Validators.required
      ]),
      isActive: new UntypedFormControl('', [
      ]),

    }); 
    this.getPaymentModesType();
  }
  async getPaymentModesType(){ 
    var paginationParam  = { 
       PageNumber : 1, 
       PageSize : 1000
     }
     await lastValueFrom(this._commonCrudService.getAll("PaymentModeTypes/GetPaymentModesTypes", paginationParam , this.paginationResponseModel)).then(res => {
       this.paginationResponseModel = res;
       if(res.statusCode == 200){
         this.paymentModeTypes = this.paginationResponseModel.data;
       } else {
           this.snackBar.open(res.message, 'Close', {
             duration: 3000,
           });
       }
     }); 
   }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("PaymentModes/GetPaymentModes/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['paymentModeName'].setValue(res.data['paymentModeName']); 
          this.model.controls['paymentModeTypeId'].setValue(res.data['paymentModesTypeId']); 
          this.isActive = res.data['isActive']; 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['cashier/setup/paymentModes']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("PaymentModes/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['cashier/setup/paymentModes']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
