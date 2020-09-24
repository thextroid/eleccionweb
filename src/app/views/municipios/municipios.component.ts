import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Provincia } from '../../models/provincia';
import { MunicipiosService } from '../../servicios/municipios.service';
import { ProvinciasService } from '../../servicios/provincias.service';

@Component({
	selector: 'app-municipios',
	templateUrl: './municipios.component.html',
	styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

	@ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('myDropDownList2', { static: false }) dropProv: jqxDropDownListComponent;
	@ViewChild('inputMunicipio', { static: false }) inputMun: jqxInputComponent;
	@ViewChild('smallModal') public smallModal: ModalDirective;
	@ViewChild('btnAdd') btnAdd: jqxButtonComponent;
	@ViewChild('btnEdit') btnEdit: jqxButtonComponent;
	@ViewChild('btnReload') btnReload: jqxButtonComponent;
	@ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;

	constructor(protected $mun: MunicipiosService,protected $prov: ProvinciasService,
				protected $notifier: SnotifyService) { }
	public formMun: FormGroup = new FormGroup({
		name: new FormControl('') 
	})
	action_text = '';
	modelMunicipio:{name:'',id:undefined,_id:'',provincia:string};
	
	ngOnInit(){	}
	
	ngAfterViewInit(): void {	this.refresh();	}
	
	refresh(){
		this.$mun.all().subscribe(
			(data=>{
				let e='',list=[];
				for(let i=0;i<data.length;i++){
					list.push({
						_id: data[i]._id,
						id:i+1,
						name:data[i].name,
						provincia:('provincia' in data[i])?data[i].provincia:new Provincia()
					});
				}
				this.migrid.addrow(null,list);
				this.btnReload.setOptions({disabled:false});
			})
		);
		this.$prov.all().subscribe( (data)=>{
			var e=[];
			for(let i=0;i<data.length;i++)
				e.push({value:data[i]._id, label:data[i].name});
			this.dropProv.source(e);
		})

	}
	
	dropDownSource: string[] = ['id','name'];
	source2: any[];
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
				name: 'provincia',
				map: 'provincia',
				type:'json'
			}
		],
		datatype: 'array',
		root: 'Rows',
		beforeprocessing: (data: any) => {
			this.source.totalrecords = data.TotalRows;
		}
	};

	dataAdapter:any = new jqx.dataAdapter(this.source);
	@ViewChild('') div: ElementRef; 
	columns : any[]=[
		{datafield:"_id",text:"ID",width:30,hidden:true},
		{datafield:"id",text:"#",width:30},
		{datafield:"name",text:"Municipio",width:250
		},
		{datafield:"provincia",text:"Provincia",width:100,
			cellsrenderer:function(row,column,value,defaultHtml){
				
				if('name' in value){
					return '<div class="jqx-grid-cell-left-align" style="color:#009688;margin-top: 8px;"><i class="fa fa-lg fa-battery-full"></i></div>';
					
				}
				else
					return '<div class="jqx-grid-cell-left-align" style="color:#95a7a5;margin-top: 8px;"><i class="fa fa-lg fa-battery-1"></i></div>';
			}
		}
	];
	
	rendergridrows = (params: any): any =>{
		
		return params.data;
	}
	
	Rowselect(event: any): void{
	}
		
	
	open(_action){
		this.action_text=_action;
		
		if(_action=="Adicionar"){
			this.myModal.show();
		}
		else{
				let selectedrowindex = this.migrid.getselectedrowindex();
				if(selectedrowindex==-1){
					this.mensaje('Seleccione una fila','',2);
				}
				else{
					var data = this.migrid.getrowdata(this.migrid.getselectedrowindex());
					this.inputMun.val(data.name);
					if('provincia' in data){

						var items = this.dropProv.getItems();
						for (let i = 0; i < items.length; i++) {
							if(items[i].value==data.provincia._id){
								this.dropProv.selectedIndex(i);
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
		this.mensaje('Datos actualizados','Municipios',2);
	}
	reset(){
		this.dropProv.clearSelection();
		this.inputMun.val('');
		this.myValidator.hide();
		this.myValidator.hideHint('inProv');
	}
	invalidValidation(){
		this.mensaje('Algunos datos fueron llenados incorrectamente','Formulario',3);
	}
	checkValidation(){
		this.myValidator.validate();
		this.myValidator.validateInput('inProv');
	}
	successValidation(){
		let data	=	{
			name:this.inputMun.val(),
			provinciaId:this.dropProv.getSelectedItem().value
		}
		if(this.action_text=="Adicionar"){
			var rowindex = this.migrid.getselectedrowindex();
			var rowdata = this.migrid.getrowdata(rowindex);
			var rowTotal	=	this.migrid.getdatainformation().rowscount;
			this.$mun.save(data).subscribe((response)=>{
				this.mensaje('Se adicionó satisfactoriamente','Municipio',0);
				this.migrid.addrow(rowTotal,
					{
						_id:response._id,
						id:rowTotal+1,
						name:response.name,
						provincia:response.provincia
					});
			},
			(error)=>{
				this.mensaje('No se pudo adicionar!','Municipio',3);
				console.log(error);
			});
		}
		else{
			var rowindex = this.migrid.getselectedrowindex();
			var rowdata = this.migrid.getrowdata(rowindex);
			this.$mun.update(rowdata._id,data).subscribe((response)=>{
				this.migrid.updaterow(rowindex,
					{
						_id:response._id,
						id:rowdata.id,
						name:response.name,
						provincia:response.provincia
					});
					this.mensaje('Se actualizó satisfactoriamente','Municipio',0);
			},
			(error)=>{
				this.mensaje('No se pudo actualizar','Error',3);
				console.log(error);
			});
		}
		this.myModal.hide();
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
	prueba(){
		this.myValidator.validateInput('.inProv');
	}
	rules=[
		{ 	input: '.inNombre', message: 'Nombre es requerida!', action: 'keyup, blur', rule: 'required' },
		{ 	input: '.inNombre', message: 'Mínimo de Carateres permitidos: 4', action: 'keyup, blur', rule: 'minLength=4' },
		{ 	input: '.inNombre', message: 'Máximo de Carateres permitidos: 255', action: 'keyup, blur', rule: 'maxLength=255' },
		{ 	input: '.inProv', message: 'Seleccione una Provincia', action: '', 
			rule: (input:any, commit:any):boolean=>{
				return this.dropProv.getSelectedIndex()!=-1;
		   }  
		}
	];

}
