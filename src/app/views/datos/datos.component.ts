
import { Component, OnInit, AfterViewInit, ViewChild ,ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
import { generatedata } from '../../generatedata';

@Component({
	selector: 'app-datos',
	templateUrl: './datos.component.html',
	styleUrls: ['./datos.component.css']
})
export class DatosComponent implements  AfterViewInit, OnInit {
	@ViewChild('mitabla') migrid: jqxGridComponent;
	@ViewChild('button') button: jqxButtonComponent;
	ngOnInit(): void {
    

	}
	ngAfterViewInit(): void {
		
	}
  url = 'http://localhost:3000/getdata';
  
  source: any =
    {
      localdata:generatedata(25,false),
      // url: this.url,
      datafields: [
        {
          name: 'id',
          map: 'id'
        }, 
        {
          name: 'firstname',
          map: 'firstname'
        }, {
          name: 'lastname',
          map: 'lastname'
        }, {
          name: 'price',
          map: 'price'
        }
      ],
      datatype: 'array',
      root: 'Rows',
      beforeprocessing: (data: any) => {
        this.source.totalrecords = data.TotalRows;
      }
    };
 
  dataAdapter: any = new jqx.dataAdapter(this.source);
 
  columns: any[] =
    [
      {
        text: 'Id',
        datafield: 'id',
        width: 50,
        hidden:true
      },
      {
        text: 'Nombre',
        datafield: 'firstname',
        width: 250
      }, {
        text: 'Titulo',
        datafield: 'lastname',
        width: 200
      }, {
        text: 'EStado',
        datafield: 'price',
        width: 200
      }
    ];
	// this.myGrid.gotopage(1);
  rendergridrows = (params: any): any => {
    return params.data;
  } 
  refreshBtnOnClick(): void {
        this.source.localdata = generatedata(500, false);
        this.migrid.updatebounddata('cells');
    }
  next(){
	  console.log(this.migrid.getdatainformation());
	  console.log(this.migrid.getsortinformation());
	  console.log(this.migrid.getpaginginformation());
  }
  Pagechanged(event:any):void{
    console.log("page",event.args);
  }
  Pagesizechanged(event: any): void   {
    console.log("onpagesize()",event.args);
  }
  Sort(event: any): void{
    console.log("onSort()",event.args);
  }
  Rowselect(event: any): void   {
    console.log("onRowselect()",event.args);
    console.log(this.migrid.getrowdata(0));
  }
  filtrado(event: any): void 
    {
      console.log(event);
		}
  

}