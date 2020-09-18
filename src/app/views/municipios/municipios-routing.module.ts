import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MunicipiosComponent } from './municipios.component';
import { MunicipiosModule } from './municipios.module';


const routes: Routes = [{
  path:'',
  component:MunicipiosComponent,
  data:{
    title:'Municipios'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipiosRoutingModule { }
