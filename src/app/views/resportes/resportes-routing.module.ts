import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResportesComponent } from './resportes.component';


const routes: Routes = [
  {
    path:'',
    component:ResportesComponent,
    data:{
      title:'Reportes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResportesRoutingModule { }
