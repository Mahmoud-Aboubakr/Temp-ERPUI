import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { pagesModel } from 'app/Core/Models/applicationPages/pagesModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-applicationPage-delete',
  templateUrl: './delete-component.html',
  styleUrls:['./delete-component.css'],
})
export class deleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  appModules: any;
  responseModel: ResponseModel<pagesModel[]> = {
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
    this.getAppModules(); 
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      applicationTblId: new UntypedFormControl('', [
      ]),
      appModuleId: new UntypedFormControl('', [ 
      ]),
      appPageTypeId: new UntypedFormControl('', [
      ]),
      pageNameEn: new UntypedFormControl('', [
      ]),
      pageNameAr: new UntypedFormControl('', [
      ]),
      pageUrl: new UntypedFormControl('', [
      ]),
      sort: new UntypedFormControl('', [
      ]),
      pageDesCription: new UntypedFormControl('', [
      ]),
      isActive: new UntypedFormControl('', [
      ]),
    })
  }
  
  getAppModules(){
    this._commonCrudService.get('Pages/GetAppModules', this.appModules).subscribe({
      next: res =>{ debugger; this.appModules = res.data},
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }


  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("Pages/GetPage/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['applicationTblId'].setValue(res.data['applicationTblId']); 
          this.model.controls['appModuleId'].setValue( res.data['appModuleId']);
          this.model.controls['appPageTypeId'].setValue( res.data['appPageTypeId']);
          this.model.controls['pageNameEn'].setValue( res.data['pageNameEn']);
          this.model.controls['pageNameAr'].setValue( res.data['pageNameAr']);
          this.model.controls['pageDesCription'].setValue( res.data['pageNameEn']);
          this.model.controls['pageUrl'].setValue( res.data['pageUrl']);
          this.model.controls['sort'].setValue( res.data['sort']);
          this.model.controls['isActive'].setValue( res.data['isActive']);

      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/applicationPages']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("Pages/DeletePage/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/applicationPages']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
