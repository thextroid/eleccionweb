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
  //     backgroundColor: [angular material
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

  public provinciasDataDropDown: any[];
  public tableNameProvincia = {
    tableName: "provincias",
    displayMember: "name",
    datafields: [
      { name: "_id", type: "string" },
      { name: "name", type: "string" },
    ],
  };
  public municipiosDataDropDown: any[];
  public tableNameMunicipio = {
    tableName: "municipios",
    displayMember: "name",
    datafields: [
      { name: "_id", type: "string" },
      { name: "name", type: "string" },
    ],
  };
  public recintosDataDropDown: any[];
  public tableNameRecinto = {
    tableName: "recintos",
    displayMember: "institucion",
    datafields: [
      { name: "_id", type: "string" },
      { name: "institucion", type: "string" },
    ],
  };

  public methodChartPresidencia = piePresidencial.presidencialData.bind(this);
  public headerChart: {
    porcentajeActaMesa: Number;
    election: String;
  };
  public linedata: any = {
    mesas: null,
    partidos: [],
  };

  constructor(
    protected circunscripcionService: CircunscripcionesService,
    protected provinciaService: ProvinciasService,
    protected municipioService: MunicipiosService,
    protected recintoService: RecintosService,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    this.loadDataProvincias();
    this.loadDataMunicipios();
    this.loadDataRecintos();
  }

  ngAfterViewInit(): void {
    // this.loadDataPresidencialGeneral();
    // this.loadDataLineChart("5f5ac09ffa74ada37adf107b");
    // this.loadDataPresidencialProvincia("5f5ac09ffa74ada37adf107b");
    // this.loadDataPresidencialMunicipio("5f5ac0e1f770bc79cb72c0b3");
    // this.loadDataPresidencialRecinto("5f7d05a1449b8cdbde0d92bd");
  }

  loadDataProvincias() {
    this.provinciaService.all().subscribe((response) => {
      this.provinciasDataDropDown = response;
    });
  }

  loadDataMunicipios() {
    this.municipioService.all().subscribe((response) => {
      this.municipiosDataDropDown = response;
    });
  }

  loadDataRecintos() {
    this.recintoService.all().subscribe((response) => {
      this.recintosDataDropDown = response;
    });
  }

  change(event) {
    // this.loadDataTest();
  }
  loadDataPresidencialGeneral() {
    this.reportesService
      .getRecintos("5f7d05a1449b8cdbde0d92bd")
      .subscribe(this.loadDataPies(piePresidencial));
  }

  loadDataPies = (functionPies, title = "Presidencial") => {
    return functionPies.presidencialData.call(
      this,
      functionPies.setDataPie.bind(this),
      functionPies.pieLabel.bind(this),
      title,
      this.roundEpsion
    );
  };

  loadDataLineChart(uid) {
    this.reportesService
      .getWiner(uid)
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

  loadDataPresidencialProvincia(provinciaId: string) {
    console.log(provinciaId);
    this.reportesService
      .getPresidenteProvincia(provinciaId)
      .subscribe(this.loadDataPies(pieDataProvincia, "Provincias"));
  }
  loadDataPresidencialMunicipio(municipioId: string) {
    this.reportesService
      .getPresidenteMunicipio(municipioId)
      .subscribe(this.loadDataPies(pieDataMunicipio, "Municipio"));
  }
  loadDataPresidencialRecinto(recintoId) {
    this.reportesService
      .getPresidenteRecinto(recintoId)
      .subscribe(this.loadDataPies(pieDataRecinto, "Recinto"));
  }

  selectedProvinciaItem( event ) {
    // console.log(event);
    const {
      item: { originalItem: provincia },
    } = event.args;
    console.log(provincia);
    this.loadDataPresidencialProvincia(provincia.uid);
  }

  selectedMunicipioItem(event) {
    const {
      item: { originalItem: municipio },
    } = event.args;
    this.loadDataPresidencialMunicipio(municipio.uid);
  }

  selectedRecintoItem(event) {
    const {
      item: { originalItem: recinto },
    } = event.args;
    console.log(recinto);
    this.loadDataPresidencialRecinto(recinto.uid);
    this.loadDataLineChart(recinto.uid);
  };
  roundEpsion(number: any) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
}
