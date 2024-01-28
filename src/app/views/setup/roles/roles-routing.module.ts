import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfRolesComponent } from './list-of-roles/list-of-roles.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { RolesPrivilegesComponent } from './roles-privileges/roles-privileges.component';
import { TestPrivComponent } from './test-priv/test-priv.component';

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
      },
      {
        path: 'manage/:id',
        component: RolesPrivilegesComponent,
        data: { title: 'Manage', breadcrumb: 'MANAGE'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
