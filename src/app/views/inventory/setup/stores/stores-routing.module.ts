import { StoresTabComponent } from './stores-tab/stores-tab.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    children: [
      {
        path: 'addStore',
        component: StoresTabComponent,
        data: { title: 'Create', breadcrumb: 'CREATE' }
      }
    ]
  }*/
    
    {path: '', redirectTo: 'addStore', pathMatch: 'full'},
    {path: 'addStore', component: StoresTabComponent, title: 'Add a new store'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
