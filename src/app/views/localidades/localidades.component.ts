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
import { LocalidadesService } from '../../servicios/localidades.service';
import { MunicipiosService } from '../../servicios/municipios.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {

  @ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('myDropDownList2', { static: false }) myDropDownList2: jqxDropDownListComponent;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('btnAdd') btnAdd: jqxButtonComponent;
  @ViewChild('btnEdit') btnEdit: jqxButtonComponent;
  @ViewChild('btnReload') btnReload: jqxButtonComponent;
  @ViewChild('inputNombre', { static: false }) inputNombre: jqxInputComponent;
  @ViewChild('myValidator', { static: false }) myValidator: jqxValidatorComponent;
	constructor(protected $loc: LocalidadesService, protected $mun: MunicipiosService,
		protected $notifier: SnotifyService) { }
	public formMun: FormGroup = new FormGroup({
		name: new FormControl('') 
	})
  action_text = '';
  modelMunicipio:{name:'',id:undefined,_id:'',circuns:string[]};
  
	ngOnInit(){	}

	ngAfterViewInit(): void {	this.refresh();	}
  
	refresh(){
		this.$loc.all().subscribe(
			(data=>{
				let list=[];
				for(let i=0;i<data.length;i++)
					list.push({_id:data[i]._id,id:i+1,name:data[i].name});
				this.migrid.addrow(null,list);
				this.btnReload.setOptions({disabled:false});
			})
		);
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
		{datafield:"name",text:"Localidad",width:250}
  ];
  
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void{  }
		
	
	open(_action){

	this.action_text=_action;
      this.$mun.all().subscribe( (data)=>{
        for(let i=0;i<data.length;i++){
          this.myDropDownList2.addItem({value:data[i].name, label:data[i].name});
        }
      })
      if(_action=="Adicionar"){
        this.inputNombre.val('');
        this.myModal.show();
      }
      else{
        let selectedrowindex = this.migrid.getselectedrowindex();
        if(selectedrowindex==-1){
			this.mensaje('Seleccione una fila para editar','',2);
        }
        else{
        let rowdata = this.migrid.getrowdata(this.migrid.getselectedrowindex());
		this.inputNombre.val(rowdata.name);
        this.myModal.show();
        }
      }
    }
    reload (event){
		this.btnReload.setOptions({disabled:true});
		this.migrid.clear();
		this.refresh();
		this.mensaje('Los datos fueron actualizados','Localidades',2);
    }
    
	invalidValidation(){
		this.mensaje('Algunos datos fueron llenados incorrectamente','Formulario',3);
	}
	checkValidation(){
		this.myValidator.validate();
	}
	successValidation(){
		let data={
			name:this.inputNombre.val()
		}
		if(this.action_text=="Adicionar"){
			this.$loc.save(data).subscribe((response)=>{
				console.log(response);
				let rowcount	=	this.migrid.getdatainformation().rowscount;
				this.migrid.addrow(rowcount,{
					_id:response._id,
					id:rowcount+1,
					name:response.name
				});
				this.mensaje('Se adicino satisfactoriamente','Localidad',0);
			},
			(error)=>{
				this.mensaje('No se pudo adicionar','Localidad',3);
				console.log(error);
			});
		}
		else{
			let rowindex	=	this.migrid.getselectedrowindex();
			let rowdata	=	this.migrid.getrowdata(rowindex);
			this.$loc.update(rowdata._id,data).subscribe((response)=>{
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
	reset(){this.inputNombre.val('');}

	rules=[
		{ 	input: '.inNombre', message: 'Nombre es requerida!', action: 'keyup, blur', rule: 'required' },
		{ 	input: '.inNombre', message: 'Mínimo de Caracteres permitidos: 4', action: 'keyup, blur', rule: 'minLength=4' },
		{ 	input: '.inNombre', message: 'Máximo de Caracteres permitidos: 255', action: 'keyup, blur', rule: 'maxLength=25' }
	];

}
