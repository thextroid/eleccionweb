import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecintosRoutingModule } from './recintos-routing.module';
import { RecintosComponent } from './recintos.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';
import { RecintosService } from '../../servicios/recintos.service';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { LocalidadesService } from '../../servicios/localidades.service';
import { MunicipiosService } from '../../servicios/municipios.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';


@NgModule({
  declarations: [RecintosComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    RecintosRoutingModule,jqxGridModule,jqxButtonModule,
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
export class RecintosModule { }
