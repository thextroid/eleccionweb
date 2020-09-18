import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalidadesComponent } from './localidades.component';


const routes: Routes = [{
  path:'',
  component:LocalidadesComponent,
  data:{
    title:'Localidades'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalidadesRoutingModule { }
