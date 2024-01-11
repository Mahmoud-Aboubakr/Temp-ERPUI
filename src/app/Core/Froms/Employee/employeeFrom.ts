import { FormControl, FormGroup, Validators } from "@angular/forms";
import { number } from "echarts";

export  class EmployeeFrom {
    constructor() {
    }
    static getFormGroup(): FormGroup {
        return new FormGroup({
             // General Information
            StaffCode: new FormControl('', Validators.required),
            Type: new FormControl(0,Validators.required),
            AccessCardNumber: new FormControl('', Validators.pattern(/^[0-9]+$/)),
            BranchId: new FormControl('', Validators.required),
            FirstNameAr: new FormControl('', Validators.required),
            MiddleNameAr: new FormControl('', Validators.required),
            LastNameAr: new FormControl('', Validators.required),
            FirstNameEn: new FormControl('', Validators.required),
            MiddleNameEn: new FormControl('', Validators.required),
            LastNameEn: new FormControl('', Validators.required),
            Research: new FormControl(false),
            POD: new FormControl(false),
            Geneder: new FormControl(0,Validators.required),
            DateOfBirth: new FormControl('',Validators.required),
            BirthPlace: new FormControl(''),
            Union: new FormControl(0),
            DepartmentId: new FormControl('', Validators.required),
            DivisioinsId: new FormControl('', Validators.required),
            ShirftType: new FormControl('', Validators.required),
            MaritalStatus: new FormControl('', Validators.required),
            Phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
            NationalId: new FormControl('', Validators.required),
            IdentificationType: new FormControl('', Validators.required),
            Nationality: new FormControl('', Validators.required),
            NationalIdEndDate: new FormControl('', Validators.required),
            Religon: new FormControl(0),
            AttendanceMachineCode: new FormControl(''),
            SignatureImagePath: new FormControl(''),
            EmpolyeeImagePath: new FormControl(''),
            PersonalEmailAddress: new FormControl(''),
            OfficialEmailAddress: new FormControl(''),
            
            // Employment Data
            DateOfAppointment: new FormControl(''),
            DateOfConfirmation: new FormControl(''),
            ProbationEndDate: new FormControl(''),
            ProbationPeriod: new FormControl(''),
            ProbationPeriodNumber: new FormControl('',  Validators.pattern(/^[0-9]+$/)),
            DateOfJoining: new FormControl('', Validators.required),
            ContractStartingDate: new FormControl('', Validators.required),
            ExpiryDateOfContact: new FormControl('', Validators.required),
            NoticePeriodTime: new FormControl(''),
            NoticePeriod: new FormControl(0),
            ContractPlace: new FormControl('', Validators.required),
            ContractType: new FormControl(0),
            IsHalfTime: new FormControl(false),
            Cader: new FormControl(false),
            TravlingTickets: new FormControl(false),
            HoucingAllowance: new FormControl(0),
            BasicSalary: new FormControl('', Validators.required),
            SalaryPaymentMethod: new FormControl('', Validators.required),
            SocialServiceFundSubscription: new FormControl(false),
            Remarks: new FormControl(''),
            
            // Address and Contact Info
            JobTitle: new FormControl('', Validators.required),
            JobDegree: new FormControl('', Validators.required),
            Country: new FormControl(0),
            Governates: new FormControl(0),
            City: new FormControl(0),
            District: new FormControl('', Validators.required),
            EmerganceyContact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
            Relation: new FormControl(0),
            LocalAddress: new FormControl('', Validators.required),
            LocalAddress2: new FormControl(''),
            LocalAddress3: new FormControl(''),
            LocalAddress4: new FormControl(''),
            PermenantAddress: new FormControl(''),
            PermenantAddress2: new FormControl(''),
            PermenantAddress3: new FormControl(''),
            PermenantAddress4: new FormControl(''),
            WorkPhone: new FormControl('', Validators.pattern(/^[0-9]+$/)),
            PlaceIncuranceIdentity: new FormControl(''),
            PassportNumber: new FormControl('', Validators.pattern(/^[0-9]+$/)),
            DrivingLicenceNumber: new FormControl('', Validators.pattern(/^[0-9]+$/)),
            SyndicateCard: new FormControl(''),
            WorkPermit: new FormControl(''),
            InssuranceValue: new FormControl(''),
            InssuranceJobTitle: new FormControl(''),
            InssuranceNumber: new FormControl('', Validators.pattern(/^[0-9]+$/)),
            BloodType: new FormControl(0),
            PasswportExpirDate: new FormControl(''),
            DateOfIssuanceOfLicence: new FormControl(''),
            LicenceExpirationDate: new FormControl(''),
            ExpiryDateOfWorkPermit: new FormControl(''),
            InssuranceDate: new FormControl(''),
        });
    }
}