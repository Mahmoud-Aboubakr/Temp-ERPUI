import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApplicationPagePrefixModel } from 'app/Core/Models/applicationPagePrefix/applicationPagePrefixModel';

@Component({
  selector: 'app-applicationPagePrefix-delete',
  templateUrl: './delete.component.html',
  styleUrls:['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<ApplicationPagePrefixModel[]> = {
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
    //console.log(this.Id);
    this.getData(this.Id); 
    this.model = new UntypedFormGroup({
      pageName: new UntypedFormControl('', [
        Validators.required
      ]),
      prefix: new UntypedFormControl('', [
        Validators.required
      ]),
      length: new UntypedFormControl('', [ 
        Validators.required
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("ApplicationPagePrefix/GetApplicationPagePrefix/" + id, this.responseModel))
    .then(res => {
      debugger;
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['pageName'].setValue(res.data['pageName']); 
          this.model.controls['prefix'].setValue(res.data['prefix']); 
          this.model.controls['length'].setValue( res.data['length']);
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/applicationPagePrefix']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("ApplicationPagePrefix/DeleteApplicationPagePrefix/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/applicationPagePrefix']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
