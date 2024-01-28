import { LayoutService } from 'app/shared/services/layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { BranchModel } from 'app/Core/Models/Branches/BranchModel';
import { UsersModel } from 'app/Core/Models/Users/users-model';
import { StoresModel } from 'app/Core/Models/Stores/stores-model';

@Component({
  selector: 'app-sub-store',
  templateUrl: './sub-store.component.html',
  styleUrls: ['./sub-store.component.scss']
})
export class SubStoreComponent implements OnInit, OnDestroy {

  constructor(private _formBuilder: FormBuilder,
              private _layoutService: LayoutService,
              private _commonCrudService: CommonCrudService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getStores();
    this.getBranches();
    this.getUsers();
    this.createForm()
    this.patchStores()
    this.disableStoreCode()
    this._layoutService.currentLang.subscribe({
      next: value => {
        this.currentDir = value
      } 
    })
  }

  currentDir: string = 'ltr';
  subscription: Subscription;
  privilegeSubmittedValue: any;
  searchTerm: string = '';
  privileges: string[] = ['LPO', 'EPO', 'GRN', 'IToD'];
  branches: BranchModel[];
  users: UsersModel[];
  stores: StoresModel[];
  
  branchResponseModel: ResponseModel<BranchModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  userResponseModel: ResponseModel<UsersModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  storeResponseModel: ResponseModel<StoresModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  createStoreForm: FormGroup = new FormGroup({
    manual: new FormControl(false),
    storeCode: new FormControl({value: '', disabled: true}, [Validators.required]),
    mainStoreId: new FormControl('', [Validators.required]),
    storeNameAr: new FormControl('', [Validators.required]),
    storeNameEn: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    appUserId: new FormControl('', [Validators.required]),
    privileges: this._formBuilder.array(this.privileges.map(x => false)),
    branchId: new FormControl('', [Validators.required]),
    generalStore: new FormControl(''),
    costOfGoods: new FormControl(''),
    salesRevenue: new FormControl(''),
    settlementByDiscount: new FormControl(''),
    settlementAsWell: new FormControl(''),
    outgoingMovements: new FormControl('ar'),
    approvalAuthority: new FormControl(false),
    isAllowSupplierTrans: new FormControl(false),
    isActive: new FormControl(true),
    isScrapStore: new FormControl(false)
  })

  patchStores(){
    const privilegeCheckboxControl = this.createStoreForm.controls.privileges as FormArray;

    this.subscription = privilegeCheckboxControl.valueChanges.subscribe(checkbox => {
      privilegeCheckboxControl.setValue(
        privilegeCheckboxControl.value.map((value: any, i: any) => value ? this.privileges[i] : false),  // the value of checkbox
        { emitEvent: false }
      );
    });
  }

  getBranches(){
    this._commonCrudService.get('Branches', this.branchResponseModel).subscribe({
      next: res => {
        this.branches = res.data
      },
      error: err => console.log(err) 
    })
  }

  getUsers(){
    this._commonCrudService.get('Authentication/users', this.userResponseModel).subscribe({
      next: res => {
        this.users = res;
      },
      error: err => console.log(err)
    })
  }

  getStores(){
    this._commonCrudService.get('Stores/GetStores', this.storeResponseModel).subscribe({
      next: res => {
        //console.log(res)
        this.stores = res.data;
      },
      error: err => console.log(err)
    })
  }

  addStore(e: FormGroup){
    console.log(e);
    const privilegeCheckboxControl = (e.controls.privileges as FormArray);

    const privilegeFormValue = {
      ...e.value,
      checkboxes: privilegeCheckboxControl.value.filter(value => !!value)
    }
    this.privilegeSubmittedValue = privilegeFormValue;
    this.saveStore()
  }

  saveStore(){
    if(this.createStoreForm.valid){
      let store = new StoresModel()
      store.appUserId = this.createStoreForm.controls['appUserId'].value;
      store.mainStoreId = this.createStoreForm.controls['mainStoreId'].value;
      store.branchId = this.createStoreForm.controls['branchId'].value;
      store.departmentId = this.createStoreForm.controls['departmentId'].value;
      store.isActive = this.createStoreForm.controls['isActive'].value;
      store.isAllowSupplierTrans = this.createStoreForm.controls['isAllowSupplierTrans'].value;
      store.isScrapStore = this.createStoreForm.controls['isScrapStore'].value;
      store.manual = this.createStoreForm.controls['manual'].value;
      store.storeCode = this.createStoreForm.controls['storeCode'].value;
      store.storeNameAr = this.createStoreForm.controls['storeNameAr'].value;
      store.storeNameEn = this.createStoreForm.controls['storeNameEn'].value;
      store.storePrivilege = 1;

      this._commonCrudService.post('Stores/AddStore', store, this.storeResponseModel).subscribe({
        next: res => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
        },
        error: err => {
          this.snackBar.open(err.message, 'Close', {
            duration: 3000,
          });
        }
      })
    }
  }


  search(){
    console.log(this.searchTerm)
  }

  createForm(): FormGroup{
    return this.createStoreForm;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  disableStoreCode(){
    //!this.manual? false: this.createStoreForm.get('storeCode').disable();
    this.createStoreForm.get("manual").valueChanges.subscribe(checked => {
      checked? this.createStoreForm.get('storeCode').enable(): this.createStoreForm.get('storeCode').disable();
    })
  }

}
