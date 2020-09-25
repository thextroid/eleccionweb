import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { DepartamentosService } from '../../servicios/departamentos.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [DepartamentosComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,HttpClientModule,
    DepartamentosRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxWindowModule,jqxInputModule,
    jqxValidatorModule,SnotifyModule
  ],
  providers:[
    
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    DepartamentosService
  ]
})
export class DepartamentosModule { }
