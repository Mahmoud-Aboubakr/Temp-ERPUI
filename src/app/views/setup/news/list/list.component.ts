import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateNew } from 'app/Core/Models/News/CreateNew';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { Console } from 'console';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  displayedColumns: string[] = ['ActiveFromDate', 'ActiveToDate', 'NewsTextAr', 'NewsTextEn', 'Controls']; // Add more columns as needed
  paginationResponseModel: PaginationResponseModel<CreateNew[]> = {
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
  dataSource = new MatTableDataSource<CreateNew>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router){ 
    
  }

  async ngOnInit(){ 
    await this.getData(); 
  }
  async getData(){ 
    await lastValueFrom(this._commonCrudService.getAll("News/GetNews", this.paginationParam, this.paginationResponseModel)).then(res => {
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
  async updateNews(id){ 
    this.router.navigate(['setup/news/update/' + id]);
  }
  async deleteNews(id){ 
    this.router.navigate(['setup/news/delete/' + id]);
  }
  async addNew(){ 
    this.router.navigate(['setup/news/create']);
  }
  async onPageChanged(event: any) {
    console.log(event);
    this.paginationParam.PageNumber = event.pageIndex + 1;
    this.paginationParam.PageSize = event.pageSize;

    await this.getData();
  }
}
