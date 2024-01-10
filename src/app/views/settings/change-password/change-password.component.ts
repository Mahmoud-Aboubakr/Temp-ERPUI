import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/** @title Select with form field features */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  selectUserFormControl = new FormControl('', Validators.required);
  selectReasonFormControl = new FormControl('', Validators.required);
  oldPasswordFormControl = new FormControl('', Validators.required);
  confirmPasswordFormControl = new FormControl('', Validators.required);
  newPasswordFormControl = new FormControl('', Validators.required);
  hide: boolean = true; 

}

