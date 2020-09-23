import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RecintosService } from '../../servicios/recintos.service';
import { MunicipiosService } from '../../servicios/municipios.service';
import { LocalidadesService } from '../../servicios/localidades.service';
import { Recinto } from '../../models/Recinto';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { SnotifyComponent, SnotifyPosition, SnotifyService } from 'ng-snotify';
import { Municipio } from '../../models/municipio';
import { Localidad } from '../../models/localidad';

@Component({
	selector: 'app-recintos',
	templateUrl: './recintos.component.html',
	styleUrls: ['./recintos.component.css']
})
export class RecintosComponent implements OnInit {

	@ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('myModal')  myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('dropdownLocalidad', { static: false }) dropdownLocalidad: jqxDropDownListComponent;
	@ViewChild('dropdownMunicipio', { static: false }) dropdownMunicipio: jqxDropDownListComponent;
	@ViewChild('dropdownTipo', { static: false }) dropdownTipo: jqxDropDownListComponent;
	@ViewChild('btnAdd') btnAdd: jqxButtonComponent;
	@ViewChild('btnEdit') btnEdit: jqxButtonComponent;
	@ViewChild('btnReload') btnReload: jqxButtonComponent;
	@ViewChild('inputMesa', { static: false }) inputMesa: jqxNumberInputComponent;
	@ViewChild('inputRecinto', { static: false }) inputRecinto: jqxInputComponent;
	@ViewChild('inputLong', { static: false }) inputLong: jqxInputComponent;
	@ViewChild('inputLat', { static: false }) inputLat: jqxInputComponent;
	@ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;
	constructor(protected $rec: RecintosService,protected $mun: MunicipiosService,
		protected $local: LocalidadesService,protected $notifier: SnotifyService) { }
	formRec: FormGroup = new FormGroup({
		institucion: new FormControl('') 
	})
	
	action_text = '';
	modelRecinto:Recinto= new Recinto();
	
	ngOnInit(){ 	}
	
	ngAfterViewInit(): void {	this.refresh();	}
	lista:any[];
	refresh(){
		this.$rec.all().subscribe(
			(data=>{
				let temp=[];
				console.log(data);
				this.lista=data;
				for(let i=0;i<data.length;i++){
					
					temp.push({
						_id: data[i]._id,
						id:i+1,
						institucion:data[i].institucion,
						municipio:('municipio' in data[i])?data[i].municipio.name:'',
						localidad:('localidad' in data[i])?data[i].localidad.name:'',
						recinto:data[i],
						tipo:data[i].tipo
					});
				}
				this.migrid.addrow(null,temp);
				this.btnReload.setOptions({disabled:false});
			})
		);
		this.$mun.all().subscribe( (data)=>{
			let temp=[];
			for(let i=0;i<data.length;i++)
				temp.push({value:data[i]._id,label:data[i].name});
			this.dropdownMunicipio.source(temp);
		})
		this.$local.all().subscribe( (data)=>{
			let temp=[];
			for(let i=0;i<data.length;i++)
				temp.push({value:data[i]._id,label:data[i].name});
			this.dropdownLocalidad.source(temp);
		})
	}
	
