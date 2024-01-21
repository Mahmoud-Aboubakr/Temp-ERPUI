import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestTableComponent } from './test-table/test-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'testTable',
        component: TestTableComponent,
        data: { title: 'Test', breadcrumb: 'TEST' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
