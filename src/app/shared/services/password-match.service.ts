import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordMatchService {

  password: string;
  confirmPassword: string
  passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    this.password = password
    this.confirmPassword = confirmPassword
    
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(this.password);
      const confirmPassword = control.get(this.confirmPassword);
  
      if (password.value == confirmPassword.value) {
        return null; // Do nothing
      }
  
      confirmPassword.setErrors({passwordMismatch: "Mismatch"})
      return password.value === confirmPassword.value ? null : {passwordMismatch: "Mismatch"}
    };
  }
}
