import { Component, OnInit, Inject, LOCALE_ID, Input  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { NewsModel } from 'app/Core/Models/News/NewsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, lastValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeFrom } from 'app/Core/Froms/Employee/employeeFrom';

@Component({
  selector: 'app-hr-employee-general-information',
  templateUrl: './generalInformation.component.html',
  styleUrls:['./generalInformation.component.css'],
})
export class GeneralInformationComponent implements OnInit {
  @Input() employeeForm: EmployeeFrom;
  @Input() form: FormGroup;
  responseModel: ResponseModel<NewsModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  constructor(private _commonCrudService : CommonCrudService){ 

  }
  ngOnInit() {
    if (!this.form) {
      this.form = EmployeeFrom.getFormGroup();
      this.form.patchValue(this.employeeForm);
    }
  }

  onFileSelected(event: any, name:string ) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      // Assuming you have a method to handle file uploads and return the URL
      this.uploadImage(file);
      // .subscribe((imageUrl: string) => {
      //   console.log(imageUrl);
      //   //this.form.get(name).setValue(imageUrl);
      // });
    }
  }
  
  
  uploadImage(file: File) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      //this._commonCrudService.parseFile(file, 'api/upload', this.form )
       this._commonCrudService.parseFile(file, "File/Upload/" , this.responseModel).then(res => {
        console.log(res);
      });
      // this.http.post<string>('/api/upload', formData).subscribe((newPath: string) => {
      //   console.log('Image uploaded successfully. New path:', newPath);
      // });
    }
  }
  
 
}
