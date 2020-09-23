import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinciasRoutingModule } from './provincias-routing.module';
import { ProvinciasComponent } from './provincias.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { HttpClientModule } from '@angular/common/http';
import { ProvinciasService } from '../../servicios/provincias.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';


@NgModule({
  declarations: [ProvinciasComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    ProvinciasRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxWindowModule,jqxInputModule,jqxNotificationModule,
    SnotifyModule,jqxInputModule,jqxValidatorModule,jqxValidatorModule
  ],
  providers:[
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    ProvinciasService
  ]
})
export class ProvinciasModule { }
