import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "../../models/user";
import { UserService } from "../../servicios/user.service";
import _ from "lodash";
import { UserFormComponent } from "./user-form/user-form.component";

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
    private modalService: BsModalService
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
        this.refeshUsers();
      });
    } else {
      this.userService.save(user).subscribe((result) => {
        this.refeshUsers();
      });
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
}
