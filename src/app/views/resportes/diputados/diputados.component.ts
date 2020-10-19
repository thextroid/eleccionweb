import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { jqxButtonComponent } from "jqwidgets-ng/jqxbuttons";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { jqxInputComponent } from "jqwidgets-ng/jqxinput";
import { jqxListBoxComponent } from "jqwidgets-ng/jqxlistbox";
import { jqxNotificationComponent } from "jqwidgets-ng/jqxnotification";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MunicipiosService } from "../../servicios/municipios.service";
import { LocalidadesService } from "../../servicios/localidades.service";
import { Recinto } from "../../models/recinto";
import { RecintosService } from "../../servicios/recintos.service";
import { ProvinciasService } from "../../servicios/provincias.service";
import { CircunscripcionesComponent } from "../../circunscripciones/circunscripciones.component";
import { CircunscripcionesService } from "./../servicios/circunscripciones.service";
import { jqxValidatorComponent } from "jqwidgets-ng/jqxvalidator";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { ReportesService } from "./../servicios/reportes.service";
import { pieChartOptions } from "./../templateChartOptions/pieChartOptions";
import { piePresidencial } from "./../templateChartOptions/piePresidencial";
import { pieDataProvincia } from "./../templateChartOptions/pieDataProvincia";
import { pieDataMunicipio } from "./../templateChartOptions/pieDataMunicipio";
import { pieDataRecinto } from "./../templateChartOptions/pieDataRecinto";
import { lineDataWiner } from "./../templateChartOptions/lineDataWiner";

@Component({
  selector: 'app-diputados',
  templateUrl: './diputados.component.html',
  styleUrls: ['./diputados.component.css']
})
export class DiputadosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
