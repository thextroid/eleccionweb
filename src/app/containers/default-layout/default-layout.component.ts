import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { AuthService } from "../../servicios/auth.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private authService: AuthService) {}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut() {
    console.log("before logout");
    this.authService.logoutUser().subscribe((res) => {
      console.log("log out");
    });
  }
}
