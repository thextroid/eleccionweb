import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginAccess(user: NgForm){
     if(user.value){       
       this.authService.validLogin(user.value)
        .subscribe(value=>{
          console.log('valid');
          console.log(value);
        });
     }
  }
}
