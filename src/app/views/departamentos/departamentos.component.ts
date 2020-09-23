import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification'; 
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Departamento } from '../../models/departamento';
import { DepartamentosService } from '../../servicios/departamentos.service';

@Component({
	selector: 'app-departamentos',
	templateUrl: './departamentos.component.html',
	styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
	@ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('jqxListBox', { static: false }) myListBox: jqxListBoxComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('myDropDownList', { static: false }) myDropDownList: jqxDropDownListComponent;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('myDropDownList2', { static: false }) myDropDownList2: jqxDropDownListComponent;
	@ViewChild('myInput', { static: false }) myInput: jqxInputComponent;
	@ViewChild('smallModal') public smallModal: ModalDirective;
	@ViewChild('inputNombre', { static: false }) inputNombre: jqxInputComponent;
	@ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;
	constructor(protected $dep: DepartamentosService,protected $notifier:SnotifyService) { }
	public formDep: FormGroup = new FormGroup({
		name: new FormControl('')
	})
	action_text = '';
	modelDepartamento:{name:'',id:undefined,_id:'',circuns:string[],nameold:''};
	ngOnInit(){
	}
	ngAfterViewInit(): void 
    {
		this.refresh();
		this.createButtons();
	}
	refresh(btn?,flag?){
		this.$dep.all().subscribe(
			(data=>{
				let e='';
				console.log(data[0]);
				for(let i=0;i<data.length;i++){
					e=JSON.stringify(data[i]);
					e = e.substring(e.indexOf("_id")+6, e.indexOf("name")-3 );
					this.migrid.addrow(0,{
						_id: e,
						id:i+1,
						name:data[i].name
					});
				}
				if(flag!=undefined)
					btn.setOptions({disabled:false});
			})
		);

	}
	source2: any[] = 
    [
        {value:'1',label:'C-104'},
        {value:'2',label:'C-40'},
        {value:'3',label:'C-41'},
        {value:'4',label:'C-42'},
        {value:'5',label:'C-43'}
	];
	
	dropDownSource: string[] = ['id','name'];

	source: any =
	{
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
		{datafield:"name",text:"departamento",width:250}
	];
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void 
    {
		this.formDep.setValue({name:event.args.row.name});
    }
		
	
	createButtonsContainers(statusbar: any): void {
        let buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = 'overflow: hidden; position: relative; margin: 5px;';
        let addButtonContainer = document.createElement('div');
        let deleteButtonContainer = document.createElement('div');
        let reloadButtonContainer = document.createElement('div');
        addButtonContainer.id = 'addButton';
        deleteButtonContainer.id = 'deleteButton';
        reloadButtonContainer.id = 'reloadButton';
        addButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        deleteButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        reloadButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        buttonsContainer.appendChild(addButtonContainer);
        buttonsContainer.appendChild(deleteButtonContainer);
        buttonsContainer.appendChild(reloadButtonContainer);
        statusbar[0].appendChild(buttonsContainer);
    }
    createButtons(): void {
        let addButtonOptions = {
            width: 80, height: 25,template:'success', value: '<i class="fa fa-plus"></i>'
        }
        let addButton = jqwidgets.createInstance('#addButton', 'jqxButton', addButtonOptions);
        let deleteButtonOptions = {
            width: 80, height: 25,template:'warning', value: '<i class="fa fa-pencil"></i>'
        }
        let deleteButton = jqwidgets.createInstance('#deleteButton', 'jqxButton', deleteButtonOptions);
        let reloadButtonOptions = {
			width: 80, height: 25,template:'primary', value: '<i class="fa fa-refresh"></i>'
        }
        let reloadButton = jqwidgets.createInstance('#reloadButton', 'jqxButton', reloadButtonOptions);
        let searchButtonOptions = {
			width: 80, height: 25, value: '<i class="fa fa-search"></i>'
        }
        // add new row.
        addButton.addEventHandler('click', (event: any): void => {
			this.action_text="Adicionar";
			this.formDep = new FormGroup({	name: new FormControl('')});
			this.myModal.show();
			
			
            // this.migrid.addrow(null, {});
        });
        // delete selected row.
        deleteButton.addEventHandler('click', (event: any): void => {
			this.action_text="Editar"
			let selectedrowindex = this.migrid.getselectedrowindex();
			if(selectedrowindex==-1){
				// let nt = jqwidgets.createInstance('#notification1','jqxNotification',{theme:'info',autoOpen:true});
				this.mensaje('para Editar seleccione una Fila','Departamento',2);
			}
			else{
			var rowdata = this.migrid.getrowdata(this.migrid.getselectedrowindex());
			this.inputNombre.val(rowdata.name);
			this.myModal.show();
			}
        });
        reloadButton.addEventHandler('click', (event: any): void => {
			this.migrid.clear();
			reloadButton.setOptions({disabled:true});
			this.refresh(reloadButton,0);
        });
    }
    
    clearBtnOnClick(): void {
        this.migrid.clearfilters();
    }
	invalidValidation(){
		this.mensaje('Algunos datos fueron llenados incorrectamente','Formulario',3);
	}
	checkValidation(){
		this.myValidator.validate();
	}
	successValidation(){
		let data= {
			name:this.inputNombre.val()
		}
		if(this.action_text=="Adicionar"){
			this.$dep.save(data).subscribe((response)=>{
				let rowcount	=	this.migrid.getdatainformation().rowscount;
				this.migrid.addrow(rowcount,{
					_id:response._id,
					id:rowcount+1,
					name:response.name
				});
				this.mensaje('Se adiciono satisfactoriamente','Localidad',0);
			});
		}
		else{
			let rowindex	=	this.migrid.getselectedrowindex();
			let rowdata	=	this.migrid.getrowdata(rowindex);
			this.$dep.update(rowdata._id,data).subscribe((response)=>{
				this.migrid.updaterow(rowindex,{
					_id:response._id,
					id:rowdata.id,
					name:response.name
				});
				this.mensaje('Se actualizó satisfactoriamente!','Localidad',0);
			},
			(error)=>{
				this.mensaje('No se pudo Actualizar, recargue o intente de nuevo!','Localidad',3);
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
	reset(){
		this.inputNombre.val('');
		this.myValidator.hide();
	}


	rules=[
		{ 	input: '.inNombre', message: 'Nombre es requerida!', action: 'keyup, blur', rule: 'required' },
		{ 	input: '.inNombre', message: 'Mínimo de caracteres permitidos: 4', action: 'keyup, blur', rule: 'minLength=4' },
		{ 	input: '.inNombre', message: 'Mínimo de caracteres permitidos: 255', action: 'keyup, blur', rule: 'maxLength=255' }
	];
}
