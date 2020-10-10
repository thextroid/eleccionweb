import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResportesRoutingModule } from "./resportes-routing.module";
import { ResportesComponent } from "./resportes.component";
import { jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { jqxButtonModule } from "jqwidgets-ng/jqxbuttons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { jqxListBoxModule } from "jqwidgets-ng/jqxlistbox";
import { jqxDropDownListModule } from "jqwidgets-ng/jqxdropdownlist";
import { jqxNotificationModule } from "jqwidgets-ng/jqxnotification";
import { jqxSwitchButtonModule } from "jqwidgets-ng/jqxswitchbutton";
import { jqxValidatorModule } from "jqwidgets-ng/jqxvalidator";
import { MunicipiosService } from "../../servicios/municipios.service";
import { LocalidadesService } from "../../servicios/localidades.service";
import { ProvinciasService } from "../../servicios/provincias.service";
import { RecintosService } from "../../servicios/recintos.service";
import { CircunscripcionesService } from "../../servicios/circunscripciones.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";
import { HighchartsChartModule } from "highcharts-angular";
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [ResportesComponent, PieChartComponent, LineChartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ResportesRoutingModule,
    jqxGridModule,
    jqxButtonModule,
    ReactiveFormsModule,
    FormsModule,
    jqxListBoxModule,
    jqxDropDownListModule,
    jqxNotificationModule,
    jqxSwitchButtonModule,
    jqxValidatorModule,
    ChartsModule,
    HighchartsChartModule,
  ],
  providers: [
    MunicipiosService,
    LocalidadesService,
    ProvinciasService,
    RecintosService,
    CircunscripcionesService,
  ],
})
export class ResportesModule {}
