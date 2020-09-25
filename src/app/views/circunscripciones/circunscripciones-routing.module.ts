import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CircunscripcionesComponent } from './circunscripciones.component';


const routes: Routes = [{
  path:'',
  component:CircunscripcionesComponent,
  data:{
    title:'Circunscripciones'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircunscripcionesRoutingModule { }
