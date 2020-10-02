import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { jqxButtonComponent } from "jqwidgets-ng/jqxbuttons";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
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
import { jqxSwitchButtonComponent } from 'jqwidgets-ng/jqxswitchbutton';
import { VotacionService } from '../../servicios/votacion.service';
import { NgWizardService } from 'ng-wizard';

@Component({
  selector: "app-mesas",
  templateUrl: "./mesas.component.html",
  styleUrls: ["./mesas.component.css"],
})
export class MesasComponent implements OnInit {
  @ViewChild("migrid") migrid: jqxGridComponent;
  @ViewChild("gridVotos") gridvot: jqxGridComponent;
  @ViewChild("myModal") public myModal: ModalDirective;
  @ViewChild("mdDepUpdate") public mdDepUpdate: ModalDirective;
  @ViewChild("msgNotification") minoti: jqxNotificationComponent;
  @ViewChild("dropCir", { static: false }) dropCir: jqxDropDownListComponent;
  @ViewChild("dropProv") dropProv: jqxDropDownListComponent;
  @ViewChild("dropMun") dropMun: jqxDropDownListComponent;
  @ViewChild("smallModal") public smallModal: ModalDirective;
  @ViewChild("filterText") intext: jqxInputComponent;
  @ViewChild("toggle") toggle: jqxSwitchButtonComponent;
  @ViewChild("btnAdd") btnAdd: jqxButtonComponent;
  @ViewChild("btnEdit") btnEdit: jqxButtonComponent;
  @ViewChild("btnReload") btnReload: jqxButtonComponent;

  constructor(
    protected $rec: RecintosService,
    protected $mun: MunicipiosService,
    protected $local: LocalidadesService,
    protected $prov: ProvinciasService,
    protected $vot: VotacionService,
    protected $cir: CircunscripcionesService,
    private ngWizardService: NgWizardService
  ) {}

  formRec: FormGroup = new FormGroup({
    institucion: new FormControl(""),
  });

  action_text = "";
  modelRecinto: Recinto = new Recinto();

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh() {
    this.$cir.all().subscribe(
      (data) => {
        let list: any[] = [];
        for (let i = 0; i < data.length; i++) {
          list.push({ value: data[i]._id, label: data[i].name });
        }
        this.dropCir.source(list);
      },
      (error) => {
        console.log(error);
      }
    );
    this.$vot.all().subscribe(
      (data)=>{
        let list=[];
        for (let i = 0; i < data.length; i++) {
          list.push({
            _id:data[i].recinto,
            id:i+1,
            recinto:data[i].recinto.institucion,
            mesa:data[i].numeroMesa,
            estado:data[i].estado,
            circunscripcion:data[i].circunscripcion.name,
            provincia:data[i].recinto.municipio.provincia.name,
            municipio:data[i].recinto.municipio.name,
            delegado:"Israel Marino Jerez",
            localidad:data[i].recinto.localidad.name,
            tipo:(data[i].recinto.tipo.length==1?data[i].recinto.tipo[0]:data[i].recinto.tipo[0]+"/"+data[i].recinto.tipo[1]),
            habilitados:data[i].acta.empadronados
          });          
        }
        this.migrid.addrow(null,list);
      },
      (error)=>{
        console.log(error);
      }
    );

  }

  

