import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinciasComponent } from './provincias.component';


const routes: Routes = [
  {
    path:'',
    component:ProvinciasComponent,
    data:{
      title:'Provincias'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinciasRoutingModule { }
