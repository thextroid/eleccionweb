import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { User } from '../../models/user';
import { UserService } from '../../servicios/user.service';
import _ from 'lodash';
import { HttpClientModule } from '@angular/common/http';
@Component({
  templateUrl: './users.component.html',
  styleUrls:['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild("myGrid") myGrid: jqxGridComponent;
  @ViewChild('modal') modal: ModalDirective;
  source: any = {
    localdata: null,
    datafields: [
        { name: '_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'fullName', type: 'string' },
        { name: 'telefono', type: 'int' },
        { name: 'rol', type: 'string' },
        { name: 'state', type: 'bool' }
    ],
    datatype: 'json'
    };

    dataAdapter: any = new jqx.dataAdapter(this.source);

    columns: any[] = [
        { text: 'Usuario', datafield: 'name', width: 250 },
        { text: 'Nombre Completo', datafield: 'fullName', width: 250 },
        { text: 'Telefono', datafield: 'telefono', width: 120 },
        { text: 'Rol', datafield: 'rol', width: 80 },
        { text: 'Estado', datafield: 'state', minwidth: 60 , columntype:'checkbox'}
    ];

  modalRef: BsModalRef;
  selectedUser=null;
  constructor(private userService:UserService,
      private modalService: BsModalService) { }

  ngOnInit(): void {
    this.resetSelectedUser();
    this.loadData();
  }
  

  loadData(){
    this.userService.getAll()
      .subscribe((data)=>{
          this.source.localdata =  data;
          this.myGrid.updatebounddata();
      })
  }

  resetSelectedUser(){
      const emptyUser={
        _id:null,
        name:'',
        fullName:'',
        telefono:null,
        rol:'',
        state:false
      }
      this.selectedUser = emptyUser;      
  }

  refeshCourses(){
    this.resetSelectedUser();
    this.loadData();
  }
  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.resetSelectedUser();
  }

  saveUser(user){      
      if(this.selectedUser._id){
        
      }else{
        this.userService.save(user.value)
          .subscribe(result=> this.refeshCourses());         
          this.modal.hide();
      }
  }
  selectUser(event){
    this.selectedUser = _.pick(event.args.row,['_id','fullName','name','telefono','rol','state']);
  }
  cancel(){
    this.resetSelectedUser();
  }
}
