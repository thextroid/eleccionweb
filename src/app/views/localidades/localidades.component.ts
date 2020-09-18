import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxComponent } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationComponent } from 'jqwidgets-ng/jqxnotification';
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
	constructor(protected $loc: LocalidadesService, protected $mun: MunicipiosService) { }
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
				let e='',list=[];
				console.log(data[0]);
				for(let i=0;i<data.length;i++){
					e=JSON.stringify(data[i]);
					e = e.substring(e.indexOf("_id")+6, e.indexOf("name")-3 );
					list.push({_id:e,id:i+1,name:data[i].name});
				}
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
			console.log(this.source.localdata);
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
	
	Rowselect(event: any): void{
  this.formMun.setValue({name:event.args.row.name});
  console.log(this.formMun.get("name"));
      console.log(event.args.row);
  }
		
	
    open(_action){

      this.$mun.all().subscribe( (data)=>{
        for(let i=0;i<data.length;i++){
          this.myDropDownList2.addItem({value:data[i].name, label:data[i].name});
        }
      })
      if(_action=="Adicionar"){
        this.action_text=_action;
        this.formMun = new FormGroup({	name: new FormControl('')});
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
        this.modelMunicipio = this.migrid.getrowdata(this.migrid.getselectedrowindex());
        // console.log(this.migrid.getrowdata(this.migrid.getselectedrowindex()));
        this.formMun.setValue({name:this.modelMunicipio.name});
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
    
	save(form: FormGroup){
		console.log(form.value);
		if(this.action_text=="Adicionar"){
			this.$loc.save(form.value).subscribe((response)=>{
				console.log(response);
			});
		}
		else{
			this.modelMunicipio.name=form.value.name;
			let data={name:'',id:undefined,circuns:[],nameold:''};
			data.name=this.modelMunicipio.name;
			data.id=this.modelMunicipio._id;
			data.circuns=[];
			// this.modelMunicipio.circuns = this.myDropDownList2.getCheckedItems();
			let item = this.myDropDownList2.getSelectedItem();
			data.circuns.push(item.value);
			this.$loc.update(data).subscribe((response)=>{
				console.log(response);
			},
			(error)=>{
				console.log(error);
			});
		}
		this.myModal.hide();
	}

}
