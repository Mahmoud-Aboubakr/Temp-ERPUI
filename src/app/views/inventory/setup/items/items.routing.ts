import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';

export const ItemsRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent,
        data: { title: 'List', breadcrumb: 'LIST' }
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
        component: DeleteComponent,
        data: { title: 'Delete', breadcrumb: 'DELETE' }
      }
    ]
  }
];