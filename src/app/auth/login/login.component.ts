import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../servicios/auth.service";
import { jqxValidatorComponent } from "jqwidgets-ng/jqxvalidator";
import { jqxPasswordInputComponent } from "jqwidgets-ng/jqxpasswordinput";

import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("validatorReference") myValidator: jqxValidatorComponent;
  @ViewChild("passwordInpu") passwordInput: jqxPasswordInputComponent;
  constructor(private authService: AuthService, private router: Router) {}
  messageUser: string;
  ngOnInit(): void {
    this.messageUser = null;
  }

  loginAccess(user: NgForm) {
    if (user.value) {
      this.authService.validLogin(user.value).subscribe(
        (res: any) => {
          localStorage.setItem("access_token", res.token);
          this.router.navigate(["/"]);
        },
        ({ error }) => {
          this.messageUser = error;
          this.clearMessage();
        }
      );
    }
  }
  clearMessage() {
    if (this.messageUser) {
      setTimeout(() => {
        this.messageUser = null;
      }, 5000);
    }
  }
}
