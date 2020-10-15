import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserService } from "../../servicios/user.service";
import { TaskComponent } from "./task/task.component";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { jqxListBoxComponent } from "jqwidgets-ng/jqxlistbox";
import { MaterialModule } from "./../material.module";

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    jqxGridModule,
    ModalModule.forRoot(),
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    UsersComponent,
    UserFormComponent,
    TaskComponent,
    jqxDropDownListComponent,
    jqxListBoxComponent,
  ],
  entryComponents: [UserFormComponent, TaskComponent],
  providers: [UserService],
})
export class UsersModule {}
