import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItemCategoryModel } from 'app/Core/Models/Inventory/ItemCategory/ItemCategoryModel';
import { ItemTypeModel } from 'app/Core/Models/Inventory/ItemType/ItemTypeModel';
import { NewsModel } from 'app/Core/Models/News/NewsModel';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationParamWithSearch } from 'app/Core/Models/ResponseModels/PaginationParamWithSearch';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { Console } from 'console';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-item-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  displayedColumns: string[] = ['Name', 'Controls']; // Add more columns as needed
  searchTerm: string = '';
  paginationResponseModel: PaginationResponseModel<ItemCategoryModel[]> = {
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
  paginationParamWithSearch : PaginationParamWithSearch = { 
    PageNumber : 1, 
    PageSize : environment.paginationList[0], 
    Term:'',
  }
  dataSource = new MatTableDataSource<ItemCategoryModel>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  constructor(private _commonCrudService : CommonCrudService,
     private snackBar: MatSnackBar, 
     private router: Router){ 
    
  }

  async ngOnInit(){ 
    await this.getData(); 
  }
  async getData(){ 
    console.log(this.paginationParamWithSearch)
    await lastValueFrom(this._commonCrudService.getAllWithSearch("ItemCategories/GetItemCategories", this.paginationParamWithSearch, this.paginationResponseModel)).then(res => {
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
  async updateItemCategory(id){ 
    this.router.navigate(['inventory/itemCategories/update/' + id]);
  }
  async deleteItemCategory(id){ 
    this.router.navigate(['inventory/itemCategories/delete/' + id]);
  }
  async addItemCategory(){ 
    this.router.navigate(['inventory/itemCategories/create']);
  }
  async onPageChanged(event: any) {
    console.log(event);
    this.paginationParamWithSearch.PageNumber = event.pageIndex + 1;
    this.paginationParamWithSearch.PageSize = event.pageSize;

    await this.getData();
  }
  search() {
    this.paginationParamWithSearch.PageNumber = 1;

    this.getData();
  }
}
