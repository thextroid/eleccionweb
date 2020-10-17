import { Component } from "@angular/core";
import { navItems,navItemsOperador,navItemsControl } from "../../_nav";
import { AuthService } from "../../servicios/auth.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;
  
  public role;
  constructor(private authService: AuthService) {

    localStorage.getItem("access_token");
    console.log(localStorage.getItem("user-role"));
    this.role = localStorage.getItem("user-role");
    if(this.role=='Admin')
      this.navItems=navItems
    
    if(this.role=='Operador')
      this.navItems=navItemsOperador
    
    if(this.role=='Control')
      this.navItems=navItemsControl
  }
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