	sourceMunicipios: any = {
        datatype: 'json',
        datafields: [
            { name: 'name' },
            { name: '_id' }
        ],
        id: 'id',
        url: 'http://192.81.217.7/api/municipios'
    };
    dataAdapterMun: any = new jqx.dataAdapter(this.sourceMunicipios);
	sourceLocalidades: any[];
	sourceTipo: any[]=[
		'Uninominal',
		'Especial'
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
				name: 'institucion',
				map: 'institucion',
				type:'string'
			},
			{
				name: 'municipio',
				map: 'municipio',
				type:'string'
			},
			{
				name: 'localidad',
				map: 'localidad',
				type:'string'
			},
			{
				name: 'recinto',
				map: 'recinto',
				type:'json'
			},
			{
				name: 'tipo',
				map: 'tipo',
				type:'array'
			}
		],
		datatype: 'array',
		root: 'Rows',
		beforeprocessing: (data: any) => {
			console.log(this.source.localdata);
			this.source.totalrecords = data.TotalRows;
		}
	};

	dataAdapter:any = new jqx.dataAdapter(this.source);

	columns : any[]=[
		{datafield:"_id",text:"ID",hidden:true},
		{datafield:"id",text:"#",width:40},
		{datafield:"institucion",text:"Institucion",width:250},
		{datafield:"municipio",text:"Municipio",width:120},
		{datafield:"localidad",text:"Localidad",width:120,},
		{datafield:"recinto",text:"InfoJson",hidden:true},
		{datafield:"tipo",text:"Tipo",width:150}
	];
	
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void{
		this.formRec.setValue({institucion:event.args.row.institucion});
		console.log(this.formRec.get("institucion"));
		console.log(event.args.row);
	}
	
	open(_action){
		this.action_text=_action;
		if(_action=="Adicionar"){
			this.inputRecinto.value("");
			this.myModal.show();
		}
		else{
			let selectedrowindex = this.migrid.getselectedrowindex();
			console.log(selectedrowindex);
			if(selectedrowindex==-1){
				// let nt = jqwidgets.createInstance('#notification1','jqxNotification',{theme:'info',autoOpen:true});
				this.mensaje('Seleccione una fila para editar','',1);
			}
			else{
				let rowdata= this.migrid.getrowdata(selectedrowindex) ;
				let items = this.dropdownMunicipio.getItems();
				
				console.log(items);
				if( 'localizacion' in rowdata.recinto){
					this.inputLat.value(rowdata.recinto.localizacion[0]);
					this.inputLong.value(rowdata.recinto.localizacion[1]);
				}

				if( 'numeroMesas' in rowdata.recinto)
					this.inputMesa.value(rowdata.recinto.numeroMesas);
				if( 'municipio' in rowdata.recinto){
					for (let j = 0; j < items.length; j++) {
						if( items[j].value == rowdata.recinto.municipio._id )
							this.dropdownMunicipio.selectedIndex(j);
					}
				}
				items = this.dropdownLocalidad.getItems();
				// console.log(items);
				if( 'localidad' in rowdata.recinto ){
					for (let j = 0; j < items.length; j++) {
						if(items[j].value==rowdata.recinto.localidad._id)
							this.dropdownLocalidad.selectedIndex(j);
					}
				}
				this.inputRecinto.value(rowdata.institucion);
				for (let index = 0; index < rowdata.tipo.length; index++)
					this.dropdownTipo.checkIndex(rowdata.tipo[index]=='Uninominal'?0:1);
				console.log(rowdata);
				this.myModal.show();
			}
		}
	}
	
	reload (event){
		console.log(event);
		this.btnReload.setOptions({disabled:true});
		this.migrid.clear();
		this.refresh();
	} 
	save(form: FormGroup){
		let valLong = 	this.inputLong.val();
		let valLat	= 	this.inputLat.val();
		let valInst = 	this.inputRecinto.value();
		let valMesa = 	this.inputMesa.val();
		let idMun 	= 	this.dropdownMunicipio.getSelectedItem().value;
		let idLoc 	= 	this.dropdownLocalidad.getSelectedItem().value;
		let idstipo = 	this.dropdownTipo.getCheckedItems();
		this.modelRecinto.tipo=[];
		if(idstipo.length>0)
			this.modelRecinto.tipo.push(idstipo[0].value);
		if(idstipo.length>1)
			this.modelRecinto.tipo.push(idstipo[1].value);
		let data = 
		{
			institucion :valInst,
			numeroMesas:valMesa,
			municipioId:idMun,
			localidadId:idLoc,
			localizacion:[valLat,valLong],
			tipo:this.modelRecinto.tipo
		};
		console.log(data)
		if(this.action_text=="Adicionar"){
			this.$rec.save(data).subscribe((response)=>{
				var rowcount=parseInt(this.migrid.getdatainformation().rowscount);
				this.migrid.addrow(rowcount,{
					_id:response._id,
					id:rowcount+1,
					institucion:response.institucion,
					tipo:response.tipo,
					municipio:response.municipio.name,
					localidad:response.localidad.name,
					recinto:response
				});
				this.mensaje('Se adicionó satisfactoriamente','Recinto',0);
				console.log(response);
			},
			(error)=>{
				this.mensaje('No se pudo adicionar!','Recinto',1);
				console.log(error);
			});
		}
		else{
			let id=this.migrid.getselectedrowindex();
			this.$rec.update(this.migrid.getrowdata(id)._id,data).subscribe((response)=>{
				this.migrid.updaterow(id,{
					_id:response._id,
					id:id,
					institucion:response.institucion,
					tipo:response.tipo,
					municipio:response.municipio.name,
					localidad:response.localidad.name,
					recinto:response})
				this.mensaje('Se actualizo satisfactoriamente','Recinto',0);
			},
			(error)=>{
				this.mensaje('No se pudo actualizar!','Recinto',1);
				console.log(error);
			});
		}
		this.myModal.hide();
	}
	reset(){
		
		this.inputLong.val(0);
		this.inputLat.val(0);
		this.inputRecinto.val('');
		this.inputMesa.val(1);
		this.dropdownTipo.uncheckAll();
		this.dropdownMunicipio.clearSelection();
		this.dropdownMunicipio.clearFilter();
		this.dropdownLocalidad.clearSelection();
		this.dropdownLocalidad.clearFilter();
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
		{ input: '.inInstitucion', message: 'Institucipon es requerida!', action: 'keyup, blur', rule: 'required' },
		{ input: '.inInstitucion', message: '3 caracteres como mínimo!', action: 'keyup, blur', rule: 'minLength=3' }
	]
}
