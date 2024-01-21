import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BranchModel } from 'app/Core/Models/Branches/BranchModel';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { DynamicButtons } from 'app/shared/interfaces/dynamic-buttons';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {

  
  constructor(private _commonCrudService: CommonCrudService, private snackBar: MatSnackBar) { }


  paginationResponseModel: PaginationResponseModel<BranchModel[]> = {
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

  paginationList = environment.paginationList;

  ngOnInit(): void {
  }

  actionsButtons: DynamicButtons[] = [
    {
      label: 'Edit',
      clickHandler: (data: any) => this.handleEditClick(data),
      class: 'btn btn-warning me-3'
    },
    {
      label: 'Delete',
      clickHandler: (data: any) => this.handleDeleteClick(data),
      class: 'btn btn-danger me-3'
    },
    // Add more buttons as needed
  ];

  displayedColumns: string[] = ['Code', 'EnglishName', 'ArabicName', 'IsActive'];
  //dataSource: any = new MatTableDataSource<BranchModel>(this.paginationResponseModel.data);
  dataSource: any = new MatTableDataSource([
    {Code: 1, EnglishName: "test", ArabicName: "trt", IsActive: true}
  ])

  async getData(){ 
    await lastValueFrom(this._commonCrudService.getAll("branches", this.paginationParam, this.paginationResponseModel)).then(res => {
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

  handleButtonClick(event: { button: DynamicButtons; data: any }) {
    const { button, data } = event;
    button.clickHandler(data);
  }

  handleEditClick(element: any) {
    // Handle Edit button click for the specific row (element)
    console.log('Edit button clicked for row:', element);
  }

  handleDeleteClick(element: any) {
    // Handle Delete button click for the specific row (element)
    console.log('Delete button clicked for row:', element);
  }


}
