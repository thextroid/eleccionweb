import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircunscripcionesRoutingModule } from './circunscripciones-routing.module';
import { CircunscripcionesComponent } from './circunscripciones.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { CircunscripcionesService } from '../../servicios/circunscripciones.service';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { MunicipiosModule } from '../municipios/municipios.module';
import { MunicipiosService } from '../../servicios/municipios.service';
import { ProvinciasService } from '../../servicios/provincias.service';
import { DepartamentosService } from '../../servicios/departamentos.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';


@NgModule({
  declarations: [CircunscripcionesComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    CircunscripcionesRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxNotificationModule,SnotifyModule,jqxInputModule,
    jqxValidatorModule
  ],
  providers:[
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CircunscripcionesService,ProvinciasService,DepartamentosService
  ]
})
export class CircunscripcionesModule { }
