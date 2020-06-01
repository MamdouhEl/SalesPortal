import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ExistPost } from '../Exist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  private adminListener: Subscription;
  public userIsAuthenticated = false;
  public userIsAdmin = false;

  constructor(public authService: AuthService, private ExistService: ExistPost, private router: Router) { }

  ngOnInit() {
    // this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();

    this.adminListener = this.authService.getAdminStatusListener().subscribe(isAdmin => {
      console.log(isAdmin);
      this.userIsAdmin = isAdmin;
    });
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      // this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListener.unsubscribe();
    // this.authService.logout();
  }

  onLogout() {
    this.authService.logout();
  }

}
