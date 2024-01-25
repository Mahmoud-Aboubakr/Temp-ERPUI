import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { StoreAdjustmentModel } from 'app/Core/Models/StoreAdjustment/StoreAdjustmentModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-storeAdjustment-delete',
  templateUrl: './delete-component.html',
  styleUrls:['./delete-component.css'],
})
export class deleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<StoreAdjustmentModel[]> = {
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
    //console.log(this.Id);
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      description: new UntypedFormControl('', [ 
        Validators.required
      ]),
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("StoreAdjustment/GetstoreAdjustment/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['description'].setValue(res.data['description']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/storeAdjustment']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("StoreAdjustment/DeleteStoreAdjustment/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/storeAdjustment']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
