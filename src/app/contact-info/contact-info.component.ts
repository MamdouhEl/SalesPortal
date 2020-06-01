import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../Contact.model';
import { ExistPost } from '../Exist.service';
import { CustomerModel } from '../Customer.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ScoreBoard } from '../ScoreBoard.model';


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  @ViewChild('f') ContactInfoComponent: NgForm;
  constructor(private router: Router, public ExistPosts: ExistPost, public authService: AuthService) { }
  Customers: CustomerModel[] = [];
  private ContactSub: Subscription;
  private CustomerExist: Subscription;
  selectedNav: String;
  ContactConnection: Contact;
  newContactLength: number;
  ShowDisclaimer = false;
  ScoreBoardFound: ScoreBoard[];
  approve = false;
  Accept = false;


  ngOnInit() {

    this.ExistPosts.getCustomer();
    this.CustomerExist = this.ExistPosts.getCustomerListener()
      .subscribe((CustomersExisting: CustomerModel[]) => {
        this.Customers = CustomersExisting;
    });
    this.ExistPosts.getContact();
    this.ContactSub = this.ExistPosts.getContactUpdatedListener()
      .subscribe((newContacts: Contact[]) => {
        this.newContactLength = newContacts.length;
      });

  }

  onBackClick() {
    this.router.navigate(['/']);
  }

  onSubmit(Form: NgForm) {
    this.ExistPosts.getContact();
    this.ContactSub = this.ExistPosts.getContactUpdatedListener()
      .subscribe((newContacts: Contact[]) => {
        this.newContactLength = newContacts.length;
      });

    if (Form.invalid) {
      return;
    }

    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
    }

    if (Form.value.Customer !== 'Other') {
      console.log(this.newContactLength);
      this.ContactConnection = {
      id: (this.newContactLength + 1).toString(),
      Submitter: this.authService.username,
      Customer: Form.value.Customer,
      ContactName: Form.value.ContactName,
      ContactEmail: Form.value.ContactEmail,
      ContactPhone: Form.value.ContactPhone,
      ContactPosition: Form.value.ContactPosition,
      Comment: Form.value.Comment,
      Status: 'Submission Received',
      Points: '0',
      Date: Date()
    };
  } else {
    console.log(this.newContactLength);
    this.ContactConnection = {
      id: (this.newContactLength + 1).toString(),
      Submitter: this.authService.username,
      Customer: Form.value.CustomerCompany,
      ContactName: Form.value.ContactName,
      ContactEmail: Form.value.ContactEmail,
      ContactPhone: Form.value.ContactPhone,
      ContactPosition: Form.value.ContactPosition,
      Comment: Form.value.Comment,
      Status: 'Submission Received',
      Points: '0',
      Date: Date()
    };

  }
    this.newContactLength = this.newContactLength + 1;
    this.ExistPosts.addContact(this.ContactConnection);
    this.ContactInfoComponent.reset();




  }
  onView() {
    this.ShowDisclaimer = true;
  }

  onDisclaimer() {
    this.ShowDisclaimer = false;
  }

}
