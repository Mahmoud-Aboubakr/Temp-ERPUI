import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'app/shared/services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.scss']
})
export class MainStoreComponent implements OnInit, OnDestroy {

  constructor(private _formBuilder: FormBuilder, private _layoutService: LayoutService) { }

  ngOnInit(): void {
    this.createForm()
    this.patchStores()
    this.createStoreForm.get('code').disable();
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
  privileges: string[] = ['LPO', 'EPO', 'GRN', 'IToD']

  createStoreForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
    name_ar: new FormControl('', [Validators.required]),
    name_en: new FormControl('', [Validators.required]),
    department: new FormControl(''),
    storeAdmin: new FormControl('', [Validators.required]),
    privileges: this._formBuilder.array(this.privileges.map(x => false)),
    branchName: new FormControl('', [Validators.required]),
    generalStore: new FormControl(''),
    costOfGoods: new FormControl(''),
    salesRevenue: new FormControl(''),
    settlementByDiscount: new FormControl(''),
    settlementAsWell: new FormControl(''),
    outgoingMovements: new FormControl('ar'),
    approvalAuthority: new FormControl(false),
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

  addStore(e: FormGroup){
    console.log(e);
    const privilegeCheckboxControl = (e.controls.privileges as FormArray);

    const privilegeFormValue = {
      ...e.value,
      checkboxes: privilegeCheckboxControl.value.filter(value => !!value)
    }
    this.privilegeSubmittedValue = privilegeFormValue;
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

}
