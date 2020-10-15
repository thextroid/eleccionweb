import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { jqxListBoxComponent } from "jqwidgets-ng/jqxlistbox";
import { RecintosService } from "../../../servicios/recintos.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import _ from "lodash";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  @ViewChild("myListBox") myListBox: jqxListBoxComponent;
  public event: EventEmitter<any> = new EventEmitter();
  list: any[] = [];
  source: any = {
    datatype: "json",
    datafields: [
      { name: "_id", type: "string" },
      { name: "institucion", type: "string" },
      { name: "localidad", type: "string" },
      { name: "circunscripcion", type: "string" },
      { name: "municipio", type: "string" },
      { name: "provincia", type: "string" },
    ],
    localdata: null,
    root: "recintos",
    id: "_id",
    async: true,
  };
  recintoList = new Map<String, {}>();
  selectedUser;
  constructor(public modalRef: BsModalRef) {}

  dataAdapter: any = new jqx.dataAdapter(this.source);

  renderer = (index: number, label: string, value: any): string => {
    let datarecord = this.dataAdapter.records[index];
    let table = `<ul class="list-group">
                    <li>Recinto: ${datarecord.institucion}</li>
                    <li>Localidad: ${datarecord.localidad}</li>
                    <li>Municipio: ${datarecord.municipio.name}</li>                    
                    <li>Provincia: ${datarecord.provincia.name}</li>
                    <li>${datarecord.circunscripcion.name}</li>
                    </ul>`;
    return table;
  };

  ngOnInit(): void {
    this.selectedUser = this.list[0];
    this.source.localdata = this.list[1];
    this.loadRecintoListForm();
    // console.log(this.list[2]);
  }
  ngAfterViewInit() {
    if (!this.list[2]) return;
    const recintos = this.list[2].recintos;
    this.myListBox.getItems().forEach((item, index) => {
      if (recintos.find((recinto) => recinto._id == item.originalItem.uid)) {
        this.myListBox.checkIndex(item.visibleIndex);
        this.setRecintoList(item.originalItem, item.visibleIndex);
      }
    });
  }
  loadRecintoListForm() {
    this.recintoList.clear();
  }

  setRecintoList(recinto, index) {
    if (index < 0) return;
    const {
      uid,
      institucion,
      localidad,
      municipio, //
      provincia,
      circunscripcion,
    } = recinto;
    this.recintoList.set(index, {
      index: index,
      id: uid,
      institucion,
      localidad,
      municipio: municipio.name,
      provincia: provincia.name,
      circunscripcion: circunscripcion.name,
    });
  }

  listOnSelect(event: any) {
    if (event.args) {
      let item = event.args.item;
      const index = item.visibleIndex;
      if (item.checked) {
        this.setRecintoList(item.originalItem, index);
      } else if (this.recintoList.has(index)) {
        this.recintoList.delete(index);
      }
    }
  }
  deleteRecinto(index) {
    if (this.recintoList && this.recintoList.size > 0) {
      if (this.recintoList.has(index)) {
        this.myListBox.uncheckItem(this.myListBox.getItem(index));
        this.recintoList.delete(index);
      }
    }
  }
  savedata() {
    if (!this.recintoList.size) return;
    this.event.emit(this.recintoList);
  }
}
