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
import { CircunscripcionesComponent } from "../circunscripciones/circunscripciones.component";
import { CircunscripcionesService } from "../../servicios/circunscripciones.service";
import { jqxValidatorComponent } from "jqwidgets-ng/jqxvalidator";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { ReportesService } from "../../servicios/reportes.service";
@Component({
  selector: "app-resportes",
  templateUrl: "./resportes.component.html",
  styleUrls: ["./resportes.component.css"],
})
export class ResportesComponent implements OnInit {
  public pieChartLabels = [
    "CREEMOS",
    "ADN",
    "MASIPSP",
    "FPV",
    "PANBOL",
    "LIBRE21",
    "CC",
  ];
  public pieChartData = [];
  public pieChartType = "pie";
  public donutColors = [
    {
      backgroundColor: [
        "#C3DFE0",
        "#904E55AA",
        "#1C5D99AA",
        "rgba(129, 78, 40, 1)",
        "#C42021AA",
        "#06A77DAA",
        "#FE5F55AA",
      ],
    },
  ];
  public dataJson:any;
  @ViewChild("dropProv", { static: false }) dropProv: jqxDropDownListComponent;
  @ViewChild("dropMun", { static: false }) dropMun: jqxDropDownListComponent;
  @ViewChild("dropCir", { static: false }) dropCir: jqxDropDownListComponent;
  @ViewChild("dropRec", { static: false }) dropRec: jqxDropDownListComponent;
  constructor(
    protected $prov: ProvinciasService,
    protected $mun: MunicipiosService,
    protected $cir: CircunscripcionesService,
    protected $rec: RecintosService,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    // this.loadDataTest();
  }
  ngAfterViewInit(): void {
    this.$prov.all().subscribe((response) => {
      let list = [];
      for (let i = 0; i < response.length; i++) {
        list.push({
          value: response[i],
          label: response[i].name,
        });
      }
      this.dropProv.source(list);
    });
    this.$mun.all().subscribe((response) => {
      let list = [];
      for (let i = 0; i < response.length; i++) {
        list.push({
          value: response[i],
          label: response[i].name,
        });
      }
      this.dropMun.source(list);
    });
    this.$rec.all().subscribe((response) => {
      let list = [];
      for (let i = 0; i < response.length; i++) {
        list.push({
          value: response[i],
          label: response[i].institucion+"/"+response[i].localidad,
        });
      }
      this.dropRec.source(list);
    });
  }
  change(event) {
    this.loadDataTest();
  }

  loadDataTest() {
    console.log(this.dropRec.getSelectedItem().value._id);
    this.reportesService
      .getRecintos(this.dropRec.getSelectedItem().value._id)
      .subscribe((data) => {
        this.dataJson = data;
        this.pieChartData = this.pieChartLabels.map((label) => {
          return Math.round((data[0][label] + Number.EPSILON) * 100) / 100;
        });
      });
  }
}
