import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  // @Input() user;
  // @Output() saveUserForm = new EventEmitter();
  public event: EventEmitter<any> = new EventEmitter();
  list: any[] = [];
  user = null;
  constructor(public modalRef: BsModalRef) {}

  ngOnInit() {
    this.user = this.list[0];
  }

  saveUserForm(form) {
    this.event.emit(form.value);
  }
}
// (click)="modalRef.hide()"

// (click)="modalRef.hide()"
