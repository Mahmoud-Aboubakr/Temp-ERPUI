import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationParamWithSearch } from 'app/Core/Models/ResponseModels/PaginationParamWithSearch';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { SupplierTypeModel } from 'app/Core/Models/Suppliers/SupplierType/supplier-type-model';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DynamicButtons } from 'app/shared/interfaces/dynamic-buttons';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  supplierTypes: SupplierTypeModel = new SupplierTypeModel();
  displayedColumns: string[] = ['NAME']; // Add more columns as needed
  rowsDef: string[] = ['supplierName'] // Names of columns from Api

  paginationResponseModel: PaginationResponseModel<SupplierTypeModel[]> = {
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
  paginationParamWithSearch : PaginationParamWithSearch = { 
    PageNumber : 1, 
    PageSize : environment.paginationList[0], 
    Term:'',
  }
  dataSource = new MatTableDataSource<SupplierTypeModel>(this.paginationResponseModel.data);
  paginationList = environment.paginationList;
  actionsButtons: DynamicButtons[] = [
    {
      label: 'EDIT',
      clickHandler: (data: any) => this.updateType(data.id),
      class: 'btn btn-warning me-3'
    },
    {
      label: 'DELETE',
      clickHandler: (data: any) => this.deleteType(data.id),
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
    await this._commonCrudService.getAllWithSearch("SupplierTypes/GetSupplier", this.paginationParamWithSearch, this.paginationResponseModel).subscribe({
      next: res => {
        this.paginationResponseModel = res;
        this.dataSource.data = res.data
      },
      error: err => {
        this.snackBar.open(err.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }
  async updateType(id){ 
    this.router.navigate(['suppliers/setup/supplierTypes/update/' + id]);
  }
  async deleteType(id){ 
    this.router.navigate(['suppliers/setup/supplierTypes/delete/' + id]);
  }
  async addType(){ 
    this.router.navigate(['suppliers/setup/supplierTypes/create/']);
  }

  async onPageChanged(event: any) {
    this.paginationParam.PageNumber = event.pageIndex + 1;
    this.paginationParam.PageSize = event.pageSize;

    await this.getData();
  }

  handleButtonClick(event: { button: DynamicButtons; data: any }) {
    const { button, data } = event;
    button.clickHandler(data);
  }

  search() {
    this.paginationParamWithSearch.PageNumber = 1;
    this.getData();
  }

}
