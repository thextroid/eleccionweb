import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "../../models/user";
import { UserService } from "../../servicios/user.service";
import _ from "lodash";
import { UserFormComponent } from "./user-form/user-form.component";
import { TaskComponent } from "./task/task.component";
import { RecintosService } from "../../servicios/recintos.service";
import { TaskService } from "../../servicios/task.service";
import { Task } from "../../models/task";

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
  recintosData: any[];
  taskUser: Task;
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
    { text: "Usuario", datafield: "name", width: 250, filterable: false },
    {
      text: "Nombre Completo",
      datafield: "fullName",
      width: 250,
      filterable: true,
    },
    { text: "Telefono", datafield: "telefono", width: 120, filterable: false },
    { text: "Rol", datafield: "rol", width: 80, filterable: false },
    {
      text: "Estado",
      datafield: "state",
      minwidth: 60,
      columntype: "checkbox",
      filterable: false,
    },
  ];

  modalRef: BsModalRef;
  selectedUser = null;
  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    protected resintosService: RecintosService,
    protected taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.resetSelectedUser();
    this.loadData();
    this.loadDataRecintos();
  }

  loadData() {
    this.userService.getAll().subscribe((data) => {
      this.source.localdata = data;
      this.myGrid.updatebounddata();
    });
  }

  loadDataRecintos() {
    this.resintosService.all().subscribe((data) => {
      this.recintosData = data;
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

  async initListResintosModal() {
    try {
      if (!this.selectedUser._id) return alert("Selecione un Usuario");
      this.taskUser = await this.getTaskByUsuario(this.selectedUser._id);
      const initialState = {
        list: [this.selectedUser, this.recintosData, this.taskUser],
      };
      this.modalRef = this.modalService.show(TaskComponent, {
        initialState,
        ignoreBackdropClick: true,
        class: "gray modal-lg",
      });
      this.modalRef.content.event.subscribe(this.saveRecintoUsiario.bind(this));
      return;
    } catch (error) {
      console.log(error);
    }
  }

  addUserModal() {
    this.resetSelectedUser();
    this.iniModal();
  }

  updateUserModal() {
    if (!this.selectedUser._id) return alert("Selecione un Usuario");
    this.iniModal();
  }

  addRecintosModal() {
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

  getTaskByUsuario(id) {
    return this.taskService.getTaskByUser(id).toPromise();
  }

  saveRecintoUsiario(recintos: Map<String, any>) {
    const idRecintos = Array.from(recintos.values(), (recinto) => recinto.id);
    const userid = this.selectedUser._id;
    const task = { userId: userid, recintos: idRecintos };
    if (userid && !this.taskUser) {
      this.taskService.save(task).subscribe((result) => {
        this.resetSelectedUser();
      });
    } else if (userid && this.taskUser.recintos.length > 0) {
      this.taskService
        .updateTaskByUser(userid, { recintos: idRecintos })
        .subscribe((result) => {
          this.resetSelectedUser();
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
