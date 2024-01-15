import { EmployeeFileModel } from "../File/EmployeeFileModel";

export class EmployeeModel{
    employeeFiles:EmployeeFileModel[];
    StaffCode:string;
    Type:number;
    AccessCardNumber:string;
    BranchId:number;    
    FirstNameAr:string; 
    MiddleNameAr:string;
    LastNameAr:string;  
    FirstNameEn:string; 
    MiddleNameEn:string;
    LastNameEn:string;  
    Research:boolean;   
    POD:boolean;        
    Geneder:number;     
    DateOfBirth:string;    
    BirthPlace:string;  
    Union:number;       
    DepartmentId:number;
    DivisioinsId:number;
    ShirftType:number;  
    MaritalStatus:number;
    Phone:string;       
    NationalId:number;  
    IdentificationType:number;  
    Nationality:number;         
    NationalIdEndDate:string;     
    Religon:number;             
    AttendanceMachineCode:string;        
    SignatureImagePath:string;           
    EmpolyeeImagePath:string;            
    PersonalEmailAddress:string;         
    OfficialEmailAddress:string;   
    DateOfAppointment:string;        
    DateOfConfirmation:string;       
    ProbationEndDate:string;         
    ProbationPeriod:number;        
    ProbationPeriodNumber:number;  
    DateOfJoining:string;            
    ContractStartingDate:string;     
    ExpiryDateOfContact:string;      
    NoticePeriodTime:number;       
    NoticePeriod:number;           
    ContractPlace:string;          
    ContractType:number;           
    IsHalfTime:boolean;            
    Cader:boolean;                 
    TravlingTickets:boolean;       
    HoucingAllowance:number;              
    BasicSalary:number;                   
    SalaryPaymentMethod:number;           
    SocialServiceFundSubscription:boolean;
    Remarks:string; 
    JobTitle:number;              
    JobDegree:string;             
    Country:number;               
    Governates:number;            
    City:number;                  
    District:number;              
    EmerganceyContact:string;     
    Relation:number;              
    LocalAddress:string;          
    LocalAddress2:string;         
    LocalAddress3:string;         
    LocalAddress4:string;         
    PermenantAddress:string;      
    PermenantAddress2:string;     
    PermenantAddress3:string;     
    PermenantAddress4:string;     
    WorkPhone:string;             
    PlaceIncuranceIdentity:number
    PassportNumber:number;        
    DrivingLicenceNumber:number;  
    SyndicateCard:string;         
    WorkPermit:string;            
    InssuranceValue:string;       
    InssuranceJobTitle:string;    
    InssuranceNumber:number;      
    BloodType:number;             
    PasswportExpirDate:string;      
    DateOfIssuanceOfLicence:string; 
    LicenceExpirationDate:string;   
    ExpiryDateOfWorkPermit:string;  
    InssuranceDate:string;          
}