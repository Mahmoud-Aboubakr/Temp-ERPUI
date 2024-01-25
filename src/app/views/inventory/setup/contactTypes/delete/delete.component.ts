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

@Component({
  selector: 'app-Item-Types-delete',
  templateUrl: './delete.component.html',
  styleUrls:['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  Id:number;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<ContactTypeModel[]> = {
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
      arabicName: new UntypedFormControl('', [
      ]),
      englishName: new UntypedFormControl('', [
      ])
    })
  }
  async getData(id){ 
    await lastValueFrom(this._commonCrudService.get("ContactTypes/GetContact/" + id, this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
          this.model.controls['arabicName'].setValue(res.data['arabicName']); 
          this.model.controls['englishName'].setValue(res.data['englishName']); 
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['inventory/setup/contactTypes']);
      }
    }); 

  }
  async delete(){ 
    if(this.model.valid){
      await lastValueFrom(this._commonCrudService.delete("ContactTypes/DeleteContact/" + this.Id))
      .then(res => {
        if(res.statusCode == 204){ 
            this.snackBar.open(res.message, 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['inventory/setup/contactTypes']);
          } else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
        }
      }); 

    }
    
  }
 

}
