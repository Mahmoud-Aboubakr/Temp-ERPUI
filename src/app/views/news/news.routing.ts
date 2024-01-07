import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

export const NewsRoutes: Routes = [
  {
    path: '',
    children: [
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
        path: 'Delete/:id',
        component: DeleteComponent,
        data: { title: 'Delete', breadcrumb: 'DELETE' }
      }
    ]
  }
];