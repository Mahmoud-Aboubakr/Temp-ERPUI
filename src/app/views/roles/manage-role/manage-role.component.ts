import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent {

  selectFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.required);
  hide: boolean = true; 

}
