import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification'; 
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
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
	constructor(protected $dep: DepartamentosService) { }
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
					e = e.substring(e.indexOf("_id")+7, e.indexOf("name")-3 );
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
			console.log(this.source.localdata);
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
		console.log(this.formDep.get("name"));
        console.log(event.args.row);
    }
		
	
	createButtonsContainers(statusbar: any): void {
        let buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = 'overflow: hidden; position: relative; margin: 5px;';
        let addButtonContainer = document.createElement('div');
        let deleteButtonContainer = document.createElement('div');
        let reloadButtonContainer = document.createElement('div');
        let searchButtonContainer = document.createElement('div');
        addButtonContainer.id = 'addButton';
        deleteButtonContainer.id = 'deleteButton';
        reloadButtonContainer.id = 'reloadButton';
        searchButtonContainer.id = 'searchButton';
        addButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        deleteButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        reloadButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        searchButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
        buttonsContainer.appendChild(addButtonContainer);
        buttonsContainer.appendChild(deleteButtonContainer);
        buttonsContainer.appendChild(reloadButtonContainer);
        buttonsContainer.appendChild(searchButtonContainer);
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
        let searchButton = jqwidgets.createInstance('#searchButton', 'jqxButton', searchButtonOptions);
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
				this.minoti.open();
			}
			else{
			this.modelDepartamento = this.migrid.getrowdata(this.migrid.getselectedrowindex());
			this.modelDepartamento.nameold = this.modelDepartamento.name;
			// console.log(this.migrid.getrowdata(this.migrid.getselectedrowindex()));
			this.formDep.setValue({name:this.modelDepartamento.name});
			this.myModal.show();
            let rowscount = this.migrid.getdatainformation().rowscount;
				
			}
            // let id = this.migrid.getrowid(selectedrowindex);
            // this.migrid.deleterow(id);
        });
        // reload grid data.
        reloadButton.addEventHandler('click', (event: any): void => {
			this.migrid.clear();
			reloadButton.setOptions({disabled:true});
			this.refresh(reloadButton,0);
        });
        // search for a record.
        searchButton.addEventHandler('click', (event: any): void => {
            this.smallModal.show();
        });
    }
    findBtnOnClick(): void {
        this.migrid.clearfilters();
        let searchColumnIndex = this.myDropDownList.selectedIndex();
        let datafield = '';
        switch (searchColumnIndex) {
            case 0:
                datafield = 'id';
                break;
            case 1:
                datafield = 'name';
                break;
        }
        let searchText = this.myInput.val();
        let filtergroup = new jqx.filter();
        let filter_or_operator = 1;
        let filtervalue = searchText;
        let filtercondition = 'contains';
        let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter);
        this.migrid.addfilter(datafield, filtergroup);
        // apply the filters.
		this.migrid.applyfilters();
		this.smallModal.hide();
    }
    clearBtnOnClick(): void {
        this.migrid.clearfilters();
    }
	save(form: FormGroup){
		console.log(form.value);
		if(this.action_text=="Adicionar"){
			this.$dep.save(form.value).subscribe((response)=>{
				console.log(response);
			});
		}
		else{
			this.modelDepartamento.name=form.value.name;
			let data={name:'',id:undefined,circuns:[],nameold:''};
			data.name=this.modelDepartamento.name;
			data.nameold=this.modelDepartamento.nameold;
			data.id=this.modelDepartamento._id;
			data.circuns=[];
			// this.modelDepartamento.circuns = this.myDropDownList2.getCheckedItems();
			let items = this.myDropDownList2.getCheckedItems();
			for(let i=0;i<items.length;i++){
				data.circuns.push(items[i].value);
			}
			this.$dep.update(data).subscribe((response)=>{
				console.log(response);
			},
			(error)=>{
				console.log(error);
			});
		}
		this.myModal.hide();
	}
	update(form:FormGroup){

	}
}
