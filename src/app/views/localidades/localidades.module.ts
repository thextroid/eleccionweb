import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalidadesRoutingModule } from './localidades-routing.module';
import { LocalidadesComponent } from './localidades.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { LocalidadesService } from '../../servicios/localidades.service';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { MunicipiosModule } from '../municipios/municipios.module';
import { MunicipiosService } from '../../servicios/municipios.service';


@NgModule({
  declarations: [LocalidadesComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    LocalidadesRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxWindowModule,jqxInputModule,jqxNotificationModule
  ],
  providers:[
    LocalidadesService,MunicipiosService
  ]
})
export class LocalidadesModule { }
