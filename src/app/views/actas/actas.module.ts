import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActasRoutingModule } from './actas-routing.module';
import { ActasComponent } from './actas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { RecintosService } from '../../servicios/recintos.service';
import { MunicipiosService } from '../../servicios/municipios.service';
import { LocalidadesService } from '../../servicios/localidades.service';


@NgModule({
  declarations: [ActasComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    ActasRoutingModule,jqxGridModule,jqxButtonModule,
    ReactiveFormsModule,FormsModule,
    jqxInputModule,jqxListBoxModule,
    jqxDropDownListModule,jqxNotificationModule,
    jqxNumberInputModule,jqxValidatorModule,
    SnotifyModule,jqxValidatorModule
  ],
  providers:[
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    RecintosService,MunicipiosService, LocalidadesService
  ]
})
export class ActasModule { }
