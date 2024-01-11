import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { ApplicationPagePrefixModel } from 'app/Core/Models/applicationPagePrefix/applicationPagePrefixModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-applicationPagePrefix-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  displayedColumns: string[] = ['PageName', 'Prefix', 'Length', 'Controls']; // Add more columns as needed
  paginationResponseModel: PaginationResponseModel<ApplicationPagePrefixModel[]> = {
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
  dataSource = new MatTableDataSource<ApplicationPagePrefixModel>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router){ 
    
  }

  async ngOnInit(){ 
    await this.getData(); 
  }
  async getData(){ 
    debugger;
    await lastValueFrom(this._commonCrudService.getAll("ApplicationPagePrefix/GetApplicationPagePrefixs", this.paginationParam, this.paginationResponseModel)).then(res => {
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
  async updateApplicationPagePrefix(id){ 
    this.router.navigate(['setup/applicationPagePrefix/update/' + id]);
  }
  async deleteApplicationPagePrefix(id){ 
    this.router.navigate(['setup/applicationPagePrefix/delete/' + id]);
  }
  async addApplicationPagePrefix(){ 
    this.router.navigate(['setup/applicationPagePrefix/create']);
  }
  async onPageChanged(event: any) {
    console.log(event);
    this.paginationParam.PageNumber = event.pageIndex + 1;
    this.paginationParam.PageSize = event.pageSize;

    await this.getData();
  }
}
