import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { MesasComponent } from './mesas.component';
import { MesasRoutingModule } from './mesas-routing.module';
import { MunicipiosService } from '../../servicios/municipios.service';
import { LocalidadesService } from '../../servicios/localidades.service';
import { ProvinciasService } from '../../servicios/provincias.service';
import { RecintosService } from '../../servicios/recintos.service';


@NgModule({
  declarations: [MesasComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    MesasRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxNotificationModule
  ],
  providers:[
    MunicipiosService, LocalidadesService,ProvinciasService,RecintosService
  ]
})
export class MesasModule { }
