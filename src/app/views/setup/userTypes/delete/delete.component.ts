import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { userTypeModel } from 'app/Core/Models/userType/userTypeModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-userType-delete',
  templateUrl: './delete.component.html',
  styleUrls:['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<userTypeModel[]> = {
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
      descNameEn: new UntypedFormControl('', [
      ]),
      descNameAr: new UntypedFormControl('', [
      ]),
      fullDesc: new UntypedFormControl('', [
      ]),
      typeName: new UntypedFormControl('', [ 
        Validators.required
      ]),
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("UserType/GetUserType/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['typeName'].setValue(res.data['typeName']); 
          this.model.controls['descNameEn'].setValue( res.data['descNameEn']);
          this.model.controls['descNameAr'].setValue( res.data['descNameAr']);
          this.model.controls['fullDesc'].setValue( res.data['fullDesc']);

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/userTypes']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("UserType/DeleteUserType/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/userTypes']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
