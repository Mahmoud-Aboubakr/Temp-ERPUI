import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BranchModel } from 'app/Core/Models/Branches/BranchModel';
import { RolesModel } from 'app/Core/Models/Roles/RolesModel';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy{

  constructor(private _formBuilder: FormBuilder){}

  subscription: Subscription;
  branchSubmittedValue: any;
  roleSubmittedValue: any;
  checked: boolean = false;
  makeDiscount: boolean = false;

  branches: BranchModel[] = [
    {Id: 1, ArabicName: "دبي", EnglishName: "Dubai", IsActive: true, CompanyId: 1, Code: '100'},
    {Id: 2, ArabicName: "القاهرة", EnglishName: "Cairo", IsActive: true, CompanyId: 1, Code: '200'},
    {Id: 3, ArabicName: "جدة", EnglishName: "Gedda", IsActive: false, CompanyId: 1, Code: '300'},
    {Id: 2, ArabicName: "القاهرة", EnglishName: "Cairo", IsActive: true, CompanyId: 1, Code: '200'},
    {Id: 3, ArabicName: "جدة", EnglishName: "Gedda", IsActive: false, CompanyId: 1, Code: '300'},
    {Id: 1, ArabicName: "دبي", EnglishName: "Dubai", IsActive: true, CompanyId: 1, Code: '100'},
    {Id: 2, ArabicName: "القاهرة", EnglishName: "Cairo", IsActive: true, CompanyId: 1, Code: '200'},
    {Id: 3, ArabicName: "جدة", EnglishName: "Gedda", IsActive: false, CompanyId: 1, Code: '300'},
    {Id: 1, ArabicName: "دبي", EnglishName: "Dubai", IsActive: true, CompanyId: 1, Code: '100'},
    {Id: 2, ArabicName: "القاهرة", EnglishName: "Cairo", IsActive: true, CompanyId: 1, Code: '200'},
    {Id: 3, ArabicName: "جدة", EnglishName: "Gedda", IsActive: false, CompanyId: 1, Code: '300'},
  ];

  roles: RolesModel[] = [
    {id: '1', name: 'supervisor', descriptionAr: 'مشرف', descriptionEn: 'supervisor'},
    {id: '2', name: 'supervisor', descriptionAr: 'مشرف', descriptionEn: 'supervisor'},
    {id: '3', name: 'supervisor', descriptionAr: 'مشرف', descriptionEn: 'supervisor'},
    {id: '4', name: 'supervisor', descriptionAr: 'مشرف', descriptionEn: 'supervisor'},
  ]

  createUserForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    employee: new FormControl('', [Validators.required]),
    name_ar: new FormControl('', ),
    name_en: new FormControl('', ),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    phoneNumber: new FormControl('', [Validators.pattern('^01[0125][0-9]{8}$')]),
    email: new FormControl('', [Validators.email, Validators.required]),
    nationality: new FormControl(''),
    department: new FormControl(''),
    userType: new FormControl(''),
    branches: this._formBuilder.array(this.branches.map(x => false)),
    securityLevel: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    status: new FormControl('Active'),
    defaultModule: new FormControl(''),
    language: new FormControl('ar'),
    makeDiscount: new FormControl(false),
    discPercentage: new FormControl(''),
    discLimit: new FormControl(''),
    userRoles: this._formBuilder.array(this.roles.map(x => false))
  })

  ngOnInit(): void {
    this.createForm()
    this.patchBranches()
    this.patchRoles()
  }

  patchBranches(){
    const branchCheckboxControl = this.createUserForm.controls.branches as FormArray;

    this.subscription = branchCheckboxControl.valueChanges.subscribe(checkbox => {
      branchCheckboxControl.setValue(
        branchCheckboxControl.value.map((value: any, i: any) => value ? this.branches[i].Id : false),  // the value of checkbox
        { emitEvent: false }
      );
    });
  }

  patchRoles(){
    const roleCheckboxControl = this.createUserForm.controls.roles as FormArray;

    this.subscription = roleCheckboxControl.valueChanges.subscribe(checkbox => {
      roleCheckboxControl.setValue(
        roleCheckboxControl.value.map((value: any, i: any) => value ? this.roles[i].id : false),  // the value of checkbox
        { emitEvent: false }
      );
    });
  }

  addUser(e: FormGroup){
    console.log(e);
    const branchCheckboxControl = (e.controls.branches as FormArray);
    const roleCheckboxControl = (e.controls.roles as FormArray);

    const branchFormValue = {
      ...e.value,
      checkboxes: branchCheckboxControl.value.filter(value => !!value)
    }
    this.branchSubmittedValue = branchFormValue;

    const roleFormValue = {
      ...e.value,
      checkboxes: roleCheckboxControl.value.filter(value => !!value)
    }
    this.roleSubmittedValue = roleFormValue;
  }

  createForm(): FormGroup{
    return this.createUserForm;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
