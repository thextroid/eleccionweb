import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CargarvotosComponent } from "./cargarvotos.component";

const routes: Routes = [
  {
    path: "",
    component: CargarvotosComponent,
    data: {
      title: "Cargar votacion",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarvotosRoutingModule {}