  source: any = {
    localdata: [],
    datafields: [
      {
        name: "_id",
        map: "_id",
      },
      {
        name: "id",
        map: "id",
      },
      {
        name: "recinto",
        map: "recinto",
        type: "string",
      },
      {
        name: "mesa",
        map: "mesa",
        type: "string",
      },
      {
        name: "estado",
        map: "estado",
        type: "string",
      },
      {
        name: "circunscripcion",
        map: "circunscripcion",
        type: "string",
      },
      {
        name: "provincia",
        map: "provincia",
        type: "string",
      },
      {
        name: "municipio",
        map: "municipio",
        type: "string",
      },
      {
        name: "delegado",
        map: "delegado",
        type: "string",
      },
      {
        name: "localidad",
        map: "localidad",
        type: "string",
      },
      {
        name: "tipo",
        map: "tipo",
        type: "string",
      },
      {
        name: "habilitados",
        map: "habilitados",
        type: "number",
      }
    ],
    datatype: "array",
    root: "Rows",
    beforeprocessing: (data: any) => {
      this.source.totalrecords = data.TotalRows;
    },
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  
	source2: any = {
		datafields:  [
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
    ],
		localdata: [],
		beforeprocessing: (data: any) => {
			this.source.totalrecords = data.TotalRows;
		},
	};
	
	columns2: any[] = [
		{ datafield: "candidatura", text: "", width: "19%" ,editable:false},
		{ datafield: "CREEMOS", text: "CREEMOS", width: "9%" ,editable:true},
		{ datafield: "ADN", text: "ADN", width: "9%" ,editable:true},
		{ datafield: "MAS", text: "MAS-IPSP", width: "9%" ,editable:true},
		{ datafield: "FPV", text: "FPV", width: "9%" ,editable:true},
		{ datafield: "PANBOL", text: "PANBOL", width: "9%" ,editable:true},
		{ datafield: "LIBRE21", text: "LIBRE21", width: "9%" ,editable:true},
		{ datafield: "CC", text: "CC", width: "9%" ,editable:true},
		{ datafield: "blancos", text: "Blancos", width: "9%" ,editable:true},
		{ datafield: "nulos", text: "Nulos", width: "9%" ,editable:true},
	];
	dataAdapter2: any = new jqx.dataAdapter(this.source2);

  linkrender = (row: number, column: any, value: any): any => {
    
    return "<button class='btn btn-primary'>"+value+"</button>";
  }
  estadorender = (row: number, column: any, value: any): any => {
    return "<h6 style='height:100%;line-height:1.5;text-align:center;vertical-align:middle;'><span class='badge badge-secondary'>"+value+"</span></h6>";
  }
  columns: any[] = [
    { datafield: "_id", text: "ID", width: 30, hidden: true },
    { datafield: "id", text: "#", width: 45 },
    { datafield: "recinto", text: "Recinto electoral", width: 250 },
    { datafield: "mesa", text: "N° de Mesa", width: 80 },
    { datafield: "estado", text: "estado", width: 60,cellsrenderer:this.estadorender },
    { datafield: "circunscripcion", text: "Circuns.", width: 50 ,filtertype: 'checkedlist'},
    { datafield: "provincia", text: "Provincia", width: 150 ,filtertype: 'checkedlist'},
    { datafield: "municipio", text: "Municipio", width: 150 ,filtertype: 'checkedlist'},
    { datafield: "localidad", text: "Localidad", width: 100 },
    { datafield: "delegado", text: "Usuario", width: 150 },
    { datafield: "tipo", text: "Tipo", width: 100 ,filtertype: 'checkedlist'},
    { datafield: "habilitados", text: "N°. Habiltados", width: 60 }
  ];

  rendergridrows = (params: any): any => {
    return params.data;
  };

  Rowselect(event: any): void {}

  hideModal() {

  }
  
  cirCambiando(event: any): void {
    this.dropProv.clear();
    this.dropMun.clear();
    var idcir = this.dropCir.getSelectedItem().value;
    if(this.toggle.val()){
      console.log("listo para filtrar por ", this.dropCir.getSelectedItem().value  );
    }
    this.$cir.get(idcir).subscribe((res) => {
      var ops = res.provincias,
        list = [];
      for (let i = 0; i < ops.length; i++)
        list.push({ value: ops[i]._id, label: ops[i].name });
      this.dropProv.source(list);
      this.dropProv.setOptions({ disabled: false });
      
    });
  }
  provCambiando(event: any): void {
    this.dropMun.clear();
    var idprov = this.dropProv.getSelectedItem().value;
    if(this.toggle.val()){
      console.log("listo para filtrar por ", this.dropCir.getSelectedItem().value , this.dropProv.getSelectedItem().value);
    }
    this.$mun.all().subscribe((res) => {
      var list = [];
      for (let i = 0; i < res.length; i++) {
        if ("provincia" in res[i] && res[i].provincia._id == idprov) {
          list.push({ value: res[i]._id, label: res[i].name });
        }
      }
      this.dropMun.source(list);
      this.dropMun.setOptions({ disabled: false });
    });
  }
  munCambiando(event: any){
    var idmun = this.dropMun.getSelectedItem().value;
    if(this.toggle.val()){
      console.log("listo para filtrar por", this.dropCir.getSelectedItem().value , this.dropProv.getSelectedItem().value, this.dropMun.getSelectedItem().value);
    }
  }
  texto:any;
  filtrar(){
    if(this.toggle.val()){
      const cir= this.dropCir.getSelectedItem();
      const pro= this.dropProv.getSelectedItem();
      const mun= this.dropMun.getSelectedItem();
      console.log(this.toggle.val());
      let data={circunscripcionId:'',provinciaId:'',municipioId:'',institucion:''};
      if(cir!=null)
        data.circunscripcionId=cir.value;
      if(pro!=null)
        data.provinciaId=pro.value;
      if(mun!=null)
        data.municipioId=mun.value;
      if(this.texto!=undefined) 
        data.institucion=this.texto;
      console.log(data);
    }
  }
  rules = [
    {
      input: ".",
      message: "Nombre es requerida!",
      action: "keyup, blur",
      rule: "required",
    },
  ];


  langs=       {
    // separator of parts of a date (e.g. '/' in 11/05/1955)
    '/': "-",
    // separator of parts of a time (e.g. ':' in 05:44 PM)
    ':': ":",
    // the first day of the week (0 = Sunday, 1 = Monday, etc)
    firstDay: 0,
    days: {
        // full day names
        names: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        // abbreviated day names
        namesAbbr: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        // shortest day names
        namesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    },
    months: {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", ""],
        // abbreviated month names
        namesAbbr: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", ""]
    },
    AM: ["AM", "am", "AM"],
    PM: ["PM", "pm", "PM"],
    eras: [
    {"name": "A.D.", "start": null, "offset": 0 }
],
    twoDigitYearMax: 2029,
    patterns: {
        d: "M/d/yyyy",
        D: "dddd, MMMM dd, yyyy",
        t: "h:mm tt",
        T: "h:mm:ss tt",
        f: "dddd, MMMM dd, yyyy h:mm tt",
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        M: "MMMM dd",
        Y: "yyyy MMMM",
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
    },
    percentsymbol: "%",
    currencysymbol: "$",
    currencysymbolposition: "before",
    decimalseparator: '.',
    thousandsseparator: ',',
    pagergotopagestring: "Ir a pagina:",
    pagershowrowsstring: "Ver filas:",
    pagerrangestring: " de ",
    pagerpreviousbuttonstring: "anterior",
    pagernextbuttonstring: "siguiente",
    groupsheaderstring: "Drag a column and drop it here to group by that column",
    sortascendingstring: "Ascendente",
    sortdescendingstring: "Descendente",
    sortremovestring: "Resetear",
    groupbystring: "Agrupar por esta columna",
    groupremovestring: "Eliminar desde Grupos",
    filterclearstring: "Limpiar",
    filterstring: "Filtrar",
    filtershowrowstring: "Ver filas where:",
    filtershowrowdatestring: "Ver filas where date:",
    filterorconditionstring: "o",
    filterandconditionstring: "y",
    filterselectallstring: "(Seleccionar todo)",
    filterchoosestring: "Seleccione:",
    filterstringcomparisonoperators: ['vacio', 'no vacío', 'contiene', 'contiene(coincidencias)',
        'no contiene', 'no contiene(coinc.)', 'empieza con', 'empieza con(coinc.)',
        'termina con', 'termina con(coinc.)', 'igual', 'igual(coinc.)', 'nulos', 'no nulos'],
    filternumericcomparisonoperators: ['igual', 'no iguale', 'menor que', 'menor igual', 'mayor', 'mayor igual', 'null', 'not null'],
    filterdatecomparisonoperators: ['igual', 'no iguale', 'menor que', 'menor o igual', 'greater than', 'greater than or equal', 'null', 'not null'],
    filterbooleancomparisonoperators: ['igual', 'no es iguale'],
    validationstring: "Valor ingresado no se valido",
    emptydatastring: "No hay datos para mostrar",
    filterselectstring: "Seleccione filtro",
    loadtext: "Cargando...",
    clearstring: "Limpiar",
    todaystring: "Hoy"          
};
}
