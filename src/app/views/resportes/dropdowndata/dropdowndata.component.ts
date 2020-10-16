import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";

@Component({
  selector: "app-dropdowndata",
  templateUrl: "./dropdowndata.component.html",
  styleUrls: ["./dropdowndata.component.css"],
})
export class DropdowndataComponent implements OnInit {
  tagNameFiled;
  @Input()
  dropdownData;
  @Input()
  fieldsTable: any;

  @Output() listOnSelect = new EventEmitter();

  @ViewChild("dropCircunscripcion")
  dropCircunscripcion: jqxDropDownListComponent;
  source: any = {
    datatype: "json",
    datafields: [],
    displayMember: "name",
    localdata: null,
    root: "circunscripcions",
    id: "_id",
    async: true,
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  constructor() {}
  ngOnInit(): void {
    this.tagNameFiled = this.fieldsTable.displayMember;
    this.source.displayMember = this.fieldsTable.displayMember;
    this.source.root = this.fieldsTable.tableName;
    this.source.datafields = this.fieldsTable.datafields;
    this.source.localdata = this.dropdownData;
  }

  ngAfterViewInit() {
    // this.dropCircunscripcion.displayMember(this.tableNameTag);
  }
}
