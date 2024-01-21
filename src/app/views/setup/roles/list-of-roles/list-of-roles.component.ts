import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { RolesModel } from 'app/Core/Models/Roles/RolesModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { UtilsServiceService } from 'app/Core/Services/utils-service.service';
import { DynamicButtons } from 'app/shared/interfaces/dynamic-buttons';
import { AppLanguageService } from 'app/shared/services/app-language.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-list-of-roles',
  templateUrl: './list-of-roles.component.html',
  styleUrls: ['./list-of-roles.component.scss']
})
export class ListOfRolesComponent implements OnInit {

  roles: RolesModel = new RolesModel();
  displayedColumns: string[] = ['ID', 'ROLE', 'DESCRIPTION']; // Add more columns as needed
  rowsDef: string[] = ['id', 'name', 'descriptionAr'] // Names of columns from Api

  paginationResponseModel: PaginationResponseModel<RolesModel[]> = {
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
  dataSource = new MatTableDataSource<RolesModel>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  actionsButtons: DynamicButtons[] = [
    {
      label: 'Edit',
      clickHandler: (data: any) => this.updateRole(data),
      class: 'btn btn-warning me-3'
    },
    {
      label: 'Delete',
      clickHandler: (data: any) => this.deleteRole(data),
      class: 'btn btn-danger me-3'
    },
    // Add more buttons as needed
  ];
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router,
     ){}

  async ngOnInit(){ 
    await this.getData(); 
  }
  async getData(){ 
    await this._commonCrudService.getAll("Authentication/allroles", this.paginationParam, this.paginationResponseModel).subscribe({
      next: res => {
        this.paginationResponseModel = res;
        //console.log(this.paginationResponseModel)
        this.dataSource.data = res
      },
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })

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

  handleButtonClick(event: { button: DynamicButtons; data: any }) {
    const { button, data } = event;
    button.clickHandler(data);
  }

}
