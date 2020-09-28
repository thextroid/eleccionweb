import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CargarvotosRoutingModule } from "./cargarvotos-routing.module";
import { CargarvotosComponent } from "./cargarvotos.component";
import { ArchwizardModule } from "angular-archwizard";
import { NgWizardConfig, NgWizardModule, THEME } from "ng-wizard";
import { jqxDropDownListModule } from "jqwidgets-ng/jqxdropdownlist";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { CircunscripcionesService } from "../../servicios/circunscripciones.service";
import { ProvinciasService } from "../../servicios/provincias.service";
import { DepartamentosService } from "../../servicios/departamentos.service";
import { MunicipiosService } from "../../servicios/municipios.service";
import { RecintosService } from "../../servicios/recintos.service";
import { HttpClientModule } from "@angular/common/http";
import { jqxValidatorModule } from "jqwidgets-ng/jqxvalidator";
import { jqxListBoxModule } from "jqwidgets-ng/jqxlistbox";
import { jqxCalendarModule } from "jqwidgets-ng/jqxcalendar";
import { jqxDateTimeInputModule } from "jqwidgets-ng/jqxdatetimeinput";
import { jqxFileUploadModule } from "jqwidgets-ng/jqxfileupload";
import { jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { jqxButtonModule } from "jqwidgets-ng/jqxbuttons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { jqxInputModule } from "jqwidgets-ng/jqxinput";
import { VotacionService } from "../../servicios/votacion.service";
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
};
@NgModule({
  declarations: [CargarvotosComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CargarvotosRoutingModule,
    jqxGridModule,
    jqxButtonModule,
    ReactiveFormsModule,
    FormsModule,
    jqxListBoxModule,
    jqxCalendarModule,
    jqxDateTimeInputModule,
    jqxFileUploadModule,
    jqxDropDownListModule,
    SnotifyModule,
    jqxInputModule,
    jqxValidatorModule,
    NgWizardModule.forRoot(ngWizardConfig),
  ],
  providers: [
    { provide: "SnotifyToastConfig", useValue: ToastDefaults },
    SnotifyService,
    CircunscripcionesService,
    ProvinciasService,
    DepartamentosService,
    MunicipiosService,
    RecintosService,
    VotacionService,
  ],
})
export class CargarvotosModule {}