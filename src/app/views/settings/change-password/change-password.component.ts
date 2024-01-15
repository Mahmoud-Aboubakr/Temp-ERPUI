import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/** @title Select with form field features */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup = new FormGroup({
    selectUser: new FormControl('', Validators.required),
    selectReason: new FormControl('', Validators.required),
    oldPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required)
  })

  
  hide: boolean = true; 

}

