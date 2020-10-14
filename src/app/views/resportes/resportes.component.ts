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
  @ViewChild("dropEleccion", { static: false }) dropEleccion: jqxDropDownListComponent;
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
    this.$cir.all().subscribe((response) => {
      let list = [];
      for (let i = 0; i < response.length; i++) {
        list.push({
          value: response[i],
          label: response[i].name,
        });
      }
      this.dropCir.source(list);
    });
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
    this.dropEleccion.source(['presidente','diputado','diputadoEspecial']);
  }
  change(event) {
    // this.loadDataTest();
  }
  load(){}
  loadByMun(){
    let cir =this.dropCir.getSelectedItem();
    let pro =this.dropProv.getSelectedItem();
    let mun =this.dropMun.getSelectedItem();
    let rec =this.dropRec.getSelectedItem();
    let tipo=this.dropEleccion.getSelectedItem().value;
    if(cir)cir = cir.value._id;
    if(pro)pro = pro.value._id;
    if(mun)mun = mun.value._id;
    if(rec)rec = rec.value._id;
    console.log(cir,pro,mun,rec,tipo);
    // console.log(this.dropRec.getSelectedItem().value._id);
    if(mun)
    this.reportesService
      .getMunicipios(mun,tipo)
      .subscribe(this.getValuesQuery.bind(this));
  }

  getValuesQuery(data){
    console.log(!data.length);
      if(!data || !data.length) return "No exisite actas validas";
      this.dataJson = data;
      this.pieChartData = this.pieChartLabels.map((label) => {
        return Math.round((data[0][label] + Number.EPSILON) * 100) / 100;
      });
  }

  loadByProv(){
    let prov =this.dropProv.getSelectedItem();
    let tipo=this.dropEleccion.getSelectedItem().value;
    if(prov){
      prov = prov.value._id;
      this.reportesService
        .getProvincias(prov,tipo)
        .subscribe((data) => {
          this.dataJson = data;
          this.pieChartData = this.pieChartLabels.map((label) => {
            return Math.round((data[0][label] + Number.EPSILON) * 100) / 100;
          });
        });
    }
  }
  loadByRec(){
    let rec =this.dropRec.getSelectedItem();
    let tipo=this.dropEleccion.getSelectedItem().value;
    if(rec){
      rec = rec.value._id;
      this.reportesService
        .getRecintos(rec,tipo)
        .subscribe((data) => {
          this.dataJson = data;
          this.pieChartData = this.pieChartLabels.map((label) => {
            return Math.round((data[0][label]) * 100) / 100;
          });
        });
    }
  }

  loadDataTest() {
    
  }
}
