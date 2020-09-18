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
import { Recinto } from '../../models/recinto';
import { ThemeModule } from '../theme/theme.module';

@Component({
	selector: 'app-recintos',
	templateUrl: './recintos.component.html',
	styleUrls: ['./recintos.component.css']
})
export class RecintosComponent implements OnInit {

	@ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('dropdownLocalidad', { static: false }) dropdownLocalidad: jqxDropDownListComponent;
	@ViewChild('dropdownMunicipio', { static: false }) dropdownMunicipio: jqxDropDownListComponent;
	@ViewChild('dropdownTipo', { static: false }) dropdownTipo: jqxDropDownListComponent;
	@ViewChild('smallModal') public smallModal: ModalDirective;
	@ViewChild('btnAdd') btnAdd: jqxButtonComponent;
	@ViewChild('btnEdit') btnEdit: jqxButtonComponent;
	@ViewChild('btnReload') btnReload: jqxButtonComponent;
	constructor(protected $rec: RecintosService,protected $mun: MunicipiosService,protected $local: LocalidadesService) { }
	formRec: FormGroup = new FormGroup({
		institucion: new FormControl('') 
	})
	
	action_text = '';
	modelRecinto:Recinto= new Recinto();
	
	ngOnInit(){	}
	
	ngAfterViewInit(): void {	this.refresh();	}
	lista:any[];
	refresh(){
		this.$rec.all().subscribe(
			(data=>{
				let e='',temp=[];
				console.log(data);
				this.lista=data;
				for(let i=0;i<data.length;i++){
					e=JSON.stringify(data[i]);
					e = e.substring(e.indexOf("_id")+6, e.indexOf("institucion")-3 );
					
					temp.push({
						_id: e,
						id:i+1,
						institucion:data[i].institucion,
						tipo:data[i].tipo
						// tipo:data[i].tipo.length>1?data[i].tipo[0]+data[i].tipo[1]:data[i].tipo[0]
					});
				}
				this.migrid.addrow(null,temp);
				this.btnReload.setOptions({disabled:false});
			})
		);
	}
	
	dropDownSource: string[] = ['id','institucion'];
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
		{datafield:"_id",text:"ID",width:30,hidden:true},
		{datafield:"id",text:"#",width:30},
		{datafield:"institucion",text:"Institucion",width:250},
		{datafield:"tipo",text:"Tipo",width:250}
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

		this.$mun.all().subscribe( (data)=>{
			let temp=[];
			for(let i=0;i<data.length;i++)
				temp.push(data[i].name);
			this.dropdownMunicipio.source(temp);
		})
		this.$local.all().subscribe( (data)=>{
			let temp=[];
			for(let i=0;i<data.length;i++)
				temp.push(data[i].name);
			this.dropdownLocalidad.source(temp);
		})	
		if(_action=="Adicionar"){
			this.action_text=_action;
			this.formRec = new FormGroup({	institucion: new FormControl('')});
			this.myModal.show();
		}
		else{
			this.action_text=_action;
			let selectedrowindex = this.migrid.getselectedrowindex();
			if(selectedrowindex==-1){
				// let nt = jqwidgets.createInstance('#notification1','jqxNotification',{theme:'info',autoOpen:true});
				this.minoti.open();
			}
			else{
			this.modelRecinto = this.migrid.getrowdata(this.migrid.getselectedrowindex());
			
			console.log(this.modelRecinto);
			for (let index = 0; index < this.modelRecinto.tipo.length; index++) {
				if(this.modelRecinto.tipo[index]=='Uninominal')
					this.dropdownTipo.checkIndex(0);
					else
					this.dropdownTipo.checkIndex(1);
			}
			this.formRec.setValue({institucion:this.modelRecinto.institucion});
			this.myModal.show();
			let rowscount = this.migrid.getdatainformation().rowscount;
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
		if(this.action_text=="Adicionar"){
			let items= this.dropdownTipo.getCheckedItems();
			this.modelRecinto.institucion=form.value.institucion;
			this.modelRecinto.tipo=[];
			if(items.length>0)
				this.modelRecinto.tipo.push(items[0].value);
			if(items.length>1)
				this.modelRecinto.tipo.push(items[1].value);

			this.$rec.save(this.modelRecinto).subscribe((response)=>{
				console.log(response);
			});
		}
		else{
			this.modelRecinto.institucion=form.value.institucion;
			let data={institucion:'',id:undefined,tipo:[]};
			data.institucion=this.modelRecinto.institucion;
			data.id=this.modelRecinto._id;
			data.tipo=[];
			// this.modelRecinto.circuns = this.myDropDownList2.getCheckedItems();
			let items = this.dropdownTipo.getCheckedItems();
			if(items.length>0)
				data.tipo.push(items[0].value);
			if(items.length>1)
				data.tipo.push(items[1].value);
			console.log(data);
			this.$rec.update(data).subscribe((response)=>{
				console.log(response);
			},
			(error)=>{
				console.log(error);
			});
			this.formRec.value.institucion='';
		}
		this.myModal.hide();
	}
	hideModal(){
		this.modelRecinto=new Recinto();
		this.dropdownTipo.uncheckAll();
		this.dropdownMunicipio.clearSelection();
		this.dropdownLocalidad.clearSelection();
	}	
}
