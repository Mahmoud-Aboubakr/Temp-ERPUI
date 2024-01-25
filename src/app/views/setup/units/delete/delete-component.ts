import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { unitsModel } from 'app/Core/Models/Units/unitsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-units-delete',
  templateUrl: './delete-component.html',
  styleUrls:['./delete-component.css'],
})
export class deleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<unitsModel[]> = {
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
      unitCode: new UntypedFormControl('', [
        Validators.required
      ]),
      unitNameEn: new UntypedFormControl('', [
        Validators.required
      ]),
      unitNameAr: new UntypedFormControl('', [ 
        Validators.required
      ]),
      unitDescription: new UntypedFormControl('', [ 
      ]),
      isActive: new UntypedFormControl('', [ 
      ]),
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Units/GetUnit/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['unitCode'].setValue(res.data['unitCode']); 
          this.model.controls['unitNameEn'].setValue(res.data['unitNameEn']); 
          this.model.controls['unitNameAr'].setValue( res.data['unitNameAr']); 
          this.model.controls['unitDescription'].setValue( res.data['unitDescription']); 
          this.model.controls['isActive'].setValue( res.data['isActive']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/units']);
      }
    }); 
  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("Units/DeleteUnit/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/units']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 
    }  
  }
}
