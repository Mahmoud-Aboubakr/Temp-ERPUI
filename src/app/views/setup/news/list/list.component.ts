import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateNew } from 'app/Core/Models/News/CreateNew';
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
  dataModel : CreateNew[] = [];
  dataSource = new MatTableDataSource<CreateNew>(this.dataModel);
  responseModel: ResponseModel<CreateNew[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginationList = environment.paginationList;
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router){ 
    
  }

  ngOnInit(){ 
    this.getData(); 
  }
  async getData(){ 
    await lastValueFrom(this._commonCrudService.get("News/GetNews", this.responseModel)).then(res => {
      this.responseModel = res;
      if(res.statusCode == 200){
        this.dataModel = res.data;
        // Update the data source
        this.dataSource.data = this.dataModel;
        // Connect the paginator to the data source
        this.dataSource.paginator = this.paginator;
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
}
