import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfRolesComponent } from './list-of-roles/list-of-roles.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListOfRolesComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
