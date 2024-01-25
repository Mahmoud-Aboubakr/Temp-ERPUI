import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { unitsTemplateModel } from 'app/Core/Models/UnitsTemplate/unitsTemplateModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-unitsTemplate-delete',
  templateUrl: './delete-component.html',
  styleUrls:['./delete-component.css'],
})
export class deleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<unitsTemplateModel[]> = {
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
      unitTemplateCode: new UntypedFormControl('', [
         Validators.required
      ]),
      unitTemplateNameEN: new UntypedFormControl('', [ 
        Validators.required
      ]),
      unitTemplateNameAr: new UntypedFormControl('', [
        Validators.required
      ]),
      unitId: new UntypedFormControl('', [
        Validators.required
      ]),
      isActive: new UntypedFormControl('', [
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("UnitTemplates/GetUnitTemplate/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['unitTemplateCode'].setValue(res.data['unitTemplateCode']); 
          this.model.controls['unitTemplateNameEN'].setValue(res.data['unitTemplateNameEN']); 
          this.model.controls['unitTemplateNameAr'].setValue( res.data['unitTemplateNameAr']); 
          this.model.controls['unitId'].setValue( res.data['unitId']); 
          this.model.controls['isActive'].setValue( res.data['isActive']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/unitsTemplate']);
      }
    }); 
  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("UnitTemplates/DeleteUnitTemplate/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/unitsTemplate']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 
    }  
  }
}
