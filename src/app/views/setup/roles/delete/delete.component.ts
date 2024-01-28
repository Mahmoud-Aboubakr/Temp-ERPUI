import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { RolesModel } from 'app/Core/Models/Roles/RolesModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  Id: string;
  formData = {};
  console = console;
  model: UntypedFormGroup;
  responseModel: ResponseModel<RolesModel[]> = {
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
      name: new UntypedFormControl('', [Validators.required]),
      descriptionAr: new UntypedFormControl('', [Validators.required]),
      descriptionEn: new UntypedFormControl('', [Validators.required]),
      fulDescription: new UntypedFormControl('')
    })
  }
  async getData(id){ 

    this._commonCrudService.get('Authentication/rolebyid?roleId=' + id, this.responseModel).subscribe({
      next: res => {
          this.model.controls['name'].setValue(res.data['name']); 
          this.model.controls['descriptionAr'].setValue(res.data['descriptionAr']); 
          this.model.controls['descriptionEn'].setValue(res.data['descriptionEn']); 
          this.model.controls['fulDescription'].setValue( res.data['fulDescription']);
      },
      error: err => {
        this.snackBar.open(err.error.message, 'Close', {
          duration: 3000,
        });
        this.router.navigate(['setup/roles']);
      }
    })
  }

  async delete(){ 
    if(this.model.valid){
      await this._commonCrudService.delete('Authentication/role?roleId=' + this.Id).subscribe({
        next: res => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.router.navigate(['setup/roles']);
        },
        
        error: err => this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        })
      })
    }
  }
}
