import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { RecintosService } from "../../../servicios/recintos.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import _ from "lodash";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  @ViewChild("dropDownList") recintosDropDownList: jqxDropDownListComponent;
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
  recintoList: any[];
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
    this.source.localdata = this.list[1];
    this.loadRecintoListForm();
  }
  loadRecintoListForm() {
    this.recintoList = [];
  }
  ngAfterViewInit() {}

  listOnSelect(event: any) {
    if (event.args) {
      let item = event.args.item;
      if (item.checked) {
        const {
          _id,
          institucion,
          localidad,
          municipio,
          provincia,
          circunscripcion,
        } = item.originalItem;
        this.recintoList.push({
          id: _id,
          institucion,
          localidad,
          municipio: municipio.name,
          provincia: provincia.name,
          circunscripcion: circunscripcion.name,
        });
      }
    }
  }
}
