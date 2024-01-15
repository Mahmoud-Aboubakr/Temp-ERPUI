import { Component, OnInit, Inject, LOCALE_ID, Input, Output, EventEmitter  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { NewsModel } from 'app/Core/Models/News/NewsModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeFrom } from 'app/Core/Froms/Employee/employeeFrom';
import { HRFileModel } from 'app/Core/Models/File/HRFileModel';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { UploadFileModel } from 'app/Core/Models/File/UploadFileModel';
import { EmployeeFileModel } from 'app/Core/Models/File/EmployeeFileModel';
import { debug } from 'console';

@Component({
  selector: 'app-hr-employee-employment-data',
  templateUrl: './employmentData.component.html',
  styleUrls:['./employmentData.component.css'],
})
export class EmploymentDataComponent implements OnInit {
  @Input() employeeForm: EmployeeFrom;
  @Input() form: FormGroup;
  paginationResponseModel: PaginationResponseModel<HRFileModel[]> = {
    currentPage:0,
    errorMessage: '',
    lang:'',
    message:'',
    pageSize:0,
    statusCode:0,
    totalCount:0,
    totalPages: 0,
    data: undefined
  }
  paginationParam : PaginationParam = { 
    PageNumber : 1, 
    PageSize : environment.paginationList[0]
  }
  fileTableColumns: string[] = ['hiringDocument', 'isMandatory', 'status', 'file'];
  fileDataSource = new MatTableDataSource<HRFileModel>();
  status = environment.status;
  responseModel: ResponseModel<UploadFileModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  @Output() dataReady = new EventEmitter<EmployeeFileModel>();

  constructor(private _commonCrudService: CommonCrudService, private snackBar: MatSnackBar){

  }
  ngOnInit() {
    if (!this.form) {
      this.form = EmployeeFrom.getFormGroup();
      this.form.patchValue(this.employeeForm); // Populate form with existing data
    }
    // load table 
    this.fillTableDataSource();
  }

  async fillTableDataSource() {
    await lastValueFrom(this._commonCrudService.getAll("HRFile/GetHRFiles", this.paginationParam, this.paginationResponseModel))
    .then(res => {
      console.log(res);
      if(res.statusCode == 200){
        this.fileDataSource.data = res.data;
      }
    })
  }
  getStatusClass(statusId: number): string {
    var status = this.status[statusId];
    switch (status) {
      case 'pending':
        return 'pending-status';
      case 'active':
        return 'active-status';
      // Add more cases as needed
      default:
        return '';
    }
  }

  // Method to send data to the parent
  sendDataToParent(data: EmployeeFileModel) {
    this.dataReady.emit(data);
  }
  
  onFileSelected(event: any, file: any): void {
    debugger;
    const selectedFile = event.target.files[0];
    //file.selectedFile = selectedFile;
    if (selectedFile) {
      this._commonCrudService.uploadFile(selectedFile, "File/UploadFile/" , this.responseModel)
      .subscribe(response => {
       if(response.statusCode == 201){
        this.sendDataToParent(new EmployeeFileModel(file.id, response.data.filePath));    
       }else{ 
         this.snackBar.open(response.message, 'Close', {
           duration: 3000,
         });
       }
     });
   }
  }

  // uploadFile(file: any, reviceDate: any, expiryDate: any): void { 
  //   if (file.selectedFile) {
  //     // Call your file upload service and handle the response
  //     // this.fileUploadService.uploadFile(file.selectedFile).subscribe(
  //     //   (filePath: string) => {
  //     //     // Assuming your form model is called 'form' and has a 'filePath' field
  //     //     this.form.get('filePath').setValue(filePath);
  //     //     // You can also update other properties in your model based on the response if needed
  //     //     // E.g., file.filePath = filePath;
  //     //   },
  //     //   (error: any) => {
  //     //     console.error('Error uploading file:', error);
  //     //   }
  //     // );
  //   } else {
  //     console.warn('No file selected for upload.');
  //   }
  // }

}



