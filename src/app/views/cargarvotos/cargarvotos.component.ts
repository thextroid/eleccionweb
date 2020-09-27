import { Component, OnInit, ViewChild } from "@angular/core";
import { jqxCalendarComponent } from "jqwidgets-ng/jqxcalendar";
import { jqxDateTimeInputComponent } from "jqwidgets-ng/jqxdatetimeinput";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { jqxFileUploadComponent } from "jqwidgets-ng/jqxfileupload";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { jqxInputComponent } from "jqwidgets-ng/jqxinput";

import {
  NgWizardConfig,
  THEME,
  StepChangedArgs,
  NgWizardService,
} from "ng-wizard";
import { Circunscripcion } from "../../models/circunscripcion";
import { Municipio } from "../../models/municipio";
import { Provincia } from "../../models/provincia";
import { Recinto } from "../../models/recinto";
import { CircunscripcionesService } from "../../servicios/circunscripciones.service";
import { MunicipiosService } from "../../servicios/municipios.service";
import { ProvinciasService } from "../../servicios/provincias.service";
import { RecintosService } from "../../servicios/recintos.service";
import { VotacionService } from "../../servicios/votacion.service";

@Component({
  selector: "app-cargarvotos",
  templateUrl: "./cargarvotos.component.html",
  styleUrls: ["./cargarvotos.component.css"],
})
export class CargarvotosComponent implements OnInit {
  @ViewChild("dropCir", { static: false }) dropCir: jqxDropDownListComponent;
  @ViewChild("dropProv", { static: false }) dropProv: jqxDropDownListComponent;
  @ViewChild("dropMun", { static: false }) dropMun: jqxDropDownListComponent;
  @ViewChild("dropRec", { static: false }) dropRec: jqxDropDownListComponent;
  @ViewChild("migrid", { static: false }) migrid: jqxGridComponent;
  @ViewChild("inputNumeroMesa", { static: false })
  numberMesa: jqxInputComponent;
  @ViewChild("inputEmp", { static: false }) empadronados: jqxInputComponent;
  @ViewChild("inputApertura", { static: false })
  apertura: jqxDateTimeInputComponent;
  @ViewChild("inputCierre", { static: false })
  cierre: jqxDateTimeInputComponent;
  @ViewChild("inputFoto", { static: false }) foto: jqxFileUploadComponent;
  listPartidos = [
    { name: "Creemos", sigla: "CREEMOS" },
    {
      name:
        "MOVIMIENTO AL SOCIALISMO INSTRUMENTO POLITICO POR LA SOBERANIA DE LOS PUEBLOS",
      sigla: "MAS-IPSP",
    },
    {
      name: "Comunidad Ciudadana",
      sigla: "CC",
    },
    {
      name: "Libertad y Democracia",
      sigla: "LIBRE21",
    },
    {
      name: "Frente Para la Victoria",
      sigla: "FPV",
    },
    {
      name: "Partido de Accion Nacional Boliviano",
      sigla: "PANBOL",
    },
    {
      name: "Partido de Accion Nacional Boliviano",
      sigla: "PANBOL",
    },
    {
      name: "Accion Democratica Nacionalista",
      sigla: "ADN",
    },
  ];
  datafields: any[] = [
    {
      name: "candidatura",
      map: "candidatura",
      type: "string",
    },
    {
      name: "CREEMOS",
      map: "CREEMOS",
      type: "number",
    },
    {
      name: "ADN",
      map: "ADN",
      type: "number",
    },
    {
      name: "MAS",
      map: "MAS",
      type: "number",
    },
    {
      name: "FPV",
      map: "FPV",
      type: "number",
    },
    {
      name: "PANBOL",
      map: "PANBOL",
      type: "number",
    },
    {
      name: "LIBRE21",
      map: "LIBRE21",
      type: "number",
    },
    {
      name: "CC",
      map: "CC",
      type: "number",
    },
    {
      name: "blancos",
      map: "blancos",
      type: "number",
    },
    {
      name: "nulos",
      map: "nulos",
      type: "number",
    },
  ];
  source: any = {
    datafields: this.datafields,
    localdata: [
      {
        candidatura: "Presidencial",
        CREEMOS: 0,
        ADN: 0,
        MAS: 0,
        FPV: 0,
        PANBOL: 0,
        LIBRE21: 0,
        CC: 0,
        blancos: 0,
        nulos: 0,
      },
      {
        candidatura: "Diputado Uninominal",
        CREEMOS: 0,
        ADN: 0,
        MAS: 0,
        FPV: 0,
        PANBOL: 0,
        LIBRE21: 0,
        CC: 0,
        blancos: 0,
        nulos: 0,
      },
      {
        candidatura: "Diputado Especial",
        CREEMOS: 0,
        ADN: 0,
        MAS: 0,
        FPV: 0,
        PANBOL: 0,
        LIBRE21: 0,
        CC: 0,
        blancos: 0,
        nulos: 0,
      },
    ],
    beforeprocessing: (data: any) => {
      this.source.totalrecords = data.TotalRows;
    },
  };

