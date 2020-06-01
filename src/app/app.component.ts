import { Component, OnInit } from '@angular/core';
import { Exist } from './Exist.model';
import { NewCustomer } from './New.model';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sell With DELL';
  constructor(public authService: AuthService) {}

  private authListenerSubs: Subscription;
  private adminListener: Subscription;
  public userIsAuthenticated = false;
  public userIsAdmin = false;

  ngOnInit () {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    // this.userIsAdmin = this.authService.Adminuser;
    this.adminListener = this.authService.getAdminStatusListener().subscribe(isAdmin => {
      console.log(isAdmin);
      this.userIsAdmin = isAdmin;
    });
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

}
