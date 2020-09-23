import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipiosRoutingModule } from './municipios-routing.module';
import { MunicipiosComponent } from './municipios.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { MunicipiosService } from '../../servicios/municipios.service';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { ProvinciasModule } from '../provincias/provincias.module';
import { ProvinciasService } from '../../servicios/provincias.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';


@NgModule({
  declarations: [MunicipiosComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    MunicipiosRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxWindowModule,jqxInputModule,jqxNotificationModule,
    SnotifyModule,jqxValidatorModule,jqxValidatorModule
  ],
  providers:[
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    MunicipiosService,ProvinciasService
  ]
})
export class MunicipiosModule { }
