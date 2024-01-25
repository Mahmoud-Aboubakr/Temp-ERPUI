import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { unitsTemplateModel } from 'app/Core/Models/UnitsTemplate/unitsTemplateModel';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { Console } from 'console';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-unitsTemplate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  displayedColumns: string[] = ['unitTemplateCode', 'unitTemplateNameEN', 'unitTemplateNameAr','unitId', 'Controls']; // Add more columns as needed
  paginationResponseModel: PaginationResponseModel<unitsTemplateModel[]> = {
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
  dataSource = new MatTableDataSource<unitsTemplateModel>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router){ 
    
  }

  async ngOnInit(){ 
    await this.getData(); 
  }
  async getData(){ 
    await lastValueFrom(this._commonCrudService.getAll("UnitTemplates/GetUnitTemplates", this.paginationParam, this.paginationResponseModel)).then(res => {
      this.paginationResponseModel = res;
      console.log(res.data)
      if(res.statusCode == 200){
        this.dataSource.data = this.paginationResponseModel.data;
        console.log(this.dataSource.data)
      } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
      }
    }); 

  }
  async update(id){ 
    this.router.navigate(['setup/unitsTemplate/update/' + id]);
  }
  async delete(id){ 
    this.router.navigate(['setup/unitsTemplate/delete/' + id]);
  }
  async addNew(){ 
    this.router.navigate(['setup/unitsTemplate/create']);
  }
  async onPageChanged(event: any) {
    console.log(event);
    this.paginationParam.PageNumber = event.pageIndex + 1;
    this.paginationParam.PageSize = event.pageSize;

    await this.getData();
  }
}
