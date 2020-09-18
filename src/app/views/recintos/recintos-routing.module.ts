import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecintosComponent } from './recintos.component';


const routes: Routes = [{
  path:'',
  component:RecintosComponent,
  data:{
    title:'Recintos'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecintosRoutingModule { }
