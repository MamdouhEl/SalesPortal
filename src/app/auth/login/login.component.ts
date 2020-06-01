import { Component, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  failedAuth = false;
  private authStatusSub: Subscription;


  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;

      }
    );
  }

  ngOnDestroy() {

    this.authStatusSub.unsubscribe();

  }

  onSubmit(Form: NgForm) {

    if (Form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(Form.value.username.toLowerCase(), Form.value.password);
    this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.failedAuth = this.authService.failedAuth;
      }
    );
    console.log('FailedAuth' + this.failedAuth);

  }
}
