import { Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create/create.component';
export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CreateEmployeeComponent,
        data: { title: 'Create', breadcrumb: 'CREATE' }
      }
    ]
  }
];