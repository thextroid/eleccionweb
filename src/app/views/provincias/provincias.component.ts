import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Circunscripcion } from '../../models/circunscripcion';
import { CircunscripcionesService } from '../../servicios/circunscripciones.service';
import { ProvinciasService } from '../../servicios/provincias.service';

@Component({
	selector: 'app-provincias',
	templateUrl: './provincias.component.html',
	styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {

	@ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('myDropDownList2', { static: false }) myDropDownList2: jqxDropDownListComponent;
	@ViewChild('dropCir', { static: false }) dropCir: jqxDropDownListComponent;
	@ViewChild('inputNombre') inputNombre: jqxInputComponent;
	@ViewChild('smallModal') public smallModal: ModalDirective;
	@ViewChild('btnAdd') btnAdd: jqxButtonComponent;
	@ViewChild('btnEdit') btnEdit: jqxButtonComponent;
	@ViewChild('btnReload') btnReload: jqxButtonComponent;
	@ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;
	constructor(protected $prov: ProvinciasService,
		protected $notifier: SnotifyService,
		private $cir:CircunscripcionesService) { }
	public formProv: FormGroup = new FormGroup({
		name: new FormControl('') 
	})
	action_text = '';
	modelProvincia:{name:'',id:any,_id:'',circuns:string[]};
	cirs=[];
	ngOnInit(){	}
	
	ngAfterViewInit(): void {	this.refresh();	}
	
	refresh(){
		this.$prov.all().subscribe(
			(data=>{
				let list=[];
				for(let i=0;i<data.length;i++){
					list.push({
						_id: data[i],
						id:i+1,
						name:data[i].name
					});
				}
				this.migrid.addrow(null,list);
				this.btnReload.setOptions({disabled:false});
				this.mensaje('Se recargo las provincias','Actualizacion',2);
			}),
			(error)=>{
				this.mensaje('Error al cargar datos de provincias','Provincia',3);
				console.log(error);
			}
		);
		this.$cir.all().subscribe(
			(data=>{
				let list=[];
				for(let i=0;i<data.length;i++){
					list.push({
						value: data[i],
						label:data[i].name
					});
				}
				this.dropCir.source(list);
				this.cirs=data;
			}),
			(error)=>{
				console.log(error);
			}
		);

	}
	
	dropDownSource: string[] = ['id','name'];
	source2: any[] = 
	[
		{value:'1',label:'C-104'},
		{value:'2',label:'C-40'},
		{value:'3',label:'C-41'},
		{value:'4',label:'C-42'},
		{value:'5',label:'C-43'}
	];
	source: any =	{
		localdata:[],
		datafields: [
			{
				name: '_id',
				map: '_id'
			}, 
			{
				name: 'id',
				map: 'id'
			}, 
			{
				name: 'name',
				map: 'name',
				type:'string'
			}
		],
		datatype: 'array',
		root: 'Rows',
		beforeprocessing: (data: any) => {
			this.source.totalrecords = data.TotalRows;
		}
	};

	dataAdapter:any = new jqx.dataAdapter(this.source);

	columns : any[]=[
		{datafield:"_id",text:"ID",width:30,hidden:true},
		{datafield:"id",text:"#",width:30},
		{datafield:"name",text:"Provincia",width:250}
	];
	
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void{
	}
		
	
	open(_action){

		this.action_text=_action;
		if(_action=="Adicionar"){
			this.inputNombre.value('');
			this.myModal.show();
		}
		else{
			let selectedrowindex = this.migrid.getselectedrowindex();
			if(selectedrowindex==-1){
				this.mensaje('Seleccione una provincia','',2);
			}
			else{
				let rowdata = this.migrid.getrowdata(this.migrid.getselectedrowindex());
				this.inputNombre.value(rowdata._id.name);
				for (let i = 0; i < rowdata._id.circunscripcions.length; i++) {
					const a=rowdata._id.circunscripcions[i];
					this.cirs=this.dropCir.getItems();
					for (let j = 0; j < this.cirs.length; j++) {
						const b=this.cirs[j];
						if(a._id==b.value._id){
							this.dropCir.checkIndex(j);
							break;
						}
					}
					
				}
				this.myModal.show();
			}
		}
	}
	reload (event){
		this.btnReload.setOptions({disabled:true});
		this.migrid.clear();
		this.refresh();
		// this.mensaje('Datos Actualizados!','Provincias',2);
	}
	invalidValidation(){
		this.mensaje('Algunos datos fueron llenados incorrectamente','Formulario',3);
	}
	checkValidation(){
		this.myValidator.validateInput('.inCir');
		this.myValidator.validate();
	}
	successValidation(){
		this.cirs=this.dropCir.getCheckedItems().map( (arg:any)=> arg.value._id );
		let data = {name:this.inputNombre.val(),circunscripcions:this.cirs};
		if(this.action_text=="Adicionar"){
			this.$prov.save(data).subscribe((response)=>{
				let rowtotal= this.migrid.getdatainformation().rowscount;
				this.migrid.addrow(rowtotal,{
					_id:response,
					id:rowtotal+1,
					name:response.name
				});
				this.mensaje('Se adicionó satisfactoriamente!','Provincia',0);
			},(error)=>{
				this.mensaje('no se pudo adicionar!','Provincia',3);
				console.log(error);
			});
		}
		else{
			let rowindex = this.migrid.getselectedrowindex();
			let rowdata = this.migrid.getrowdata(rowindex);		
			this.$prov.update(rowdata._id._id,data).subscribe((response)=>{
				this.migrid.updaterow(rowindex,{
					_id:response,
					id:rowdata.id,
					name:response.name
				});
				this.mensaje('Se actualizó satisfactoriamente!','Provincia',0);
			},
			(error)=>{
				this.mensaje('No se pudo actualizar!','Provincia',3);
				console.log(error);
			});
		}
		this.myModal.hide();
	}
	reset(){
		this.inputNombre.value('');
		this.dropCir.uncheckAll();
		this.myValidator.hideHint('.inCir');
		this.myValidator.hide();
	}

	mensaje(content:string,title:string,tipo){
		var op={
			timeout: 2000,
			titleMaxLength:22,
			showProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			position:SnotifyPosition.rightTop
		};
		if(tipo==0)
		this.$notifier.success(content,title, op);
		if(tipo==1)
		this.$notifier.warning(content,title, op);
		if(tipo==2)
		this.$notifier.info(content,title, op);
		if(tipo==3)
		this.$notifier.error(content,title, op);
	}

	rules=[
		{ 	input: '.inNombre', message: 'Nombre es requerido!', action: 'keyup, blur', rule: 'required' },
		{ 	input: '.inNombre', message: 'Mínimo de caracteres permitidos: 4', action: 'keyup, blur', rule: 'minLength=4' },
		{ 	input: '.inNombre', message: 'Máximo de caracteres permitidos: 255', action: 'keyup, blur', rule: 'maxLength=255' },
		{ 	input: '.inCir', message: 'Debe Seleccionar al menos una circunscripcion', action: '', 
			rule: (input:any, commit:any):boolean=>{
				return this.dropCir.getCheckedItems().length>0;
		   }  
		}
	];
}
