import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CreateNew } from 'app/Core/Models/News/CreateNew';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-news-delete',
  templateUrl: './delete.component.html',
  styleUrls:['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<CreateNew[]> = {
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
      newsTextAr: new UntypedFormControl('', [
      ]),
      newsTextEn: new UntypedFormControl('', [
      ]),
      activeFrom: new UntypedFormControl('', [ 
        Validators.required
      ]),
      activeTo: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("News/GetNew/" + id, this.responseModel))
    .then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['activeFrom'].setValue(this.datePipe.transform(res.data['activateFrom'], 'yyyy-MM-dd' ) ); 
          this.model.controls['activeTo'].setValue(this.datePipe.transform(res.data['activateTo'], 'yyyy-MM-dd')); 
          this.model.controls['newsTextAr'].setValue(res.data['newsTextAr']); 
          this.model.controls['newsTextEn'].setValue( res.data['newsTextEn']);
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['setup/news']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("News/DeleteNew/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['setup/news']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
