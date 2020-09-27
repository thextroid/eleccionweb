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

@Component({
  selector: "app-mesas",
  templateUrl: "./mesas.component.html",
  styleUrls: ["./mesas.component.css"],
})
export class MesasComponent implements OnInit {
  @ViewChild("migrid") migrid: jqxGridComponent;
  @ViewChild("myModal") public myModal: ModalDirective;
  @ViewChild("mdDepUpdate") public mdDepUpdate: ModalDirective;
  @ViewChild("msgNotification") minoti: jqxNotificationComponent;
  @ViewChild("dropCir", { static: false }) dropCir: jqxDropDownListComponent;
  @ViewChild("dropProv") dropProv: jqxDropDownListComponent;
  @ViewChild("dropMun") dropMun: jqxDropDownListComponent;
  @ViewChild("smallModal") public smallModal: ModalDirective;
  @ViewChild("btnAdd") btnAdd: jqxButtonComponent;
  @ViewChild("btnEdit") btnEdit: jqxButtonComponent;
  @ViewChild("btnReload") btnReload: jqxButtonComponent;

  constructor(
    protected $rec: RecintosService,
    protected $mun: MunicipiosService,
    protected $local: LocalidadesService,
    protected $prov: ProvinciasService,
    protected $cir: CircunscripcionesService
  ) {}

  formRec: FormGroup = new FormGroup({
    institucion: new FormControl(""),
  });

  action_text = "";
  modelRecinto: Recinto = new Recinto();

  ngOnInit() {
    // this.dropMun.disabled(true);
    // this.dropProv.disabled(true);
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
    // this.$rec.all().subscribe(
    // 	(data=>{
    // 		let e='',temp=[];
    // 		console.log(data);
    // 		this.lista=data;
    // 		for(let i=0;i<data.length;i++){

    // 			temp.push({
    // 				_id: e,
    // 				id:i+1,
    // 				institucion:data[i].institucion,
    // 				tipo:data[i].tipo
    // 				// tipo:data[i].tipo.length>1?data[i].tipo[0]+data[i].tipo[1]:data[i].tipo[0]
    // 			});
    // 		}
    // 		this.migrid.addrow(null,temp);
    // 		this.btnReload.setOptions({disabled:false});
    // 	})
    // );
  }

  dropDownSource: string[] = ["id", "institucion"];
  sourceMunicipios: any = {
    datatype: "json",
    datafields: [{ name: "name" }, { name: "_id" }],
    id: "id",
    url: "http://192.81.217.7/api/municipios",
  };
  dataAdapterMun: any = new jqx.dataAdapter(this.sourceMunicipios);
  sourceLocalidades: any[];

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
        name: "estado",
        map: "estado",
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
    ],
    datatype: "array",
    root: "Rows",
    beforeprocessing: (data: any) => {
      this.source.totalrecords = data.TotalRows;
    },
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { datafield: "_id", text: "ID", width: 30, hidden: true },
    { datafield: "id", text: "#", width: 30 },
    { datafield: "recinto", text: "Recinto electoral", width: 250 },
    { datafield: "mesa", text: "N° de Mesa", width: 50 },
    { datafield: "estado", text: "estado", width: 50 },
    { datafield: "delegado", text: "Usuario", width: 150 },
    { datafield: "localidad", text: "Localidad", width: 100 },
  ];

  rendergridrows = (params: any): any => {
    return params.data;
  };

  Rowselect(event: any): void {}

  reload(event) {
    this.btnReload.setOptions({ disabled: true });
    this.migrid.clear();
    this.refresh();
  }
  save(form: FormGroup) {}
  hideModal() {
    this.modelRecinto = new Recinto();
    this.dropCir.uncheckAll();
    this.dropMun.clearSelection();
    this.dropProv.clearSelection();
  }
  a = ["Arce", "Aviles", "Cercado", "Gran Chaco", "Mendez", "O'Connor"];
  b = [
    "Bermejo",
    "El Puente",
    "Entre Rios",
    "Padcaya",
    "San Lorenzo",
    "Tarija",
    "Uriondo (concepcion)",
    "Villa Montes",
    "Yacuiba",
    "Yunchara",
  ];
  cirCambiando(event: any): void {
    this.dropProv.clearSelection();
    this.dropMun.clearSelection();
    var idcir = this.dropCir.getSelectedItem().value;
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
    this.dropMun.clearSelection();
    var idprov = this.dropProv.getSelectedItem().value;
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

  rules = [
    {
      input: ".",
      message: "Nombre es requerida!",
      action: "keyup, blur",
      rule: "required",
    },
  ];
}
