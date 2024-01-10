import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { Roles } from 'app/Core/Models/roles';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { AppLanguageService } from 'app/shared/services/app-language.service';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-list-of-roles',
  templateUrl: './list-of-roles.component.html',
  styleUrls: ['./list-of-roles.component.scss']
})
export class ListOfRolesComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Role', 'Description', 'Controls']; // Add more columns as needed
  paginationResponseModel: PaginationResponseModel<Roles[]> = {
    currentPage:0,
    errorMessage: '',
    lang:'',
    message:'',
    pageSize:0,
    statusCode:0,
    totalCount:0,
    totalPages: 0,
    data: undefined
  }
  paginationParam : PaginationParam = { 
    PageNumber : 1, 
    PageSize : environment.paginationList[0]
  }
  dataSource = new MatTableDataSource<Roles>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router,
     private _appLanguageService: AppLanguageService){ 
    
  }

  async ngOnInit(){ 
    await this.getData(); 
  }
  async getData(){ 
    await lastValueFrom(this._commonCrudService.getAll("roles/GetRoles", this.paginationParam, this.paginationResponseModel)).then(res => {
      this.paginationResponseModel = res;
      if(res.statusCode == 200){
        this.dataSource.data = this.paginationResponseModel.data;
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
      }
    }); 

  }
  async updateRole(id){ 
    this.router.navigate(['setup/roles/update/' + id]);
  }
  async deleteRole(id){ 
    this.router.navigate(['setup/roles/delete/' + id]);
  }
  async addRole(){ 
    this.router.navigate(['setup/roles/create']);
  }
  async onPageChanged(event: any) {
    console.log(event);
    this.paginationParam.PageNumber = event.pageIndex + 1;
    this.paginationParam.PageSize = event.pageSize;

    await this.getData();
  }

  getAppLanguage(){
    this._appLanguageService.getLang();
  }

}
