import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(public authService: AuthService) { }

  userIsAuthenticated = false;
  userIsAdmin = false;
  test = "test";

  ngOnInit() {
    this.authService.getAdminStatusListener()
      .subscribe((Adminuser: boolean) => {
        this.userIsAdmin = Adminuser;
      });
    this.userIsAuthenticated = this.authService.isAuthenticated;

  }


}
