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

@Component({
  selector: 'app-circunscripciones',
  templateUrl: './circunscripciones.component.html',
  styleUrls: ['./circunscripciones.component.css']
})
export class CircunscripcionesComponent implements OnInit {

  @ViewChild("migrid") migrid: jqxGridComponent;
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('mdDepUpdate') public mdDepUpdate: ModalDirective;
	@ViewChild('msgNotification') minoti: jqxNotificationComponent;
	@ViewChild('myDropDownList2', { static: false }) myDropDownList2: jqxDropDownListComponent;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('btnAdd') btnAdd: jqxButtonComponent;
  @ViewChild('btnEdit') btnEdit: jqxButtonComponent;
  @ViewChild('btnReload') btnReload: jqxButtonComponent;
  
	constructor(protected $prov: ProvinciasService, protected $cir: CircunscripcionesService) { }
	public formCir: FormGroup = new FormGroup({
		name: new FormControl('') 
	})

  action_text = '';
  modelCircunscripcion:{name:'',id:undefined,_id:'',provs:string[]};
  ngOnInit(){	}
  
  ngAfterViewInit(): void {	this.refresh();	}
  
	refresh(){
		this.$cir.all().subscribe(
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
		{datafield:"name",text:"Circunscripciones",width:250}
  ];
  
	rendergridrows = (params: any): any =>{
		return params.data;
	}
	
	Rowselect(event: any): void{
  this.formCir.setValue({name:event.args.row.name});
  console.log(this.formCir.get("name"));
      console.log(event.args.row);
  }
		
	
    open(_action){

      this.$prov.all().subscribe( (data)=>{
        let list=[];
        for(let i=0;i<data.length;i++){
          list.push({value:data[i].name, label:data[i].name});
        }
        this.myDropDownList2.source(list);
      })
      if(_action=="Adicionar"){
        this.action_text=_action;
        this.formCir = new FormGroup({	name: new FormControl('')});
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
        this.modelCircunscripcion = this.migrid.getrowdata(this.migrid.getselectedrowindex());
        // console.log(this.migrid.getrowdata(this.migrid.getselectedrowindex()));
        this.formCir.setValue({name:this.modelCircunscripcion.name});
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
			this.$prov.save(form.value).subscribe((response)=>{
				console.log(response);
			});
		}
		else{
			this.modelCircunscripcion.name=form.value.name;
			let data={name:'',id:undefined,provs:[],nameold:''};
			data.name=this.modelCircunscripcion.name;
			data.id=this.modelCircunscripcion._id;
			data.provs=[];
			// this.modelCircunscripcion.provs = this.myDropDownList2.getCheckedItems();
			let item = this.myDropDownList2.getSelectedItem();
			data.provs.push(item.value);
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
