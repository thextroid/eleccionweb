import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosRoutingModule } from './datos-routing.module';
import { DatosComponent } from './datos.component';
import { jqxGridModule, jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
// import { CircunscripcionComponent } from './circunscripcion/circunscripcion.component';


@NgModule({
  imports: [
    CommonModule,
    DatosRoutingModule,
    jqxGridModule,
    jqxButtonModule
  ],
  declarations: [DatosComponent]
	// entryComponents: [ CircunscripcionComponent ]
})
export class DatosModule { }
