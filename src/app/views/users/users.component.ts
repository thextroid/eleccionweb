import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "../../models/user";
import { UserService } from "../../servicios/user.service";
import _ from "lodash";
import { UserFormComponent } from "./user-form/user-form.component";
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

@Component({
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  @ViewChild("myGrid") myGrid: jqxGridComponent;
  config = {
    backdrop: "static",
    ignoreBackdropClick: true,
  };

  source: any = {
    localdata: null,
    datafields: [
      { name: "_id", type: "string" },
      { name: "name", type: "string" },
      { name: "fullName", type: "string" },
      { name: "telefono", type: "int" },
      { name: "rol", type: "string" },
      { name: "state", type: "bool" },
    ],
    datatype: "json",
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    {
      text: "#",
      sortable: false,
      filterable: false,
      editable: false,
      groupable: false,
      draggable: false,
      resizable: false,
      datafield: "",
      columntype: "number",
      width: 50,
      cellsrenderer: function (row, column, value) {
        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
      },
    },
    { text: "Usuario", datafield: "name", width: 250 },
    { text: "Nombre Completo", datafield: "fullName", width: 250 },
    { text: "Telefono", datafield: "telefono", width: 120 },
    { text: "Rol", datafield: "rol", width: 80 },
    {
      text: "Estado",
      datafield: "state",
      minwidth: 60,
      columntype: "checkbox",
    },
  ];

  modalRef: BsModalRef;
  selectedUser = null;
  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private $notifier: SnotifyService,
    private $spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.resetSelectedUser();
    this.loadData();
  }

  loadData() {
    this.userService.getAll().subscribe((data) => {
      this.source.localdata = data;
      this.myGrid.updatebounddata();
    });
  }

  resetSelectedUser() {
    const emptyUser = {
      _id: null,
      name: "",
      fullName: "",
      telefono: "",
      rol: "Operador",
      state: false,
    };
    this.selectedUser = emptyUser;
  }

  iniModal() {
    const initialState = {
      list: [this.selectedUser],
    };
    this.modalRef = this.modalService.show(UserFormComponent, {
      initialState,
      ignoreBackdropClick: true,
    });

    this.modalRef.content.event.subscribe(this.saveUser.bind(this));
  }

  addUserModal() {
    this.resetSelectedUser();
    this.iniModal();
  }

  updateUserModal() {
    if (!this.selectedUser._id) return alert("Selecione un Usuario");
    this.iniModal();
  }

  refeshUsers() {
    this.resetSelectedUser();
    this.loadData();
  }

  saveUser(user: User) {
    const id = this.selectedUser._id;
    user.telefono = user.telefono + "";
    if (id) {
      this.userService.update(id, user).subscribe((result) => {
        this.mensaje('Se Actualizó correctamente el Usuario','Usuario',0);
        this.refeshUsers();
      },(error)=>{
        this.mensaje('Se Actualizó correctamente el Usuario','Usuario',0);
      });
    } else {
      this.userService.save(user).subscribe((result) => {
        this.mensaje('Se Actualizó correctamente el Usuario','Usuario',0);
        this.refeshUsers();
      },
      (error)=>{
        this.mensaje(error.message,'',0);
      }
      );
    }
    this.modalRef.hide();
  }
  selectUser(event) {
    this.selectedUser = _.pick(event.args.row, [
      "_id",
      "fullName",
      "name",
      "telefono",
      "rol",
      "state",
    ]);
  }
  cancel() {
    this.resetSelectedUser();
  }
  mensaje(content: string, title: string, tipo) {
    const op = {
      timeout: 3000,
      titleMaxLength: 22,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    };
    if (tipo == 0) this.$notifier.success(content, title, op);
    if (tipo == 1) this.$notifier.warning(content, title, op);
    if (tipo == 2) this.$notifier.info(content, title, op);
    if (tipo == 3) this.$notifier.error(content, title, op);
  }
}
