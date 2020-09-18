import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification';
import { ModalDirective } from 'ngx-bootstrap/modal';
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
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('btnAdd') btnAdd: jqxButtonComponent;
  @ViewChild('btnEdit') btnEdit: jqxButtonComponent;
  @ViewChild('btnReload') btnReload: jqxButtonComponent;
	constructor(protected $prov: ProvinciasService) { }
	public formProv: FormGroup = new FormGroup({
		name: new FormControl('') 
	})
  action_text = '';
  modelProvincia:{name:'',id:undefined,_id:'',circuns:string[]};
  
  ngOnInit(){	}
  
  ngAfterViewInit(): void {	this.refresh();	}
  
	refresh(){
		this.$prov.all().subscribe(
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
				this.btnReload.setOptions({disabled:false});
			})
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
			console.log(this.source.localdata);
			this.source.totalrecords = data.TotalRows;
		}
	};

	dataAdapter:any = new jqx.dataAdapter(this.source);

	columns : any[]=[
		{datafield:"_id",text:"ID",width:30,hidden:true},
		{datafield:"id",text:"#",width:30},
		{datafield:"name",text:"Provincias",width:250}
  ];
  
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void{
  this.formProv.setValue({name:event.args.row.name});
  console.log(this.formProv.get("name"));
      console.log(event.args.row);
  }
		
	
  open(_action){
    if(_action=="Adicionar"){
      this.action_text=_action;
      this.formProv = new FormGroup({	name: new FormControl('')});
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
      this.modelProvincia = this.migrid.getrowdata(this.migrid.getselectedrowindex());
      // console.log(this.migrid.getrowdata(this.migrid.getselectedrowindex()));
      this.formProv.setValue({name:this.modelProvincia.name});
      this.myModal.show();
      let rowscount = this.migrid.getdatainformation().rowscount;
      }
    }
  }
  
  find(){
    this.smallModal.show();
  }
  reload (event){
    console.log(event);
    this.btnReload.setOptions({disabled:true});
    this.migrid.clear();
    this.refresh();
  }
  clearBtnOnClick(): void {
      this.migrid.clearfilters();
  }
	save(form: FormGroup){
		console.log(form.value);
		if(this.action_text=="Adicionar"){
			this.$prov.save(form.value).subscribe((response)=>{
				console.log(response);
			});
		}
		else{
			this.modelProvincia.name=form.value.name;
			let data={name:'',id:undefined,circuns:[],nameold:''};
			data.name=this.modelProvincia.name;
			data.id=this.modelProvincia._id;
			data.circuns=[];
			// this.modelProvincia.circuns = this.myDropDownList2.getCheckedItems();
			let items = this.myDropDownList2.getCheckedItems();
			for(let i=0;i<items.length;i++){
				data.circuns.push(items[i].value);
			}
			this.$prov.update(data).subscribe((response)=>{
				console.log(response);
			},
			(error)=>{
				console.log(error);
			});
		}
		this.myModal.hide();
	}
}
