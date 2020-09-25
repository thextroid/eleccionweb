import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginAccess(user: NgForm) {
    if (user.value) {
      this.authService.validLogin(user.value).subscribe(
        (res: any) => {
          localStorage.setItem("access_token", res.token);
          this.router.navigate(["/"]);
        },
        (error) => console.log(error)
      );
    }
  }
}
