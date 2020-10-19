import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { jqxCalendarComponent } from "jqwidgets-ng/jqxcalendar";
import { jqxDateTimeInputComponent } from "jqwidgets-ng/jqxdatetimeinput";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { jqxFileUploadComponent } from "jqwidgets-ng/jqxfileupload";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { jqxInputComponent } from "jqwidgets-ng/jqxinput";
import { jqxTextAreaComponent } from 'jqwidgets-ng/jqxtextarea';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

import {
	NgWizardConfig,
	THEME,
	StepChangedArgs,
	NgWizardService,
} from "ng-wizard";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from 'ngx-uploader';
import { Circunscripcion } from "../../models/circunscripcion";
import { Municipio } from "../../models/municipio";
import { Provincia } from "../../models/provincia";
import { Recinto } from "../../models/recinto";
import { CircunscripcionesService } from "../../servicios/circunscripciones.service";
import { MunicipiosService } from "../../servicios/municipios.service";
import { ProvinciasService } from "../../servicios/provincias.service";
import { RecintosService } from "../../servicios/recintos.service";
import { VotacionService } from "../../servicios/votacion.service";
import { ThemeModule } from '../theme/theme.module';

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
	@ViewChild("inputNumeroMesa", { static: false })	numberMesa: jqxInputComponent;
	@ViewChild("inputEmp", { static: false }) empadronados: jqxInputComponent;
	@ViewChild("inputApertura", { static: false })	apertura: jqxDateTimeInputComponent;
	@ViewChild("inputCierre", { static: false })	cierre: jqxDateTimeInputComponent;
	@ViewChild("inputFoto", { static: false }) foto: jqxFileUploadComponent;
	@ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;
	@ViewChild('valacta', { static: false }) validatorActa: jqxValidatorComponent;
	@ViewChild('modalAperturar') public modalAperturar: ModalDirective;
	@ViewChild("inputDelegado", { static: false }) inDelegado: jqxInputComponent;
	@ViewChild('myTextArea') obser: jqxTextAreaComponent; 
	url = 'http://192.81.217.7:/api/actas/image/';
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;
	options: UploaderOptions;
	
	
	imageChangedEvent: any = '';
	croppedImage: any = '';
	mesasExistentes=[];

    fileChangeEvent(event: any): void {
				this.imageChangedEvent = event;
				console.log(event);
    }
    imageCropped(event: ImageCroppedEvent) {
				this.croppedImage = event.base64;
    }
    imageLoaded() {     }
    cropperReady() {    }
    loadImageFailed() {    }
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
		{
			name: "validos",
			map: "validos",
			type: "number",
		},
		{
			name: "total",
			map: "total",
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
				validos: 0,
				total: 0,
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
				validos: 0,
				total: 0,
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
				validos: 0,
				total: 0,
			},
		],
		beforeprocessing: (data: any) => {
			this.source.totalrecords = data.TotalRows;
		},
	};
	flag=0;
	totalcellrender = (row: number, column: any, value: any): any => {
		if(this.flag>0)this.flag--;
		if(value>=0 && value<=this.acta.emp)
    return "<h6 style='height:100%;text-align:center;vertical-align:middle;'><div class='cell-default'>"+value+"</div></h6>";
    else
    return "<h6 style='height:100%;text-align:center;vertical-align:middle;'><div class='cell-red'>"+value+"</div></h6>";
	}
	cellChange=(indexrow: number, datafield: string, columntype: string, oldvalue: any, newvalue: any): any => {
		
		
	}
	columns: any[] = [
		{ datafield: "candidatura", text: "", width: "19%" ,editable:false},
		{ datafield: "CREEMOS", text: "CREEMOS", width: "9%" ,editable:true},
		{ datafield: "ADN", text: "ADN", width: "0%" ,editable:true},
		{ datafield: "MAS", text: "MAS-IPSP", width: "9%" ,editable:true},
		{ datafield: "FPV", text: "FPV", width: "9%" ,editable:true},
		{ datafield: "PANBOL", text: "PANBOL", width: "0%" ,editable:true},
		{ datafield: "LIBRE21", text: "LIBRE21", width: "9%" ,editable:true,hidden:true},
		{ datafield: "CC", text: "CC", width: "9%" ,editable:true},
		{ datafield: "blancos", text: "Blancos", width: "9%" ,editable:true},
		{ datafield: "nulos", text: "Nulos", width: "9%" ,editable:true},
		{ datafield: "validos", text: "Validos", width: "9%" ,editable:false},
		{ datafield: "total", text: "Total", width: "9%" ,editable:false,cellsrenderer:this.totalcellrender},
	];
	dataAdapter: any = new jqx.dataAdapter(this.source);
	numberrenderer = (row: number, column: any, value: any): string => {
		return (
			'<div style="text-align:center;margin-top;5px;"' + (1 + value) + "</div>"
		);
	};
	buildGrid() {}
	checkmesa:any=-1;
	$ev :StepChangedArgs;
	config: NgWizardConfig = {
		selected:0,
		theme: THEME.dots,
		lang:{
			next:'Continuar',
			previous:'Volver'
		},
		keyNavigation:false,
		toolbarSettings: {
			showNextButton: false, showPreviousButton: false,
		}
	};

	constructor(
		private ngWizardService: NgWizardService,
		private $vot: VotacionService,
		private $cir: CircunscripcionesService,
		private $prov: ProvinciasService,
		private $mun: MunicipiosService,
		private $rec: RecintosService,
		private $notifier: SnotifyService
	) {
		this.options = { concurrency: 1, maxUploads: 100, maxFileSize: (1<<23) };
		this.files = [];
		this.uploadInput = new EventEmitter<UploadInput>();
		this.humanizeBytes = this.humanizeBytes;
	}

	circuns: Circunscripcion[] = [];
	provs: Provincia[] = [];
	muns: Municipio[] = [];
	recs: any[] = [];
	acta:any={codigo:'',emp:0,apertura:'',cierre:'',foto:null,id:''};
	info:any={cir:'',prov:'',mun:'',rec:'',loc:'',mesa:-1};
	ngOnInit() {}
	ngAfterViewInit() {
		this.$cir.all().subscribe(
			(res) => {
				this.circuns = res;
				let list = [];
				for (let i = 0; i < res.length; i++) {
					list.push({ value: res[i], label: res[i].name });
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
	
	Cellvaluechanged($event){
		this.flag++;
		const indexrow=$event.args.rowindex;
		const newvalue=$event.args.newvalue;
		const oldvalue=$event.args.oldvalue;
		const datafield=$event.args.datafield;
		if(datafield=="validos" || datafield=="total")return;
		if(newvalue<0 || newvalue>699){
			this.migrid.setcellvalue(indexrow,datafield,oldvalue);
		}
		else{
			let row =this.migrid.getrowdata(indexrow);
			let votosvalidos=
			(row.CREEMOS?row.CREEMOS:0)+
			(row.MAS?row.MAS:0)+
			(row.FPV?row.FPV:0)+
			(row.LIBRE21?row.LIBRE21:0)+
			(row.CC?row.CC:0);
			const blancos = (row.blancos?row.blancos:0);
			const nulos = (row.nulos?row.nulos:0);
			this.migrid.setcellvalue(indexrow,'validos',votosvalidos);
			this.migrid.setcellvalue(indexrow,'total',votosvalidos+blancos+nulos);
		}
	}
	showPreviousStep(event?: Event) {
		this.ngWizardService.previous();
	}

	showNextStep(event?: Event) {
		this.ngWizardService.next();
		console.log(event);
	}
	
	resetWizard(event?: Event) {
		this.ngWizardService.reset();
		console.log(event);
	}
	
	setTheme(theme: THEME) {
		this.ngWizardService.theme(theme);
	}
	
	stepChanged(args: StepChangedArgs) {
		this.$ev=args;
		console.log(args);
	}
	cambiarProvs() {
		this.dropProv.clearFilter();
		this.dropMun.clearFilter();
		this.dropRec.clearFilter();
		this.dropProv.clearSelection();
		this.dropMun.clearSelection();
		this.dropRec.clearSelection();
		this.myValidator.validateInput('inCir');
		const cirSelect = this.dropCir.getSelectedItem();
		this.info.cir=cirSelect.value;
		let list = [];
		for (let i = 0; i < this.circuns.length; i++) {
			if (this.circuns[i]._id === cirSelect.value._id) {
				for (let j = 0; j < this.circuns[i].provincias.length; j++) {
					list.push({
						value: this.circuns[i].provincias[j],
						label: this.circuns[i].provincias[j].name,
					});
				}
				break;
			}
		}
		console.log(this.circuns);
		this.dropProv.source(list);
	}
	cambiarMuns(){
		this.dropMun.clearFilter();
		this.dropRec.clearFilter();
		this.dropMun.clearSelection();
		this.dropRec.clearSelection();
		this.myValidator.validateInput('inProv');
		const provSelect = this.dropProv.getSelectedItem();
		console.log(provSelect);
		this.info.prov=provSelect.value;
		let list = [];
		for (let i = 0; i < this.muns.length; i++) {
			if (this.muns[i].provincia._id === provSelect.value._id) {
				list.push({
					value: this.muns[i],
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
		this.myValidator.validateInput('inMun');
		const munSelect = this.dropMun.getSelectedItem();
		const proSelect = this.dropProv.getSelectedItem();
		const cirSelect = this.dropCir.getSelectedItem();
		this.info.mun=munSelect.value;
		console.log(munSelect,proSelect,cirSelect);

		let list = [];
		for (let i = 0; i < this.recs.length; i++) {
			if ("municipio" in this.recs[i] && this.recs[i].municipio._id === munSelect.value._id 
			&& this.recs[i].provincia._id === proSelect.value._id
			&& this.recs[i].circunscripcion._id === cirSelect.value._id
			) {
				list.push({
					value: this.recs[i],
					label: this.recs[i].institucion+"/"+this.recs[i].localidad
				});
			}
		}
		this.dropRec.source(list);
	}
	generarMesas() {
		const recSelect = this.dropRec.getSelectedItem();
		this.info.rec=recSelect.value;
		this.info.loc=recSelect.value.localidad;
		console.log(recSelect.value);
		this.myValidator.validateInput('inRec');
		this.checkmesa=-1;
		this.mess=[];
		
		for (let i = 0; i < this.recs.length; i++) {
			if (this.recs[i]._id === recSelect.value._id) {
				this.modelRec = this.recs[i];
				break;
			}
		}
		this.$vot.getMesas(recSelect.value._id).subscribe(
			(data)=>{
				console.log(data);
				let match;
				for (let i = 0; i < this.info.rec.totalMesas; i++) {
					match=null;
					for (let j = 0; match==null && j < data.length; j++)
						if(data[j].numeroMesa===("Mesa "+(i+1)))
							match= data[j].estado;
					
					this.mess.push({nro:this.info.rec.mesas[i].mesa,disabled:(match==null),estado:(match!=null)?match:'Habilitado'});
				}
				console.log(this.mess)
			},
			(error)=>{
				console.log(error);
			}
		)
	}
	Mesa: any;
	cargar(mesa) {
		this.Mesa = mesa;
		this.info.mesa=mesa;
		console.log(this.modelRec, "numero de mesa: " + mesa);
	}
	uploadVotos() {
		const cir = this.dropCir.getSelectedItem().value._id;
		const pro = this.dropProv.getSelectedItem().value._id;
		const mun = this.dropMun.getSelectedItem().value._id;
		const rec = this.dropRec.getSelectedItem().value._id;
		const tab = this.migrid.getdisplayrows();
		let votos = [];
		let form = new FormData();
		votos.push({
			candidatura: 'Presidente y Vicepresidente',
			MASIPSP: tab[0].MAS,
			CC: tab[0].CC,
			LIBRE21: tab[0].LIBRE21,
			FPV: tab[0].FPV,
			PANBOL: tab[0].PANBOL,
			ADN: tab[0].ADN,
			CREEMOS: tab[0].CREEMOS,
			votosValidos:tab[0].MAS+tab[0].CC+tab[0].LIBRE21+tab[0].FPV+tab[0].PANBOL+tab[0].ADN+tab[0].CREEMOS,
			votosBlancos: tab[0].blancos,
			votosNullos: tab[0].nulos,
		});
		if (this.modelRec.tipo.length == 1) {
			const _cand="Diputados "+((this.modelRec.tipo[0] === "Especial")?"Especiales":"Uninominales");
			votos.push({candidatura: _cand,MASIPSP: tab[1].MAS,CC: tab[1].CC,LIBRE21: tab[1].LIBRE21,FPV: tab[1].FPV,PANBOL: tab[1].PANBOL,ADN: tab[1].ADN,CREEMOS: tab[1].CREEMOS,
				votosValidos:tab[1].MAS+tab[1].CC+tab[1].LIBRE21+tab[1].FPV+tab[1].PANBOL+tab[1].ADN+tab[1].CREEMOS,
				votosBlancos: tab[1].blancos,votosNullos: tab[1].nulos});
		}
		else{
			votos.push({candidatura: "Diputados Uninominales",MASIPSP: tab[1].MAS,CC: tab[1].CC,LIBRE21: tab[1].LIBRE21,FPV: tab[1].FPV,PANBOL: tab[1].PANBOL,ADN: tab[1].ADN,CREEMOS: tab[1].CREEMOS,
			votosValidos:tab[1].MAS+tab[1].CC+tab[1].LIBRE21+tab[1].FPV+tab[1].PANBOL+tab[1].ADN+tab[1].CREEMOS,
			votosBlancos: tab[1].blancos,votosNullos: tab[1].nulos});
			votos.push({candidatura: "Diputados Especiales",MASIPSP: tab[2].MAS,CC: tab[2].CC,LIBRE21: tab[2].LIBRE21,FPV: tab[2].FPV,PANBOL: tab[2].PANBOL,ADN: tab[2].ADN,CREEMOS: tab[2].CREEMOS,
			votosValidos:tab[2].MAS+tab[2].CC+tab[2].LIBRE21+tab[2].FPV+tab[2].PANBOL+tab[2].ADN+tab[2].CREEMOS,
			votosBlancos: tab[2].blancos,votosNullos: tab[2].nulos});
		}
		// file:this.imageChangedEvent.target.files[0];
		const formVotos = {
			codMesa:this.numberMesa.val(),
			numeroMesa: "Mesa "+this.Mesa,
			recinto: rec,
			estado: "Enviado",
			candidaturas:votos
		};
		// form.append('file',data.file);
		// form.append('arrayVotacion',JSON.stringify(data.arrayVotacion));

		const data={
			codMesa: this.numberMesa.val(),
			empadronados: this.empadronados.val(),
			horaApertura: this.apertura.getDate(),
			horaCierre: this.cierre.getDate(),
			observaciones:this.obser.val(),
			estado: "Enviado"
		};
		console.log("upload Data: ",data)
		this.$vot.uploadActa(data).subscribe(
			(res)=>{
				console.log(res);
				this.$vot.uploadVotos(formVotos).subscribe(
					(data) => {
						this.mensaje('Se cargo satisfactoriamente','Votaciones',0);
						this.ngWizardService.next();
						console.log(data);
					},
					(error) => {
						this.mensaje('No se cargo satisfactoriamente','Votacion',3);
						console.log(error);	
					}
				);

				this.acta.id=res._id;
				this.ngWizardService.next();
			},
			(error)=>{
				this.mensaje('No pudo cargar Acta','Acta',3);
				console.log()
			}
		);
	}
	checkVotos(){

	}
	uploadActa():void{
		
	}
	_Acta(){
		console.log(".....");
		this.acta.emp=this.empadronados.val();
		this.acta.codigo=this.numberMesa.val();
		this.acta.emp=this.empadronados.val();
		this.acta.apertura=this.apertura.val();
		this.acta.cierre=this.cierre.val();
		this.acta.obser=this.obser.val();
		
		this.migrid.clear();
		let list=[];
		list.push({candidatura:'Presidente ',MAS:0,CC:0,LIBRE21:0,FPV:0,PANBOL:0,ADN:0,CREEMOS:0,blancos:0,nulos:0});
		if(this.info.rec.tipo.length==1)
			list.push({candidatura:this.info.rec.tipo[0],MAS:0,CC:0,LIBRE21:0,FPV:0,PANBOL:0,ADN:0,CREEMOS:0,blancos:0,nulos:0})
		else{
			list.push({candidatura:'Uninominal',MAS:0,CC:0,LIBRE21:0,FPV:0,PANBOL:0,ADN:0,CREEMOS:0,blancos:0,nulos:0})
			list.push({candidatura:'Especial',MAS:0,CC:0,LIBRE21:0,FPV:0,PANBOL:0,ADN:0,CREEMOS:0,blancos:0,nulos:0})
		}
		this.migrid.addrow(null,list);
		// this.uploadActa();
		this.ngWizardService.next();
	}
	uploadFoto(){
		console.log(this.imageChangedEvent.target.files[0]);
		const form = new FormData();
		form.append("file",this.imageChangedEvent.target.files[0]);
		
		// const data={
		// 	"file":this.imageChangedEvent.target.files[0],
		// 	"horaApertura": "2020-09-29T05:08:01.144Z",
		// 	"horaCierre": "2020-09-29T12:08:01.148Z",
		// 	"codMesa": "12345",
		// 	"empadronados": "100",
		// 	"estado": "Enviado",
		// 	"observaciones": "observaciones prueba a pablo Ninja"
		// };
		this.$vot.file(this.acta.id,form).subscribe(
			(res)=>{
				this.mensaje('la imagen del acta se cargó!','Foto',0)
				this.ngWizardService.reset();
				console.log(res);
			},
			(error)=>{
				this.mensaje('No se pudo subir la foto','',3)
				console.log(error);
			}
		)
	}
 
	prueba(){		this.ngWizardService.next();	}
	checkApertura(mesa?:any){
		let aperturado;
		this.info.mesa=mesa;
		
		for (let i = 0; i < this.info.rec.mesas.length; i++) {
			if(this.info.rec.mesas[i].mesa==mesa){
				aperturado=this.info.rec.mesas[i].estado;
				break;
			}
		}
		if(aperturado==="Sin Aperturar"){
			this.modalAperturar.show();
		}
	}
	aperturarAction(){
		const renderdata=this.inDelegado.val().replace(/( )+/g,' ').trim();
		this.$rec.aperturarMesa(this.info.rec._id,{
			estado:"Aperturado",
			delegado:(renderdata.length>0?"true":"false"),
			mesa:this.info.mesa
		}).subscribe(
			(res)=>{
				console.log("aperturado",res);
				this.mensaje('Aperturacion correcta',"Mesa "+this.info.mesa,0);
				this.checkStep(this.info.mesa);
			},
			(error)=>{
			console.log(error);
			}
		)
		this.modalAperturar.hide();
	}
	checkStep(mesa?:any){
		console.log(this.$ev);
		if(this.$ev==undefined || this.$ev.step.index==0){
			this.myValidator.validate();
		}
		else if(this.$ev.step.index==1){
			this.Mesa = mesa;
			this.info.mesa=mesa;
			for (let i = 0; i < this.info.rec.mesas.length; i++) {
				if(this.info.rec.mesas[i].mesa==mesa){
					this.info.mesaHabilitados=this.info.rec.mesas[i].habilitados;
					break;
				}
			}
			console.log(mesa);
			this.resetActa();
			this.ngWizardService.next();
		}
		else if(this.$ev.step.index==2){
			
		}
		else {
			this.ngWizardService.next();

			console.log("ultimo paso");
		}
	}
	archivo:File;
	imagefile:File=null;

	resetAperturar(){
		this.modalAperturar.hide();
		this.inDelegado.val('');
	}
	resetActa(){
		for (let i = 0; i < this.info.rec.mesas.length; i++) {
			if(this.info.rec.mesas[i].mesa==this.Mesa){
				this.info.mesaHabilitados=this.info.rec.mesas[i].habilitados;
				this.empadronados.val(this.info.rec.mesas[i].habilitados);
				break;
			}
		}
		this.numberMesa.val('');
		this.apertura.setDate(new Date());
		this.cierre.setDate(new Date());
		this.archivo= null;
		this.imagefile= null;
		this.croppedImage='';
		this.imageChangedEvent='';
		this.validatorActa.hide();
	}


	rulesRecinto=[
		{ 	input: '.inCir', message: 'Seleccione un Circunscripción', action: 'keyup, blur', 
			rule: (input:any, commit:any):boolean=>{
				return this.dropCir.getSelectedIndex()!=-1;
			}
		},
		{ 	input: '.inProv', message: 'Seleccione una provincia', action: 'keyup, blur', 
				rule: (input:any, commit:any):boolean=>{
					return this.dropProv.getSelectedIndex()!=-1;
				}
		},
		{ 	input: '.inMun', message: 'Seleccione una municipio', action: 'keyup, blur', 
		rule: (input:any, commit:any):boolean=>{
			return this.dropMun.getSelectedIndex()!=-1;
		}
	},
{ 	input: '.inRec', message: 'Seleccione un Recinto', action: 'keyup, blur', 
		rule: (input:any, commit:any):boolean=>{
			return this.dropRec.getSelectedIndex()!=-1;
		}
	}
	];
	rulesActa=[
		{ 	input: '.inMesa', message: 'Codigo mesa requerido!', action: 'keyup, blur', rule: 'required' },
		{ 	input: '.inMesa', message: 'Mínimo de 4 caracteres', action: 'keyup, blur', rule: 'minLength=4' },
		{ 	input: '.inMesa', message: 'Máximo de 255 caracteres', action: 'keyup, blur', rule: 'maxLength=255' },
		{ 	input: '.inEmp', message: 'debe estar entre 1 y 1024', action: 'keyup, blur',
		rule: (input: any, commit: any): boolean => {
			const lat = input.val();
			return lat>=1 && lat<=1024;
		}
	}
	];

	mensaje(content: string, title: string, tipo) {
		const op = {
		  timeout: 3500,
		  titleMaxLength: 22,
		  showProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  position: SnotifyPosition.centerBottom,
		};
		if (tipo == 0) this.$notifier.success(content, title, op);
		if (tipo == 1) this.$notifier.warning(content, title, op);
		if (tipo == 2) this.$notifier.info(content, title, op);
		if (tipo == 3) this.$notifier.error(content, title, op);
	  }


	  
	  onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
		  const event: UploadInput = {
			type: 'uploadAll',
			url: this.url+this.numberMesa.val(),
			method: 'PUT',
			data: { }
		  };
	
		//   this.uploadInput.emit(event);
		} else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
		  this.files.push(output.file);
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
		  const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
		  this.files[index] = output.file;
		} else if (output.type === 'cancelled' || output.type === 'removed') {
		  this.files = this.files.filter((file: UploadFile) => file !== output.file);
		} else if (output.type === 'dragOver') {
		  this.dragOver = true;
		} else if (output.type === 'dragOut') {
		  this.dragOver = false;
		} else if (output.type === 'drop') {
		  this.dragOver = false;
		} else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
			this.mensaje('No se pudo cargar la imagen','Foto',3);
		  console.log(output.file.name + ' rejected');
		}
		else if( output.type==='done'){
			this.mensaje('Imagen de acta cargada correctamente!','Foto',0);
			this.ngWizardService.reset();
			this.generarMesas();
			this.ngWizardService.next();
		}
	
		this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
	  }
	
	  subir(): void {
		const event: UploadInput = {
			type: 'uploadAll',
			url: this.url+this.numberMesa.val(),
			method: 'PUT',
		  data: { }
		};
	
		this.uploadInput.emit(event);
	  }
	
	  cancelUpload(id: string): void {
		this.uploadInput.emit({ type: 'cancel', id: id });
	  }
	  cancelAllUpload(): void {
		this.uploadInput.emit({ type: 'cancelAll' });
	  }
	
	  removeFile(id: string): void {
		this.uploadInput.emit({ type: 'remove', id: id });
	  }
	
	  removeAllFiles(): void {
		this.uploadInput.emit({ type: 'removeAll' });
	  }
}
