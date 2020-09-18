import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesasComponent } from './mesas.component';


const routes: Routes = [
  {
    path:'',
    component:MesasComponent,
    data:{
      title:'Mesas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesasRoutingModule { }
