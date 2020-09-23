import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CircunscripcionesService } from '../../servicios/circunscripciones.service';
import { ProvinciasService } from '../../servicios/provincias.service';
import * as _ from 'lodash';
import { DepartamentosService } from '../../servicios/departamentos.service';
import { $ } from 'protractor';
import {  SnotifyPosition, SnotifyService, SnotifyStyle, SnotifyToast } from 'ng-snotify';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
@Component({
  selector: 'app-circunscripciones',
  templateUrl: './circunscripciones.component.html',
  styleUrls: ['./circunscripciones.component.css']
})
export class CircunscripcionesComponent implements OnInit {

  @ViewChild("migrid") migrid: jqxGridComponent;
  @ViewChild("gridProv") gridProv: jqxGridComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('myDropDownList2', { static: false }) dropProv: jqxDropDownListComponent;
	@ViewChild('inputNombre', { static: false }) inputNombre: jqxInputComponent;
	@ViewChild('dropDep', { static: false }) dropDep: jqxDropDownListComponent;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('btnAdd') btnAdd: jqxButtonComponent;
  @ViewChild('btnEdit') btnEdit: jqxButtonComponent;
  @ViewChild('btnReload') btnReload: jqxButtonComponent;
  @ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;
  
	constructor(protected $prov: ProvinciasService, protected $cir: CircunscripcionesService,
		protected $dep:DepartamentosService,protected $notifier:SnotifyService) { }
	public formCir: FormGroup = new FormGroup({
		name: new FormControl('') 
	})

  action_text = '';
  modelCircunscripcion:{name:string,id:undefined,_id:string,provincias:string[],departamentoId:string};
  ngOnInit(){	
	}
  
	
  ngAfterViewInit(): void {	
		this.$dep.all().subscribe((data)=>{
			var keymap = {
				_id:'value',
				name:'label'
			};
			this.dropDep.source(data.map(function(obj){
				return _.mapKeys(obj,function(value,key){
					return keymap[key];
				})
			}));
		})
		this.refresh(); this.refreshProvincias();	
	}
  
	refresh(){
		this.$cir.all().subscribe(
			(data=>{
				let list=[];
				for(let i=0;i<data.length;i++){
					list.push({_id:data[i]._id,id:i+1,name:data[i].name,provincias:_.map(data[i].provincias,'_id')});
				}
				this.migrid.addrow(null,list);
				this.btnReload.setOptions({disabled:false});
				this.mensaje('','Se actualizo los datos!',2);
			})
		);			
	}
	
