import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { nationalityModel } from 'app/Core/Models/Nationality/nationalityModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-nat-delete',
  templateUrl: './delete-component.html',
  styleUrls:['./delete-component.css'],
})
export class deleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<nationalityModel[]> = {
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
      nameEn: new UntypedFormControl('', [
      ]),
      nameAr: new UntypedFormControl('', [
      ]),
      countryCode: new UntypedFormControl('', [ 
        Validators.required
      ]),
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Nationality/GetNationality/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['countryCode'].setValue(res.data['countryCode']); 
          this.model.controls['nameEn'].setValue( res.data['nameEn']);
          this.model.controls['nameAr'].setValue( res.data['nameAr']);

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/nationality']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("Nationality/DeleteNationality/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/nationality']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
