import { Component, OnInit, OnDestroy, Output, OnChanges } from '@angular/core';
import { ExistPost } from '../Exist.service';
import { AdminModel } from '../Admin.model';
import { CustomerModel } from '../Customer.model';
import { Exist } from '../Exist.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NewCustomer } from '../New.model';
import { Contact } from '../Contact.model';
import { ScoreBoard } from '../ScoreBoard.model';
// import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit, OnDestroy {
  userselected: any [] = [];
  customerselected: any [] = [];
  exists: Exist[] = [];
  newCust: NewCustomer[] = [];
  Contacts: Contact[] = [];
  Admins: AdminModel[] = [];
  Customers: CustomerModel[] = [];
  private ExistSub: Subscription;
  private NewSub: Subscription;
  private AdminExist: Subscription;
  private CustomerExist: Subscription;
  points = -1;
  Status: string;
  public searchString: string;
  London: number;
  Paris: number;
  Tokyo: number;
  PointArray: ScoreBoard[] = [];

  constructor(private router: Router, public ExistService: ExistPost) {}

  ngOnInit() {
    this.PointArray = [];

    this.ExistService.getExisting();
    this.ExistService.getNew();
    this.ExistSub = this.ExistService.getPostUpdatedListener()
      .subscribe((ExistingCustomers: Exist[]) => {
        this.exists = ExistingCustomers;


      });

      this.NewSub = this.ExistService.getNewPostUpdatedListener()
      .subscribe((NewCustomers: NewCustomer[]) => {
      this.newCust = NewCustomers;
      // this.GetUserPoints(this.newCust);
    });


    this.ExistService.getContact();
    this.ExistSub = this.ExistService.getContactUpdatedListener()
      .subscribe((Contacts: Contact[]) => {
        this.Contacts = Contacts;

      });

    this.ExistService.getAdmin();
    this.AdminExist = this.ExistService.getAdminListener()
      .subscribe((ExistingAdmins: AdminModel[]) => {
        this.Admins = ExistingAdmins;
    });
    this.ExistService.getCustomer();
    this.CustomerExist = this.ExistService.getCustomerListener()
      .subscribe((CustomersExisting: CustomerModel[]) => {
        this.Customers = CustomersExisting;
    });
  }


  ngOnDestroy() {
    this.ExistSub.unsubscribe();
    this.PointArray = null;
  }



  addAdmin(username: string) {
    console.log(this.PointArray);
    const admin: AdminModel = {
      Username: username.toLowerCase()
    };
    this.ExistService.adminAdded(admin);
  }

  addCustomer(CustomerName: string) {
    const Customer: CustomerModel = {
      Customername: CustomerName.toLowerCase()
    };
    this.ExistService.CustomerAdded(Customer);

  }

  OnCheck(checkbox, username: any) {
    if (checkbox.checked) {
      this.userselected.push(username);
    } else {
      delete this.userselected[username];
    }
  }

  removeAdmin() {
    this.userselected.forEach((item, index) => {

      const admin: AdminModel = {
        Username: item
      };
      this.ExistService.adminRemoved(admin);
      console.log(index);
      this.userselected.splice(index, 1);
    });


  }


  removeCustomer() {
    this.customerselected.forEach((item, index) => {
      console.log(item);
      const customer: CustomerModel = {
        Customername: item
      };
      this.ExistService.CustomerRemoved(customer);
      this.customerselected.splice(index, 1);
    });


  }

  updateCheckedOptions(username, event) {

    if (event.target.checked) {
      console.log('checked');
      this.userselected.push(username);
    } else {
      console.log('unchecked');
      this.userselected.splice(this.userselected.indexOf(username), 1);
    }

  }

  updateCheckedCustomers(customername, event) {

    if (event.target.checked) {
      console.log('checked');
      this.customerselected.push(customername);
    } else {
      console.log('unchecked');
      this.customerselected.splice(this.customerselected.indexOf(customername), 1);
    }

  }

  onBackClick() {
    this.router.navigate(['/']);
  }




}
