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

@Component({
  selector: 'app-payment-group-update',
  templateUrl: './update.component.html',
  styleUrls:['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<PaymentGroupModel[]> = {
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
        Validators.required
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("PaymentGroup/GetPaymentGroup/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['name'].setValue(res.data['name']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['cashier/setup/paymentGroups']);
      }
    }); 

  }
  async update(){ 
    if(this.model.valid){
      let updateModel = new PaymentGroupModel(); 
      updateModel.Name = this.model.controls['name'].value; 
      updateModel.Id  = this.Id;  
      await lastValueFrom (  this._commonCrudService.update("PaymentGroup/" + this.Id, updateModel, this.responseModel)
      ) 
      .then(res => {
        this.responseModel = res;
        if(res.statusCode == 204){ 
            this.resetForm();
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['cashier/setup/paymentGroups']);
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
