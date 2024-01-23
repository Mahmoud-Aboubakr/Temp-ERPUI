import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePassword } from 'app/Core/Models/ChangePassword/change-password';
import { ChangePasswordReasons } from 'app/Core/Models/ChangePasswordReasons/change-password-reasons';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { UsersModel } from 'app/Core/Models/Users/users-model';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { LayoutService } from 'app/shared/services/layout.service';
import { PasswordMatchService } from 'app/shared/services/password-match.service';

/** @title Select with form field features */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{

  constructor(private _passwordMatchService: PasswordMatchService, 
    private _commonCrudService: CommonCrudService,
    private snackBar: MatSnackBar,
    private _layoutService: LayoutService){}

  ngOnInit(): void {
    this.getCurrentLang()
    this.getChangeReasons()
    this.getUsers()
  }

  errMsg: string = '';
  hide: boolean = true; 
  currentDir: string = 'ltr'
  reasons: ChangePasswordReasons[];
  users: UsersModel[];
  reasonsResponseModel: ResponseModel<ChangePasswordReasons[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  usersResponseModel: ResponseModel<UsersModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  changePasswordResponseModel: ResponseModel<ChangePassword[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  getCurrentLang(){
    this._layoutService.currentLang.subscribe({
      next: value => this.currentDir = value
    })
  }

  getUsers(){
    this._commonCrudService.get('Authentication/users', this.usersResponseModel).subscribe({
      next: res => this.users = res,
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  getChangeReasons(){
    this._commonCrudService.get('Authentication/GetAllChangePaswordReasons', this.reasonsResponseModel).subscribe({
      next: res => this.reasons = res,
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  changePasswordForm: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    reasonId: new FormControl('', Validators.required),
    currentPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$')]),
  },{
    validators: this._passwordMatchService.passwordMatchValidator('newPassword', 'confirmNewPassword') // Names of the form controls
  })
  

  saveForm(form: FormGroup){
    if(form.valid){
      
      this._commonCrudService.post("Authentication/changepassword", form.value, this.changePasswordResponseModel).subscribe({
        next: res => console.log(res),
        error: err => {
          console.log(err)
          /*this.snackBar.open(err.error.errors.NewPassword[0], 'Close', {
            duration: 3000,
          });*/
          this.errMsg = err.error.errors.NewPassword[0]
        }
      })
    }
  }
}

