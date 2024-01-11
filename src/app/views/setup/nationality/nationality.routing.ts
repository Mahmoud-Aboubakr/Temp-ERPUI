import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { deleteComponent } from './delete/delete-component';
import { NationalitesComponent } from './nationalites-component';
export const NationalityRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateComponent,
        data: { title: 'Create', breadcrumb: 'CRATE' }
      },  
      {
        path: 'delete/:id',
        component: deleteComponent,
        data: { title: 'Delete', breadcrumb: 'DELETE' }
      }, 
      {
        path: '',
        component: NationalitesComponent,
        data: { title: 'nationalites', breadcrumb: 'LIST' }
      }, 
    ]
  }
];