  columns: any[] = [
    { datafield: "candidatura", text: "", width: "19%" },
    { datafield: "CREEMOS", text: "CREEMOS", width: "9%" },
    { datafield: "ADN", text: "ADN", width: "9%" },
    { datafield: "MAS", text: "MAS-IPSP", width: "9%" },
    { datafield: "FPV", text: "FPV", width: "9%" },
    { datafield: "PANBOL", text: "PANBOL", width: "9%" },
    { datafield: "LIBRE21", text: "LIBRE21", width: "9%" },
    { datafield: "CC", text: "CC", width: "9%" },
    { datafield: "blancos", text: "Blancos", width: "9%" },
    { datafield: "nulos", text: "Nulos", width: "9%" },
  ];
  dataAdapter: any = new jqx.dataAdapter(this.source);
  numberrenderer = (row: number, column: any, value: any): string => {
    return (
      '<div style="text-align:center;margin-top;5px;"' + (1 + value) + "</div>"
    );
  };
  buildGrid() {}

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: "Finish",
          class: "btn btn-info",
          event: () => {
            alert("Finished!!!");
          },
        },
      ],
    },
  };

  constructor(
    private ngWizardService: NgWizardService,
    private $vot: VotacionService,
    private $cir: CircunscripcionesService,
    private $prov: ProvinciasService,
    private $mun: MunicipiosService,
    private $rec: RecintosService
  ) {}
  circuns: Circunscripcion[] = [];
  provs: Provincia[] = [];
  muns: Municipio[] = [];
  recs: Recinto[] = [];
  ngOnInit() {}
  ngAfterViewInit() {
    this.$cir.all().subscribe(
      (res) => {
        this.circuns = res;
        let list = [];
        for (let i = 0; i < res.length; i++) {
          list.push({ value: res[i]._id, label: res[i].name });
        }
        this.dropCir.source(list);
      },
      (error) => {
        console.log(error);
      }
    );
    this.$prov.all().subscribe(
      (res) => {
        this.provs = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.$mun.all().subscribe(
      (res) => {
        this.muns = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.$rec.all().subscribe(
      (res) => {
        this.recs = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
  cambiarProvs() {
    this.dropProv.clearFilter();
    this.dropProv.clearSelection();
    const cirSelect = this.dropCir.getSelectedItem();

    let list = [];
    for (let i = 0; i < this.circuns.length; i++) {
      if (this.circuns[i]._id === cirSelect.value) {
        for (let j = 0; j < this.circuns[i].provincias.length; j++) {
          list.push({
            value: this.circuns[i].provincias[j]._id,
            label: this.circuns[i].provincias[j].name,
          });
        }
        break;
      }
    }
    console.log(this.circuns);

    this.dropProv.source(list);
  }
  cambiarMuns() {
    this.dropMun.clearFilter();
    this.dropMun.clearSelection();
    const provSelect = this.dropProv.getSelectedItem();
    let list = [];
    for (let i = 0; i < this.muns.length; i++) {
      if (this.muns[i].provincia._id === provSelect.value) {
        list.push({
          value: this.muns[i]._id,
          label: this.muns[i].name,
        });
      }
    }

    this.dropMun.source(list);
  }
  modelRec: Recinto = new Recinto();
  mess: any[] = [];
  cambiarRecs() {
    this.dropRec.clearFilter();
    this.dropRec.clearSelection();
    const munSelect = this.dropMun.getSelectedItem();
    let list = [];
    for (let i = 0; i < this.recs.length; i++) {
      if (
        "municipio" in this.recs[i] &&
        this.recs[i].municipio._id === munSelect.value
      ) {
        list.push({
          value: this.recs[i]._id,
          label: this.recs[i].institucion,
        });
      }
    }
    this.dropRec.source(list);
  }
  generarMesas() {
    const recSelect = this.dropRec.getSelectedItem();
    for (let i = 0; i < this.recs.length; i++) {
      if (this.recs[i]._id === recSelect.value) {
        this.modelRec = this.recs[i];
        break;
      }
    }
    for (let i = 0; i < this.modelRec.numeroMesas; i++) {
      this.mess.push(i + 1);
    }
  }
  Mesa: any;
  cargar(mesa) {
    this.Mesa = "Mesa " + mesa;
    console.log(this.modelRec, "numero de mesa: " + mesa);
  }
  enviar() {
    const cir = this.dropCir.getSelectedItem().value;
    const pro = this.dropProv.getSelectedItem().value;
    const mun = this.dropMun.getSelectedItem().value;
    const rec = this.dropRec.getSelectedItem().value;
    const tab = this.migrid.getdisplayrows();
    console.log(this.foto);
    let votos = [];

    votos.push({
      numeroMesa: this.Mesa,
      circunscripcion: cir,
      recinto: rec,
      estado: "Enviado",
      candidatura: tab[0].candidatura,
      MASIPSP: tab[0].MAS,
      CC: tab[0].CC,
      LIBRE21: tab[0].LIBRE21,
      FPV: tab[0].FPV,
      PANBOL: tab[0].PANBOL,
      ADN: tab[0].ADN,
      CREEMOS: tab[0].CREEMOS,
      votosBlancos: tab[0].blancos,
      votosNullos: tab[0].nulos,
    });
    if (this.modelRec.tipo.length == 1) {
      if (this.modelRec.tipo[0] == "Especial") {
        votos.push({
          numeroMesa: this.Mesa,
          circunscripcion: cir,
          recinto: rec,
          estado: "Enviado",
          candidatura: tab[2].candidatura,
          MASIPSP: tab[2].MAS,
          CC: tab[2].CC,
          LIBRE21: tab[2].LIBRE21,
          FPV: tab[2].FPV,
          PANBOL: tab[2].PANBOL,
          ADN: tab[2].ADN,
          CREEMOS: tab[2].CREEMOS,
          votosBlancos: tab[2].blancos,
          votosNullos: tab[2].nulos,
        });
      } else {
        votos.push({
          numeroMesa: this.Mesa,
          circunscripcion: cir,
          recinto: rec,
          estado: "Enviado",
          candidatura: tab[1].candidatura,
          MASIPSP: tab[1].MAS,
          CC: tab[1].CC,
          LIBRE21: tab[1].LIBRE21,
          FPV: tab[1].FPV,
          PANBOL: tab[1].PANBOL,
          ADN: tab[1].ADN,
          CREEMOS: tab[1].CREEMOS,
          votosBlancos: tab[1].blancos,
          votosNullos: tab[1].nulos,
        });
      }
    }

    const data = [
      {
        codMesa: this.numberMesa.val(),
        empadronados: this.empadronados.val(),
        horaApertura: this.apertura.val(),
        horaCierre: this.cierre.val(),
        filename: "",
        estado: "enviado",
      },
      votos,
    ];
    this.$vot.upload(data).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(data);
  }
}
