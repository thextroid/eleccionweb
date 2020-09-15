import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircunscripcionesRoutingModule } from './circunscripciones-routing.module';
import { CircunscripcionesComponent } from './circunscripciones.component';


@NgModule({
  declarations: [CircunscripcionesComponent],
  imports: [
    CommonModule,
    CircunscripcionesRoutingModule
  ]
})
export class CircunscripcionesModule { }
