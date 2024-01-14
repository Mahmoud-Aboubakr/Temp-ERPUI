import { BranchModel } from "../Branches/BranchModel";
import { nationalityModel } from "../Nationality/nationalityModel";
import { RolesModel } from "../Roles/RolesModel";
import { userTypeModel } from "../userType/userTypeModel";

export class UsersModel {
    code: string;
    userName: string;
    employeeId: number;
    emp_name_ar: string;
    emp_name_en: string;
    gender: number;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    nationality: nationalityModel;
    deptId: number;
    userType: userTypeModel;
    branch: BranchModel[];
    securityLevelId: number;
    password: string;
    confirmPassword: string;
    status: string = 'Active';
    defaultModule: string;
    language: string = 'ar';
    makeDiscount: boolean = false;
    discPercentage: number;
    discLimit: number;
    userRoles: RolesModel[]
}
