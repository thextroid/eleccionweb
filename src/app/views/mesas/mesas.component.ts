import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { jqxButtonComponent } from "jqwidgets-ng/jqxbuttons";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { jqxInputComponent } from "jqwidgets-ng/jqxinput";
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
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxTextAreaComponent } from 'jqwidgets-ng/jqxtextarea';
import { NgxSpinnerService } from 'ngx-spinner';
import { langes } from  "../../models/utils";
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
  @ViewChild("dropStatus") dropStatus: jqxDropDownListComponent;
  @ViewChild("dropMun") dropMun: jqxDropDownListComponent;
  @ViewChild("smallModal") public smallModal: ModalDirective;
  @ViewChild("filterText") intext: jqxInputComponent;
  @ViewChild("inputEmpadronados") inemp: jqxNumberInputComponent;
  @ViewChild("toggle") toggle: jqxSwitchButtonComponent;
  @ViewChild("btnAdd") btnAdd: jqxButtonComponent;
  @ViewChild("btnEdit") btnEdit: jqxButtonComponent;
  @ViewChild("btnReload") btnReload: jqxButtonComponent;
  @ViewChild("inputActa") inacta: jqxInputComponent;
  @ViewChild("myTextArea") inobser: jqxTextAreaComponent;
  @ViewChild("validatorVotos", { static: false }) myValidator: jqxValidatorComponent;
  // @ViewChild("inputEmpadronados") inemp: jqxInputComponent;

  constructor(
    protected $rec: RecintosService,
    protected $mun: MunicipiosService,
    protected $local: LocalidadesService,
    protected $prov: ProvinciasService,
    protected $vot: VotacionService,
    protected $cir: CircunscripcionesService,
    private ngWizardService: NgWizardService,
    private $notifier: SnotifyService,
    private $spinner: NgxSpinnerService
  ) {}
  acta:any={codigo:'',emp:0,apertura:'',cierre:'',foto:null,id:''};
  info:any={cir:'',prov:'',mun:'',rec:'',loc:'',mesa:-1};
  formRec: FormGroup = new FormGroup({
    institucion: new FormControl(""),
  });

  action_text = "";
  modelRecinto: Recinto = new Recinto();
  langs:any=langes;
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh() {
    // this.$cir.all().subscribe(
    //   (data) => {
    //     let list: any[] = [];
    //     for (let i = 0; i < data.length; i++) {
    //       list.push({ value: data[i]._id, label: data[i].name });
    //     }
    //     this.dropCir.source(list);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.$vot.all().subscribe(
      (data)=>{
        let list=[];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          list.push({
            _id:data[i],
            id:i+1,
            recinto:data[i].recinto.institucion,
            mesa:data[i].numeroMesa,
            estado:data[i].estado,
            circunscripcion:data[i].recinto.circunscripcion.name,
            provincia:data[i].recinto.provincia.name,
            municipio:data[i].recinto.municipio.name,
            delegado:"Israel Marino Jerez",
            localidad:data[i].recinto.localidad,
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
        name: "MASIPSP",
        map: "MASIPSP",
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
        name: "votosBlancos",
        map: "votosBlancos",
        type: "number",
      },
      {
        name: "votosNullos",
        map: "votosNullos",
        type: "number",
      },
    ],
    localdata: [],
    beforeprocessing: (data: any) => {
      this.source.totalrecords = data.TotalRows;
    },
  };
  cellrender2 = (row: number, column: any, value: any): any => {
    let rowdata = this.gridvot.getrowdata(row);
    console.log(this.inemp.val());
    let sumvotos = rowdata.CREEMOS+
    rowdata.ADN+
    rowdata.MASIPSP+
    rowdata.FPV+
    rowdata.PANBOL+
    rowdata.LIBRE21+
    rowdata.CC+
    rowdata.votosBlancos+
    rowdata.votosNullos;
    console.log(value,sumvotos,this.inemp.val());
    
    if(sumvotos==0 || value==0 || sumvotos<=this.inemp.val())
    return "<h6 style='height:100%;text-align:center;vertical-align:middle;'><div class='cell-default'>"+value+"</div></h6>";
    else
    return "<h6 style='height:100%;text-align:center;vertical-align:middle;'><div class='cell-red'>"+value+"</div></h6>";
  }
  columns2: any[] = [
    { datafield: "candidatura", text: "", width: "19%" ,editable:false},
    { datafield: "CREEMOS", text: "CREEMOS", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "ADN", text: "ADN", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "MASIPSP", text: "MAS-IPSP", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "FPV", text: "FPV", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "PANBOL", text: "PANBOL", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "LIBRE21", text: "LIBRE21", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "CC", text: "CC", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "votosBlancos", text: "Blancos", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
    { datafield: "votosNullos", text: "Nulos", width: "9%" ,editable:true,cellsrenderer:this.cellrender2},
  ];
  dataAdapter2: any = new jqx.dataAdapter(this.source2);

  linkrender = (row: number, column: any, value: any): any => {
    return "<button class='btn btn-primary'>"+value+"</button>";
  }
  estadorender = (row: number, column: any, value: any): any => {
    if(value=="Verificado")
      return "<h6 style='height:100%;line-height:1.5;text-align:center;vertical-align:middle;'><span class='badge badge-success'>"+value+"</span></h6>";
    else if(value=="Anulado")
      return "<h6 style='height:100%;line-height:1.5;text-align:center;vertical-align:middle;'><span class='badge badge-warning'>"+value+"</span></h6>";
    else
      return "<h6 style='height:100%;line-height:1.5;text-align:center;vertical-align:middle;'><span class='badge badge-secondary'>"+value+"</span></h6>";
  }
  
  columns: any[] = [
    { datafield: "_id", text: "ID", width: 30, hidden: true },
    { datafield: "id", text: "#", width: 45 },
    { datafield: "recinto", text: "Recinto electoral", width: 250 },
    { datafield: "mesa", text: "Mesa", width: 80 },
    { datafield: "estado", text: "estado", width: 110,cellsrenderer:this.estadorender },
    { datafield: "circunscripcion", text: "Circuns.", width: 100 ,filtertype: 'checkedlist'},
    { datafield: "provincia", text: "Provincia", width: 150 ,filtertype: 'checkedlist'},
    { datafield: "municipio", text: "Municipio", width: 150 ,filtertype: 'checkedlist'},
    { datafield: "localidad", text: "Localidad", width: 100 },
    { datafield: "delegado", text: "Usuario", width: 150 ,hidden:true},
    { datafield: "tipo", text: "Tipo", width: 100 ,filtertype: 'checkedlist'},
    { datafield: "habilitados", text: "Habiltados", width: 110 }
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

  next(){
    const rowselect = this.migrid.getselectedrowindex();
    if(rowselect!=-1){

      const rowdata = this.migrid.getrowdata(rowselect);
      if(rowdata.estado==="Verificado"){
        this.mensaje('Ya no se puede acceder porque ya esta verificada','Votacion',1);
        return;
      }
      this.ngWizardService.next();
      console.log(rowdata._id);
      this.info.mesa = rowdata._id.numeroMesa;
      this.info.rec = rowdata._id.recinto;
      this.info.mun = rowdata._id.recinto.municipio;
      this.info.loc = rowdata._id.recinto.localidad;
      this.info.prov = rowdata._id.recinto.municipio.provincia;
      this.info.cir = rowdata._id.recinto.circunscripcion;
      this.acta.codigo = rowdata._id.acta.codMesa;
      this.acta.id = rowdata._id.acta._id;
      this.inacta.val(this.acta.codigo);
      this.inobser.val(rowdata._id.acta.observaciones);
      this.acta.emp = rowdata._id.acta.empadronados;
      this.inemp.val(this.acta.emp);
      this.acta.apertura = rowdata._id.acta.horaApertura;
      this.acta.cierre = rowdata._id.acta.horaCierre;
      this.acta.estado = rowdata._id.acta.estado;
      let list=[];
      console.log(rowdata._id);
      for (let i = 0; i < rowdata._id.candidaturas.length; i++) {
        list.push(rowdata._id.candidaturas[i]);
      }
      this.gridvot.clear();
      this.gridvot.addrow(null,list);
    }
    else{
      this.mensaje('debe seleccionar un recinto para continuar','Votacion',2);
    }
  }
  checkCellvalue(event){
  }
 
  downloadFoto(){
    this.$vot.downloadImage(this.acta.id).subscribe(
      (response)=>{
        this.processing(response, 'image/*');
      }
    )
  }
  processing(data:any, type:string){
    let blob = new Blob([data],{type:type});
    let url= window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if(!pwa || pwa.closed || typeof pwa.closed == 'undefined'){
      this.mensaje('Porfavor deshabilita tu Pop-up Blocker e intenta de nuevo','',1);
    }
  }
  prev(){
    this.ngWizardService.previous();
  }
  habilitadosChange(event){
    this.gridvot.refreshdata();
  }
  preprocessingVotos(){
    this.myValidator.validate();
    this.myValidator.validateInput('inStatus');
  }
  reset(){
    this.myValidator.hide();
    this.myValidator.hideHint('inStatus');
  }
  save(){
    this.dropStatus.getSelectedItem().value;
    let listvotos= this.gridvot.getdisplayrows();
    const data={
      codMesa: this.inacta.val(),
      empadronados: this.inemp.val(),
      observaciones:this.inobser.val(),
      estado: "Verificado"
    };
    let v=[];
    for (let i = 0; i < listvotos.length; i++) {
      v.push({
        candidatura:listvotos[i].candidatura,
      'CREEMOS':listvotos[i].CREEMOS,
      'ADN':listvotos[i].ADN,
      'MASIPSP':listvotos[i].MASIPSP,
      'FPV':listvotos[i].FPV,
      'PANBOL':listvotos[i].PANBOL,
      'LIBRE21':listvotos[i].LIBRE21,
      'CC':listvotos[i].CC,
      'votosValidos':listvotos[i].CREEMOS+listvotos[i].ADN+listvotos[i].MASIPSP+listvotos[i].FPV+listvotos[i].PANBOL+listvotos[i].LIBRE21+listvotos[i].CC,
      'votosBlancos':listvotos[i].votosBlancos,
      'votosNullos':listvotos[i].votosNullos});
    }
    const formVotos = {
      codMesa:this.inacta.val(),
      recinto:this.info.rec._id,
      circunscripcion:this.info.cir._id,
      numeroMesa:this.info.mesa,
      estado:"Verificado",
      candidaturas:v
    };
    let res=this.checkVotos();
    if(res!=null){
      this.mensaje(res,'',2);
    }
    else{
      
      this.$spinner.show();
      
      this.$vot.updateActa(this.acta.id,data).subscribe(
        (res)=>{
          const row = this.migrid.getrowdata(this.migrid.getselectedrowindex());
          console.log(row);
          this.$vot.updateVotos(row._id._id,formVotos).subscribe(
            (res2)=>{
              this.mensaje('se actualizo la votacion','',0);
              this.ngWizardService.reset();
              this.$spinner.hide();
              this.migrid.setcellvalue(this.migrid.getselectedrowindex(),'estado','Verificado');
            },
            (error2)=>{
              this.mensaje('no se pudo actualizar','',3);
              console.log(error2);
            }
          );
          
        },
        (error)=>{
          this.mensaje('No pudo cargar Acta','Acta',3);
          this.$spinner.hide();
          console.log(error)
        }
      );
      console.log(formVotos,data);
    }
    this.gridvot.refreshdata();
  }
  checkSelectStatus(event){
    this.myValidator.validateInput('inStatus');
  }
  checkVotos(){
    let rows = this.gridvot.getdisplayrows(),diff=0,message="";
    for (let i = 0; i < rows.length; i++) {
      diff+=rows[i].CREEMOS+
      rows[i].ADN+
      rows[i].MASIPSP+
      rows[i].FPV+
      rows[i].PANBOL+
      rows[i].LIBRE21+
      rows[i].CC+
      rows[i].votosBlancos+
      rows[i].votosNullos;
      if(diff>this.inemp.val()){
        message +=(i+1)+" ";
      }
      diff=0;
    }
    return (message!=='')? "Los votos en las Filas:  "+message+" deben ser menores a los empadronados.":null;
  }

 
mensaje(content: string, title: string, tipo) {
  const op = {
    timeout: 3500,
    titleMaxLength: 22,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: SnotifyPosition.rightTop,
  };
  if (tipo == 0) this.$notifier.success(content, title, op);
  if (tipo == 1) this.$notifier.warning(content, title, op);
  if (tipo == 2) this.$notifier.info(content, title, op);
  if (tipo == 3) this.$notifier.error(content, title, op);
}

rules=[
  {   input: '.inCodmesa', message: 'Codigo mesa requerido!', action: 'keyup, blur', rule: 'required' },
  {   input: '.inCodmesa', message: 'Mínimo de 4 caracteres', action: 'keyup, blur', rule: 'minLength=4' },
  {   input: '.inCodmesa', message: 'Máximo de 255 caracteres', action: 'keyup, blur', rule: 'maxLength=255' },
  {   input: '.inEmp', message: 'debe estar entre 1 y 1024', action: 'keyup, blur',
  rule: (input: any, commit: any): boolean => {
    const lat = input.val();
    return lat>=1 && lat<=1024;
  }
},
  {   input: '.inStatus', message: 'Seleccione el estado', action: 'keyup, blur',
  rule: (input: any, commit: any): boolean => {
    return this.dropStatus.getSelectedIndex()!=-1;
  }
}
// {   input: '.inFoto', message: 'La imagen debe ser menor a 6Mb.', action: 'keyup, blur', 
//     rule:  (input: any, commit: any): boolean => {
//       // const maxsize= 6291456;//6MB
//       // if(this.imageChangedEvent=='')return false;
//       // return this.imageChangedEvent.target.files[0].size<=maxsize;
//       return true;
//     }
//   }
];
}