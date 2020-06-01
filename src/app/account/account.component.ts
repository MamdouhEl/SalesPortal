import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExistPost } from '../Exist.service';
import { Exist } from '../Exist.model';
import { Contact } from '../Contact.model';
import { NewCustomer } from '../New.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsibleModule } from 'angular2-collapsible';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  sum = 0;
  public isCollapsed: boolean[] = [];
  exists: Exist[] = [];
  newContact: Contact[] = [];
  newCustomer: NewCustomer[] = [];
  private ExistSub: Subscription;
  private ContactSub: Subscription;
  private CustomerSub: Subscription;

  constructor(private router: Router, public ExistService: ExistPost, public authService: AuthService) { }



  ngOnInit() {
    if (!this.authService.isAuthenticated) {

      this.router.navigate(['login']);

    } else {
    // this.ExistService.getUserSubmissions(this.authService.username);
    this.ExistService.getExisting();
    this.ExistSub = this.ExistService.getPostUpdatedListener()
      .subscribe((ExistingCustomers: Exist[]) => {
        this.exists = ExistingCustomers.filter(customers => customers.Submitter === this.authService.username);
        for (let i = 0; i < this.exists.length; i++) {
          console.log(this.exists);

          let SubPoints = this.exists[i].Points;
          this.GetSummation(parseInt(SubPoints, 10));


        }
      });
    this.ExistService.getContact();
    this.ContactSub = this.ExistService.getContactUpdatedListener()
      .subscribe((newContacts: Contact[]) => {
        this.newContact = newContacts.filter(customers => customers.Submitter === this.authService.username);
        for (let i = 0; i < this.newContact.length; i++) {

          let SubPoints = this.newContact[i].Points;
          this.GetSummation(parseInt(SubPoints, 10));

        }
        // console.log(this.newContact);
      });
      this.ExistService.getNew();
      this.CustomerSub = this.ExistService.getNewPostUpdatedListener()
        .subscribe((newCustomers: NewCustomer[]) => {
          this.newCustomer = newCustomers.filter(customers => customers.Submitter === this.authService.username);
          for (let i = 0; i < this.newCustomer.length; i++) {

            let SubPoints = this.newCustomer[i].Points;
            this.GetSummation(parseInt(SubPoints, 10));

          }
        });
    for (let i = 0; i < this.exists.length; i++) {
      this.isCollapsed[i] = true;
    }

    // Updating Total Points
    this.ExistService.getSumUpdatedListener()
      .subscribe((data: string) => {
        console.log(data);
        // this.GetSummation(parseInt(data, 10));
      });

    this.ExistService.getSum1UpdatedListener()
      .subscribe((data2: string) => {
        console.log(data2);
        // this.GetSummation(parseInt(data2, 10));
    });

    this.ExistService.getSum5UpdatedListener()
      .subscribe((data3: string) => {
        console.log(data3);
        // this.GetSummation(parseInt(data3, 10));
      });

    // this.sum = (this.ExistService.sum2 + this.ExistService.sum3 + this.ExistService.sum4).toString();
    console.log(this.sum);
    }


  }

  GetSummation(Total) {
    console.log(Total);
    this.sum = this.sum + Total;
    console.log(this.sum);
  }

  ResubmitExist(id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail: string, ContactPosition: string,
     Product: string,
     Description: string) {

    console.log(ContactEmail);
    this.ExistService.UpdatePostContent(id, CompanyName, ContactName, ContactPhone, ContactEmail, ContactPosition, Product, Description,
       'Submission Received');
    window.location.reload();
  }

  ResubmitNew(id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail: string, Product: string,
    Description: string) {

   console.log(ContactEmail);
   this.ExistService.UpdateNewContent(id, CompanyName, ContactName, ContactPhone, ContactEmail, Product, Description,
     'Submission Received');
    window.location.reload();
 }

 ResubmitContact(id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail: string, Position: string,
  Description: string) {

 console.log(ContactEmail);
 this.ExistService.UpdateContactContent(id, CompanyName, ContactName, ContactPhone, ContactEmail, Position, Description,
   'Submission Received');
 window.location.reload();
}

  onBackClick() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.authService.isAuthenticated) {

      this.ExistSub.unsubscribe();
      this.ContactSub.unsubscribe();
      this.CustomerSub.unsubscribe();

    }

  }



}
