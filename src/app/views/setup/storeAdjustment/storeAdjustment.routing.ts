import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { deleteComponent } from './delete/delete-component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

export const storeAdjustmentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent,
        data: { title: 'storeAdjustments', breadcrumb: 'LIST' }
      }, 
      {
        path: 'create',
        component: CreateComponent,
        data: { title: 'Create', breadcrumb: 'CRATE' }
      },  
      {
        path: 'update/:id',
        component: UpdateComponent,
        data: { title: 'Update', breadcrumb: 'UPDATE' }
      },
      {
        path: 'delete/:id',
        component: deleteComponent,
        data: { title: 'Delete', breadcrumb: 'DELETE' }
      }, 

    ]
  }
];