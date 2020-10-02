import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { jqxButtonComponent } from "jqwidgets-ng/jqxbuttons";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { jqxInputComponent } from "jqwidgets-ng/jqxinput";
import { jqxListBoxComponent } from "jqwidgets-ng/jqxlistbox";
import { jqxNotificationComponent } from "jqwidgets-ng/jqxnotification";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MunicipiosService } from "../../servicios/municipios.service";
import { LocalidadesService } from "../../servicios/localidades.service";
import { Recinto } from "../../models/recinto";
import { RecintosService } from "../../servicios/recintos.service";
import { ProvinciasService } from "../../servicios/provincias.service";
import { CircunscripcionesComponent } from "../circunscripciones/circunscripciones.component";
import { CircunscripcionesService } from "../../servicios/circunscripciones.service";
import { jqxValidatorComponent } from "jqwidgets-ng/jqxvalidator";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
@Component({
  selector: 'app-resportes',
  templateUrl: './resportes.component.html',
  styleUrls: ['./resportes.component.css']
})
export class ResportesComponent implements OnInit {
  @ViewChild('dropProv',{static:false}) dropProv:jqxDropDownListComponent;
  @ViewChild('dropMun',{static:false}) dropMun:jqxDropDownListComponent;
  constructor(protected $prov:ProvinciasService,protected $mun:MunicipiosService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.$prov.all().subscribe(
      (response)=>{
        let list=[];
        for (let i = 0; i < response.length; i++) {
          list.push(
            {
              value:response[i],
              label:response[i].name
            }
          );
        }
        this.dropProv.source(list);
      }
    );
    this.$mun.all().subscribe(
      (response)=>{
        let list=[];
        for (let i = 0; i < response.length; i++) {
          list.push(
            {
              value:response[i],
              label:response[i].name
            }
          );
        }
        this.dropMun.source(list);
      }
    );
  }
  change(event){
    console.log(event);
  }
}
