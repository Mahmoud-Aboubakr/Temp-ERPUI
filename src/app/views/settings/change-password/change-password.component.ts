import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/** @title Select with form field features */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  selectFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.required);
  hide: boolean = true; 
}

