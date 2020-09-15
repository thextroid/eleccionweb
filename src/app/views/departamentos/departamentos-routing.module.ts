import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentosComponent } from './departamentos.component';


const routes: Routes = [
  {
    path:'',
    component:DepartamentosComponent,
    data:{
      title:'Departamentos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
