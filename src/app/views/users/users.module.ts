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
import { MaterialModule } from "./../material.module";
import { jqxListBoxModule } from "jqwidgets-ng/jqxlistbox";
import { NgxSpinnerModule } from "ngx-spinner";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    jqxGridModule,
    ModalModule.forRoot(),
    FormsModule,
    MaterialModule,
    jqxListBoxModule,
    SnotifyModule,
  ],
  declarations: [UsersComponent, UserFormComponent, TaskComponent],
  entryComponents: [UserFormComponent, TaskComponent],
  providers: [
    UserService,
    { provide: "SnotifyToastConfig", useValue: ToastDefaults },
    SnotifyService,
  ],
})
export class UsersModule {}
