
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BranchModel } from 'app/Core/Models/Branches/BranchModel';
import { PaginationParam } from 'app/Core/Models/ResponseModels/PaginationParam';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { DynamicButtons } from 'app/shared/interfaces/dynamic-buttons';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AppLanguageService } from 'app/shared/services/app-language.service';
import { getLocaleId } from '@angular/common';
import { LayoutService } from 'app/shared/services/layout.service';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent implements OnInit, OnChanges {

  currentDir: string = 'ltr';
  constructor(private _appLanguageService: AppLanguageService, private _layoutService: LayoutService,){}

  ngOnChanges(): void {
    this.hasControls = this.dynamicButtons.length > 0;  
    
  }

  @Input() dataSource: any;
  @Input() displayedColumns: string[];
  @Input() rowsDef: string[];
  @Input() hasControls: boolean;
  @Input() dynamicButtons: DynamicButtons[] = [];
  @Output() buttonClick = new EventEmitter<{ button: DynamicButtons; data: any }>();

  ngOnInit(): void {
    //console.log(this.getAppLanguage())
    this._layoutService.currentLang.subscribe({
      next: value => this.currentDir = value
    })
  }

  onButtonClick(button: DynamicButtons, data: any) {
    this.buttonClick.emit({ button, data });
  }

  getAppLanguage(): string{
    return this._appLanguageService.getLang();
  }

}
