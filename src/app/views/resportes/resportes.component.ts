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
import { pieChartOptions } from "./templateChartOptions/pieChartOptions";
import { piePresidencial } from "./templateChartOptions/piePresidencial";
import { pieDataProvincia } from "./templateChartOptions/pieDataProvincia";
import { pieDataMunicipio } from "./templateChartOptions/pieDataMunicipio";
import { pieDataRecinto } from "./templateChartOptions/pieDataRecinto";
import { lineDataWiner } from "./templateChartOptions/lineDataWiner";

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
  // public pieChartData = [];
  // public pieChartType = "pie";
  // public donutColors = [
  //   {
  //     backgroundColor: [
  //       "#C3DFE0",
  //       "#904E55AA",
  //       "#1C5D99AA",
  //       "rgba(129, 78, 40, 1)",
  //       "#C42021AA",
  //       "#06A77DAA",
  //       "#FE5F55AA",
  //     ],
  //   },
  // ];
  public dataJson: any;
  public piedata: any[];
  public bardata: any[];
  public pieProvinciaData: any[];
  public pieMunicipioData: any[];
  public pieRecintoData: any[];
  public methodChartPresidencia = piePresidencial.presidencialData.bind(this);
  public headerChart: {
    porcentajeActaMesa: Number;
    election: String;
  };
  public linedata: any = {
    mesas: null,
    partidos: [],
  };
  @ViewChild("dropProv", { static: false }) dropProv: jqxDropDownListComponent;
  @ViewChild("dropMun", { static: false }) dropMun: jqxDropDownListComponent;
  @ViewChild("dropCir", { static: false }) dropCir: jqxDropDownListComponent;
  @ViewChild("dropRec", { static: false }) dropRec: jqxDropDownListComponent;
  @ViewChild("dropEleccion", { static: false }) dropEleccion: jqxDropDownListComponent;
  constructor(
    protected $prov: ProvinciasService,
    protected $mun: MunicipiosService,
    protected $cir: CircunscripcionesService,
    protected $rec: RecintosService,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.$prov.all().subscribe((response) => {
    //   let list = [];
    //   for (let i = 0; i < response.length; i++) {
    //     list.push({
    //       value: response[i],
    //       label: response[i].name,
    //     });
    //   }
    //   this.dropProv.source(list);
    // });
    // this.$mun.all().subscribe((response) => {
    //   let list = [];
    //   for (let i = 0; i < response.length; i++) {
    //     list.push({
    //       value: response[i],
    //       label: response[i].name,
    //     });
    //   }
    //   this.dropMun.source(list);
    // });
    // this.$rec.all().subscribe((response) => {
    //   let list = [];
    //   for (let i = 0; i < response.length; i++) {
    //     list.push({
    //       value: response[i],
    //       label: response[i].institucion + "/" + response[i].localidad,
    //     });
    //   }
    //   this.dropRec.source(list);
    // });
    this.loadDataPresidencialGeneral();
    this.loadDataLineChart();
    this.loadDataPresidencialProvincia();
    this.loadDataPresidencialMunicipio();
    this.loadDataPresidencialRecinto();
  }
  change(event) {
    // this.loadDataTest();
  }
  loadDataPresidencialGeneral() {
    this.reportesService
      .getRecintos("5f7d05a1449b8cdbde0d92bd")
      .subscribe(this.loadDataPies(piePresidencial));
  }

  loadDataPies = (functionPies) => {
    return functionPies.presidencialData.call(
      this,
      functionPies.setDataPie.bind(this),
      functionPies.pieLabel.bind(this),
      "Presidencial",
      this.roundEpsion
    );
  };

  loadDataLineChart() {
    this.reportesService
      .getWiner("5f7d05a1449b8cdbde0d92bd")
      .subscribe(
        lineDataWiner.presidencialData.call(
          this,
          lineDataWiner.setDataLine.bind(this),
          lineDataWiner.lineLabel.bind(this),
          "Presidencial",
          this.roundEpsion
        )
      );
  }

  loadDataPresidencialProvincia() {
    // console.log(this.dropRec.getSelectedItem().value._id);
    this.reportesService
      .getPresidenteProvincia("5f5ac09ffa74ada37adf107b")
      .subscribe(this.loadDataPies(pieDataProvincia));
  }
  loadDataPresidencialMunicipio() {
    this.reportesService
      .getPresidenteMunicipio("5f5ac0e1f770bc79cb72c0b3")
      .subscribe(this.loadDataPies(pieDataMunicipio));
  }
  loadDataPresidencialRecinto() {
    this.reportesService
      .getPresidenteRecinto("5f7d05a1449b8cdbde0d92bd")
      .subscribe(this.loadDataPies(pieDataRecinto));
  }
  roundEpsion(number: any) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }

}
