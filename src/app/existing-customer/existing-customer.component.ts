import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { Exist } from '../Exist.model';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ExistPost } from '../Exist.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  @ViewChild('f') ExistingCustomerForm: NgForm;
  constructor(private router: Router, public ExistPosts: ExistPost, public authService: AuthService) { }
  private ExistSub: Subscription;
  ExistSubmit: Exist[] = [];
  id: number;
  approve = false;
  Accept = false;
  newExistLength: number;
  ShowDisclaimer = false;

  ngOnInit() {
    this.ExistPosts.getSumUpdatedListener();
    this.ExistPosts.getExisting();
    this.ExistSub = this.ExistPosts.getPostUpdatedListener()
      .subscribe((Exists: Exist[]) => {
        this.newExistLength = Exists.length;
      });
  }

  onBackClick2() {
    this.router.navigate(['/']);
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit(Form: NgForm) {
    //
    this.ExistPosts.getExisting();
    // console.log(this.ExistPosts.Existpostlength.toString());
    if (Form.invalid) {
      return;
    }
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
    }
    console.log(this.ExistPosts.Existpostlength);
    const exist: Exist = {
      id: (this.ExistPosts.Existpostlength + 1).toString(),
      Submitter: this.authService.username,
      CompanyName: Form.value.CompanyName,
      ContactName: Form.value.ContactName,
      ContactPhone: Form.value.ContactPhone,
      ContactEmail: Form.value.ContactEmail,
      ContactPosition: Form.value.ContactPosition,
      Description: Form.value.Description,
      Product: Form.value.Product,
      Status: 'Submission Received',
      Points: '0',
      Date: Date()
    };
    console.log(exist.Date);
    this.ExistPosts.addExist(exist);
    this.ExistingCustomerForm.reset();
  }

  onView() {
    this.ShowDisclaimer = true;
  }

  onDisclaimer() {
    this.ShowDisclaimer = false;
  }

}