	refreshProvincias(){
		this.$prov.all().subscribe( (data)=>{
			var keymap={
				_id:'iid',
				name:'name',
				circunscripcions:'circunscripcions'
			}
			var temp=	data.map( function(obj){
				return _.mapKeys(obj,function(value,key){
					return keymap[key];
				});
			})
			let list=[];
			console.log(temp);
			for(let i=0;i<temp.length;i++){
				list.push({value:temp[i].iid,label:temp[i].name});
			}
			this.dropProv.source(list);
		})
	}
	dropDownSource: string[] = ['id','name'];
	sourceDep: any[];
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
			}, 
			{
				name: 'provincias',
				map: 'provincias',
				type:'array'
			}, 
			{
				name: 'accion',
				map: 'accion',
				type:'string'
			}
		],
		beforeprocessing: (data: any) => {
			this.source.totalrecords = data.TotalRows;
		}
	};
	sourceProv: any =	{
		datafields: [{name: 'name'}	],
		beforeprocessing: (data: any) => {
			this.sourceProv.totalrecords = data.TotalRows;
		}
	};

	dataAdapter:any = new jqx.dataAdapter(this.source);
	dataAdapterProv:any = new jqx.dataAdapter(this.sourceProv);
	columns2 : any[]=[
		{datafield:"name",text:"Provincia"}
	]
	columns : any[]=[
		{datafield:"_id",text:"ID",width:30,hidden:true},
		{datafield:"id",text:"#",width:30},
		{datafield:"name",text:"Circunscripcion",width:250},
		{datafield:"provincias",hidden:true},
		{datafield:"accion",text:"Ver",width:120,columntype:'button',
			cellsrenderer:():string=>{
				return "Ver Provincias";
			},
			buttonclick:(row:number):void=>{
				this.gridProv.clear();
				var temp=this.migrid.getrowdata(row).provincias,list=[];
				console.log(temp);
				for (let i = 0; i < temp.length; i++){
					list.push({name:this.dropProv.getItemByValue(temp[i]).label});
				}
				this.gridProv.addrow(null,list);
			}
		}
  ];
  
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void{
		console.log(event);
  }
	open(_action){
		this.inputNombre.value('');
		this.action_text=_action;
		if(_action=="Adicionar"){
			this.myModal.show();
		}
		else{
			let selectedrowindex = this.migrid.getselectedrowindex();
			if(selectedrowindex==-1){
				// let nt = jqwidgets.createInstance('#notification1','jqxNotification',{theme:'info',autoOpen:true});
				this.mensaje('','Seleccione una fila',2);
			}
			else{
				let data=this.migrid.getrowdata(this.migrid.getselectedrowindex());
				this.$cir.get(data._id).subscribe((res)=>{
					var departs = (this.dropDep.getItems());
					for(let i=0;res.departamento!=null && i<departs.length;i++)
						if(departs[i].value==res.departamento._id){
							this.dropDep.selectIndex(i);
							break;
						}
					console.log('provincias en cache: ',res.provincias);
					for(let i=0;i<res.provincias.length;i++)
						this.dropProv.checkItem(res.provincias[i]._id);
					// this.modelCircunscripcion._id=res._id;
					this.inputNombre.value(res.name);
					this.myModal.show();
				});
			}
		}
	}

	reload (event){
		
		this.btnReload.setOptions({disabled:true});
		this.migrid.clear();
		this.refresh();
	}

	invalidValidation(){
		this.mensaje('Algunos datos fueron llenados incorrectamente','Formulario',3);
	}
	checkValidation(){
		this.myValidator.validate();
	}
	successValidation(){
		let inName	=	this.inputNombre.val();
		let inDep		=	this.dropDep.getSelectedItem().value;
		let inProvs	=	_.map(this.dropProv.getCheckedItems(),'value');
		let data = {	name:inName, departamentoId:inDep, provincias:inProvs		};
		if(this.action_text=="Adicionar"){
			this.$cir.save(data).subscribe((response)=>{
				this.mensaje("Adicionar","Se adiciono correctamente la circunscripcion!",0)
			},(error)=>{
				this.mensaje("Error","No se pudo adicionar!",3)
			});
		}
		else{
			let rowindex = this.migrid.getselectedrowindex();
			let row = this.migrid.getrowdata(rowindex);
			
			console.log(this.modelCircunscripcion);
			this.$cir.update(row._id,data).subscribe((response)=>{
				console.log(response);
				this.migrid.updaterow(
					rowindex,{
						iid:response._id,
						id:row.id,
						name:response.name,
						provincias:response.provincias
					}
				);
				this.mensaje("Actualización","Se actualizo satisfactoriamente!",0)
			},
			(error)=>{
				this.mensaje("Actualización","Se actualizo satisfactoriamente!",3)
			});
		}
		this.myModal.hide();
	}
	resetForm(){
		this.inputNombre.value('');
		this.dropDep.clearSelection();
		this.dropProv.uncheckAll()
	}
	mensaje(content:string,title:string,tipo){
		var op={
			timeout: 2000,
			titleMaxLength:22,
			showProgressBar: false,
			closeOnClick: true,
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
		{ 	input: '.', message: 'Nombre es requerida!', action: 'keyup, blur', rule: 'required' }
	];
}
