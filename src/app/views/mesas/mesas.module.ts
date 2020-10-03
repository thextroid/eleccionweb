import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxNotificationModule } from 'jqwidgets-ng/jqxnotification';

import { jqxTextAreaModule } from 'jqwidgets-ng/jqxtextarea';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxSwitchButtonModule } from 'jqwidgets-ng/jqxswitchbutton';
import { jqxListBoxModule } from 'jqwidgets-ng/jqxlistbox';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { MesasComponent } from './mesas.component';
import { MesasRoutingModule } from './mesas-routing.module';
import { MunicipiosService } from '../../servicios/municipios.service';
import { LocalidadesService } from '../../servicios/localidades.service';
import { ProvinciasService } from '../../servicios/provincias.service';
import { RecintosService } from '../../servicios/recintos.service';
import { CircunscripcionesService } from '../../servicios/circunscripciones.service';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';
import { VotacionService } from '../../servicios/votacion.service';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { NgxSpinnerModule } from 'ngx-spinner';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
};
@NgModule({
  declarations: [MesasComponent],
  imports: [
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CommonModule,HttpClientModule,
    MesasRoutingModule,jqxGridModule,jqxButtonModule,ReactiveFormsModule,FormsModule,
    jqxListBoxModule,jqxDropDownListModule,jqxNotificationModule,jqxSwitchButtonModule,
    jqxValidatorModule,SnotifyModule,jqxInputModule,jqxNumberInputModule,jqxTextAreaModule,
    NgWizardModule.forRoot(ngWizardConfig),NgxSpinnerModule
  ],
  providers:[
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    MunicipiosService, LocalidadesService,
    ProvinciasService,RecintosService,
    SnotifyService,
    CircunscripcionesService,VotacionService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MesasModule { }
