import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    jqxGridModule,
    ModalModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    UsersComponent
  ],  
})
export class UsersModule { }
