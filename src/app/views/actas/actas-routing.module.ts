import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActasComponent } from './actas.component';

const routes: Routes = [
  {
    path: "",
    component: ActasComponent,
    data: {
      title: "Acta",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActasRoutingModule { }
