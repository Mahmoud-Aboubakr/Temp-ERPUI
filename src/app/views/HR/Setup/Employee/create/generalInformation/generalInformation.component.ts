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
import { UploadFileModel } from 'app/Core/Models/File/UploadFileModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'app/Core/Services/ImageService';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-hr-employee-general-information',
  templateUrl: './generalInformation.component.html',
  styleUrls:['./generalInformation.component.css'],
})
export class GeneralInformationComponent implements OnInit {
  @Input() employeeForm: EmployeeFrom;
  @Input() form: FormGroup;
  image:string;
  responseModel: ResponseModel<UploadFileModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  constructor(private snackBar: MatSnackBar,
    private _commonCrudService : CommonCrudService, 
    private sanitizer: DomSanitizer, 
    private imageService:ImageService){ 

  }
  ngOnInit() {
    if (!this.form) {
      this.form = EmployeeFrom.getFormGroup();
      this.form.patchValue(this.employeeForm);
    }
  }

  onFileSelected(event: any, selectedAttrbuteName:string ) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.uploadImage(file, selectedAttrbuteName);
    }
  }
  
  
  uploadImage(file: File, selectedAttrbuteName:string) {
    if (file) {
       this._commonCrudService.uploadFile(file, "File/UploadImage/" , this.responseModel)
       .subscribe(response => {
        if(response.statusCode == 201){
          this.form.get(selectedAttrbuteName).setValue(response.data.filePath);
          //this.loadImageAsBase64(this.form.get(selectedAttrbuteName).value);
        }else{ 
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
  getImageUrl(relativePath: string): string {
    return `${environment.fileUrl}${relativePath}`;
  }
 
}
