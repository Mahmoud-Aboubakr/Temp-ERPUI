import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeFrom } from 'app/Core/Froms/Employee/employeeFrom';
import { EmployeeModel } from 'app/Core/Models/Employee/EmployeeModel';
import { EmployeeFileModel } from 'app/Core/Models/File/EmployeeFileModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee-create',
  templateUrl: './create.component.html',
  styleUrls:['./create.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  form: FormGroup;
  responseModel: ResponseModel<EmployeeModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  employeeFiles: EmployeeFileModel[] = []; 
  constructor(private snackBar: MatSnackBar,private datePipe: DatePipe,
     private _commonCrudService : CommonCrudService,){ 
  }
  ngOnInit() {
    this.form = EmployeeFrom.getFormGroup();
  }

  tabChanged(index: number) {
    console.log(this.form.value);
    if (this.form.valid) {
      // The form is valid, enable the save button
      console.log(`Tab changed to index ${index}`);

      }
     }

  async save() {
      if (this.form.valid) {
          // Perform save logic with this.form.value
          var addModel = this.SeralizeData(new EmployeeModel());
          await lastValueFrom(this._commonCrudService.post("Employee/AddEmployee", addModel, this.responseModel)).then(res => {
            this.responseModel = res;
            if(res.statusCode == 201){ 
              console.log(res);  
              this.snackBar.open(res.message, 'Close', {
                  duration: 3000,
                });
              } else {
                this.snackBar.open(res.message, 'Close', {
                  duration: 3000,
                });
            }
          }); 
      } else {
        this.snackBar.open('Form is invalid. Please fill out required fields.', 'Close', {
          duration: 3000,
        });
      }
  }

  receiveDataFromChild(data: EmployeeFileModel) {
    // Handle the received data here
    this.employeeFiles.push(data);
    console.log('Data received from child:', data);
  }
  reset(){ 
    this.form = EmployeeFrom.getFormGroup();
    this.employeeFiles = []; 
  }
  
  SeralizeData(model: EmployeeModel) {
      model.employeeFiles = this.employeeFiles;
      model.StaffCode = this.form.value['StaffCode']
      model.Type = this.form.value['Type']
      model.AccessCardNumber = this.form.value['AccessCardNumber'] == '' ? null : this.form.value['AccessCardNumber']   
      model.FirstNameAr = this.form.value['FirstNameAr'] 
      model.MiddleNameAr = this.form.value['MiddleNameAr']
      model.LastNameAr = this.form.value['LastNameAr']  
      model.FirstNameEn = this.form.value['FirstNameEn'] 
      model.MiddleNameEn = this.form.value['MiddleNameEn']
      model.LastNameEn = this.form.value['LastNameEn']  
      model.Research = this.form.value['Research']   
      model.POD = this.form.value['POD']        
      model.Geneder = this.form.value['Geneder']     
      model.DateOfBirth = this.form.value['DateOfBirth'] ? this.datePipe.transform(this.form.value['DateOfBirth']   , 'yyyy-MM-dd') : null 
      model.BirthPlace = this.form.value['BirthPlace']  
      model.Union = this.form.value['Union']       
      model.DepartmentId = this.form.value['DepartmentId']
      model.DivisioinsId = this.form.value['DivisioinsId']
      model.ShirftType = this.form.value['ShirftType']  
      model.MaritalStatus = this.form.value['MaritalStatus']
      model.Phone = this.form.value['Phone']       
      model.NationalId = this.form.value['NationalId']  
      model.IdentificationType = this.form.value['IdentificationType']  
      model.Nationality = this.form.value['Nationality']         
      model.NationalIdEndDate = this.form.value['NationalIdEndDate'] ? this.datePipe.transform(this.form.value['NationalIdEndDate']   , 'yyyy-MM-dd') : null    
      model.Religon = this.form.value['Religon']             
      model.AttendanceMachineCode = this.form.value['AttendanceMachineCode']        
      model.SignatureImagePath = this.form.value['SignatureImagePath']           
      model.EmpolyeeImagePath = this.form.value['EmpolyeeImagePath']            
      model.PersonalEmailAddress = this.form.value['PersonalEmailAddress']         
      model.OfficialEmailAddress = this.form.value['OfficialEmailAddress']   
      model.DateOfAppointment = this.form.value['DateOfAppointment'] ? this.datePipe.transform(this.form.value['DateOfAppointment']   , 'yyyy-MM-dd') : null    
      model.DateOfConfirmation = this.form.value['DateOfConfirmation'] ? this.datePipe.transform(this.form.value['DateOfConfirmation']   , 'yyyy-MM-dd') : null 
      model.ProbationEndDate = this.form.value['ProbationEndDate'] ? this.datePipe.transform(this.form.value['ProbationEndDate']   , 'yyyy-MM-dd') : null       
      model.ProbationPeriod = this.form.value['ProbationPeriod'] == '' ? null : this.form.value['ProbationPeriod']     
      model.ProbationPeriodNumber = this.form.value['ProbationPeriodNumber']  
      model.DateOfJoining = this.form.value['DateOfJoining'] ? this.datePipe.transform(this.form.value['DateOfJoining']   , 'yyyy-MM-dd') : null           
      model.ContractStartingDate = this.form.value['ContractStartingDate'] ? this.datePipe.transform(this.form.value['ContractStartingDate']   , 'yyyy-MM-dd') : null 
      model.ExpiryDateOfContact = this.form.value['ExpiryDateOfContact'] ? this.datePipe.transform(this.form.value['ExpiryDateOfContact']   , 'yyyy-MM-dd') : null 
      model.NoticePeriodTime = this.form.value['NoticePeriodTime']       
      model.NoticePeriod = this.form.value['NoticePeriod']           
      model.ContractPlace = this.form.value['ContractPlace']          
      model.ContractType = this.form.value['ContractType']           
      model.IsHalfTime = this.form.value['IsHalfTime']            
      model.Cader = this.form.value['Cader']                 
      model.TravlingTickets = this.form.value['TravlingTickets']       
      model.HoucingAllowance = this.form.value['HoucingAllowance']              
      model.BasicSalary = this.form.value['BasicSalary']                   
      model.SalaryPaymentMethod = this.form.value['SalaryPaymentMethod']           
      model.SocialServiceFundSubscription = this.form.value['SocialServiceFundSubscription']
      model.Remarks = this.form.value['Remarks'] 
      model.JobTitle = this.form.value['JobTitle']              
      model.JobDegree = this.form.value['JobDegree']             
      model.Country = this.form.value['Country']               
      model.Governates = this.form.value['Governates']            
      model.City = this.form.value['City']                  
      model.District = this.form.value['District']              
      model.EmerganceyContact = this.form.value['EmerganceyContact']     
      model.Relation = this.form.value['Relation']              
      model.LocalAddress = this.form.value['LocalAddress']          
      model.LocalAddress2 = this.form.value['LocalAddress2']         
      model.LocalAddress3 = this.form.value['LocalAddress3']         
      model.LocalAddress4 = this.form.value['LocalAddress4']         
      model.PermenantAddress = this.form.value['PermenantAddress']      
      model.PermenantAddress2 = this.form.value['PermenantAddress2']     
      model.PermenantAddress3 = this.form.value['PermenantAddress3']     
      model.PermenantAddress4 = this.form.value['PermenantAddress4']     
      model.WorkPhone = this.form.value['WorkPhone']             
      model.PlaceIncuranceIdentity = this.form.value['PlaceIncuranceIdentity']
      model.PassportNumber = this.form.value['PassportNumber']        
      model.DrivingLicenceNumber = this.form.value['DrivingLicenceNumber']  
      model.SyndicateCard = this.form.value['SyndicateCard']         
      model.WorkPermit = this.form.value['WorkPermit']            
      model.InssuranceValue = this.form.value['InssuranceValue']       
      model.InssuranceJobTitle = this.form.value['InssuranceJobTitle']    
      model.InssuranceNumber = this.form.value['InssuranceNumber']      
      model.BloodType = this.form.value['BloodType']             
      model.PasswportExpirDate      = this.form.value['DateOfConfirmation'] ? this.datePipe.transform(this.form.value['DateOfConfirmation']   , 'yyyy-MM-dd') : null     
      model.DateOfIssuanceOfLicence = this.form.value['DateOfIssuanceOfLicence'] ? this.datePipe.transform(this.form.value['DateOfIssuanceOfLicence']   , 'yyyy-MM-dd') : null 
      model.LicenceExpirationDate   = this.form.value['LicenceExpirationDate'] ? this.datePipe.transform(this.form.value['LicenceExpirationDate']   , 'yyyy-MM-dd') : null 
      model.ExpiryDateOfWorkPermit  = this.form.value['ExpiryDateOfWorkPermit'] ? this.datePipe.transform(this.form.value['ExpiryDateOfWorkPermit']   , 'yyyy-MM-dd') : null 
      model.InssuranceDate          = this.form.value['InssuranceDate'] ? this.datePipe.transform(this.form.value['InssuranceDate']   , 'yyyy-MM-dd') : null 
      return model; 

  }

}

