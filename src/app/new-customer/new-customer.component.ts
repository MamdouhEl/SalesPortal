import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NewCustomer } from '../New.model';
import { ExistPost } from '../Exist.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  @ViewChild('f') NewCustomerForm: NgForm;

  constructor(private router: Router, public NewPosts: ExistPost, public authService: AuthService) { }
  private NewSub: Subscription;
  approve = false;
  Accept = false;
  newLength: number;
  ShowDisclaimer = false;

  ngOnInit() {
    this.NewPosts.getSum1UpdatedListener();
    this.NewPosts.getNew();
    this.NewSub = this.NewPosts.getNewPostUpdatedListener()
      .subscribe((NewPost: NewCustomer[]) => {
        this.newLength = NewPost.length;
      });
  }

  onBackClick() {
    this.router.navigate(['/']);
  }

  onSubmit(Form: NgForm) {
    // this.NewPosts.getNew();
    if (Form.invalid) {
      return;
    }
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
    }
    const newCustomer: NewCustomer = {
      id: (this.newLength + 1).toString(),
      Submitter: this.authService.username,
      CompanyName: Form.value.CompanyName,
      ContactName: Form.value.ContactName,
      ContactPhone: Form.value.ContactPhone,
      ContactEmail: Form.value.ContactEmail,
      Description: Form.value.Description,
      Status: 'Submission Received',
      Points: '0',
      Date: Date()
    };
    this.newLength = this.newLength + 1;
    this.NewPosts.addNew(newCustomer);
    this.NewCustomerForm.reset();

  }

  onView() {
    this.ShowDisclaimer = true;
  }

  onDisclaimer() {
    this.ShowDisclaimer = false;
  }

}
