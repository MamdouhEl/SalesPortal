import { Exist } from './Exist.model';
import { AdminModel } from './Admin.model';
import { CustomerModel } from './Customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NewCustomer } from './New.model';
import { Contact } from './Contact.model';
import { map } from 'rxjs/operators';
import { ScoreBoard } from './ScoreBoard.model';


@Injectable({providedIn: 'root'})
export class ExistPost {
  constructor (private http: HttpClient) {}
  private existpost: Exist[] = [];
  ScoreBoard: ScoreBoard[] = [];
  private Contactpost: Contact[] = [];
  private admin: AdminModel[] = [];
  private Customer: CustomerModel[] = [];
  private newpost: NewCustomer[] = [];
  private PostUpdated = new Subject<Exist[]>();
  private ContactUpdated = new Subject<Contact[]>();
  private ScoreBoardUpdated = new Subject<ScoreBoard[]>();
  private newPostUpdated = new Subject<NewCustomer[]>();
  private adminUpdated = new Subject<AdminModel[]>();
  private CustomerUpdated = new Subject<CustomerModel[]>();
  editable: boolean [] = [];
  sum2: number;
  sum3: number;
  sum4: number;
  Existpostlength = 0;
  ScoreBoardlength = 0;
  Newpostlength = 0;
  Contactpostlength = 0;
  // Observable string source
  private sum = new Subject<string>();
  private sum1 = new Subject<string>();
  private sum5 = new Subject<string>();

  // Observable string stream
  getSumUpdatedListener () {
    return this.sum.asObservable();
  }

  getSum1UpdatedListener () {
    return this.sum1.asObservable();
  }

  getSum5UpdatedListener () {
    return this.sum5.asObservable();
  }

  getUserSubmissions(username: string) {

    this.http.get<{message: string, Posts: any}>('http://dummy.com:3000/api/userSub/' + username)
    .pipe(map((postData) => {
      return postData.Posts.map(Posts => {
        console.log(Posts.id);
        return {
          id: Posts.id,
          Submitter: Posts.Submitter,
          CompanyName: Posts.CompanyName,
          ContactName: Posts.ContactName,
          ContactPhone: Posts.ContactPhone,
          ContactEmail: Posts.ContactEmail,
          Description: Posts.Description,
          Product: Posts.Product,
          Status: Posts.Status,
          Points: Posts.Points
        };
      });
    }))
    .subscribe((transformedExist) => {
      this.existpost = transformedExist;
      this.sum2 = 0;
      for (let i = 0; i < this.existpost.length; i++) {

        this.sum2 += parseInt(this.existpost[i].Points, 10);

      }
      console.log(this.Contactpost.length);
      this.Existpostlength = this.existpost.length;
      this.sum.next(this.sum2.toString());
      this.PostUpdated.next([...this.existpost]);
    });

  }

  getContact() {
    this.http.get<{message: string, Posts: any}>('http://dummy.com:3000/api/newcontacts')
    .pipe(map((ContactData) => {
      return ContactData.Posts.map(Posts => {
        return {
          id: Posts.id,
          Submitter: Posts.Submitter,
          Customer: Posts.Customer,
          ContactName: Posts.ContactName,
          ContactEmail: Posts.ContactEmail,
          ContactPhone: Posts.ContactPhone,
          ContactPosition: Posts.ContactPosition,
          Comment: Posts.Comment,
          Status: Posts.Status,
          Points: Posts.Points,
          Date: Posts.Date
        };
      });
    }))
    .subscribe((transformedExist) => {
      this.Contactpost = transformedExist;
      this.sum4 = 0;
      for (let i = 0; i < this.Contactpost.length; i++) {

        this.sum4 += parseInt(this.Contactpost[i].Points, 10);


      }
      console.log(this.Contactpost.length);
      this.Contactpostlength = this.Contactpost.length;
      this.sum5.next(this.sum4.toString());
      this.ContactUpdated.next([...this.Contactpost]);
    });

  }

  getExisting() {
    this.http.get<{message: string, Posts: any}>('http://dummy.com:3000/api/posts')
    .pipe(map((postData) => {
      return postData.Posts.map(Posts => {
        console.log(Posts.id);
        return {
          id: Posts.id,
          Submitter: Posts.Submitter,
          CompanyName: Posts.CompanyName,
          ContactName: Posts.ContactName,
          ContactPhone: Posts.ContactPhone,
          ContactEmail: Posts.ContactEmail,
          ContactPosition: Posts.ContactPosition,
          Description: Posts.Description,
          Product: Posts.Product,
          Status: Posts.Status,
          Points: Posts.Points,
          Date: Posts.Date
        };
      });
    }))
    .subscribe((transformedExist) => {
      this.existpost = transformedExist;
      this.sum2 = 0;
      for (let i = 0; i < this.existpost.length; i++) {

        this.sum2 += parseInt(this.existpost[i].Points, 10);


      }
      this.Existpostlength = this.existpost.length;
      this.sum.next(this.sum2.toString());
      this.PostUpdated.next([...this.existpost]);
    });

  }

  getNewOne(id) {
    this.http.get<{message: string, Posts: any}>('http://dummy.com:3000/api/newposts' + id)
    .subscribe((response) => {
      return response.Posts.id;
    });
  }
  getNew() {
    this.http.get<{message: string, Posts: any}>('http://dummy.com:3000/api/newposts')
    .pipe(map((postData) => {
      return postData.Posts.map(Posts => {
        console.log(Posts.id);
        return {
          id: Posts.id,
          Submitter: Posts.Submitter,
          CompanyName: Posts.CompanyName,
          ContactName: Posts.ContactName,
          ContactPhone: Posts.ContactPhone,
          ContactEmail: Posts.ContactEmail,
          Description: Posts.Description,
          Status: Posts.Status,
          Points: Posts.Points,
          Date: Posts.Date
        };
      });
    }))
    .subscribe((newpostData) => {
      this.newpost = newpostData;
      this.sum3 = 0;
      for (let i = 0; i < this.newpost.length; i++) {

        this.sum3 += parseInt(this.newpost[i].Points, 10);


      }
      this.Newpostlength = this.newpost.length;
      this.sum1.next(this.sum3.toString());
      this.newPostUpdated.next([...this.newpost]);
    });

  }

  getPostUpdatedListener() {
    return this.PostUpdated.asObservable();
  }

  getContactUpdatedListener() {
    return this.ContactUpdated.asObservable();
  }

  getNewPostUpdatedListener() {
    return this.newPostUpdated.asObservable();
  }

  addExist(exist: Exist) {
    const existnew: Exist = exist;
    this.http.post<{message: string}>('http://dummy.com:3000/api/posts', existnew)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.existpost.push(existnew);
      this.PostUpdated.next([...this.existpost]);

    });
    this.getSumUpdatedListener();
  }
  addNew(newCustomer: NewCustomer) {
    const newSub: NewCustomer = newCustomer;
    this.http.post<{message: string}>('http://dummy.com:3000/api/newposts', newSub)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.newpost.push(newCustomer);
      this.newPostUpdated.next([...this.newpost]);

    });
    this.getSum1UpdatedListener();
  }

  addContact(newContact: Contact) {
    this.http.post<{message: string}>('http://dummy.com:3000/api/newcontacts', newContact)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.Contactpost.push(newContact);
      this.ContactUpdated.next([...this.Contactpost]);
    });
  }

  UpdatePost(Id: string, Points: string, Status: string) {
    this.http.put('http://dummy.com:3000/api/posts/' + Id, {Id, Points, Status})
    .subscribe(() => {
      console.log('Updated!');
      this.PostUpdated.next([...this.existpost]);
    });
  }

  UpdateContact(Id: string, Points: string, Status: string) {
    this.http.put('http://dummy.com:3000/api/newcontacts/' + Id, {Id, Points, Status})
    .subscribe(() => {
      console.log('Updated!');
      this.ContactUpdated.next([...this.Contactpost]);
    });
  }

  UpdateNewCustomer(Id: string, Points: string, Status: string) {
    this.http.put('http://dummy.com:3000/api/newposts/' + Id, {Id, Points, Status})
    .subscribe(() => {
      console.log('Updated!');
      this.newPostUpdated.next([...this.newpost]);
    });
  }

  UpdateNewCustomerContent(Id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail, Product: string,
    Description: string, Status: string) {
   this.http.put('http://dummy.com:3000/api/newposts/' + Id, {Id, CompanyName, ContactName, ContactPhone, ContactEmail,
   Description, Status})
   .subscribe(() => {
     console.log('Updated!');
     this.newPostUpdated.next([...this.newpost]);
   });
 }

  UpdatePostContent(Id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail, ContactPosition: string,
     Product: string,
     Description: string, Status: string) {
    this.http.put('http://dummy.com:3000/api/posts/' + Id, {Id, CompanyName, ContactName, ContactPhone, ContactEmail
    , ContactPosition,
     Product, Description, Status})
    .subscribe(() => {
      console.log('Updated!');
      this.PostUpdated.next([...this.existpost]);
    });
  }

  UpdateNewContent(Id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail, Product: string,
    Description: string, Status: string) {
   this.http.put('http://dummy.com:3000/api/newposts/' + Id, {Id, CompanyName, ContactName, ContactPhone, ContactEmail,
    Product, Description, Status})
   .subscribe(() => {
     console.log('Updated!');
     this.newPostUpdated.next([...this.newpost]);
   });
 }

 UpdateContactContent(Id: string, CompanyName: string, ContactName: string, ContactPhone: string, ContactEmail, Position: string,
  Description: string, Status: string) {
 this.http.put('http://dummy.com:3000/api/newcontacts/' + Id, {Id, CompanyName, ContactName, ContactPhone, ContactEmail,
  Position, Description, Status})
 .subscribe(() => {
   console.log('Updated!');
   this.ContactUpdated.next([...this.Contactpost]);
 });
}

  adminAdded(admin: AdminModel) {
    const id = 1;
    this.http.post<{message: string}>('http://dummy.com:3000/api/admin', {id, admin})
    .subscribe(() => {
      console.log(admin);
      this.admin.push(admin);
      this.adminUpdated.next([...this.admin]);
    });
  }

  CustomerAdded(Cust: CustomerModel) {
    const id = 2;
    this.http.post<{message: string}>('http://dummy.com:3000/api/admin', {id, Cust})
    .subscribe(() => {
      console.log(Cust);
      this.Customer.push(Cust);
      this.CustomerUpdated.next([...this.Customer]);
    });
  }

  getAdmin() {
    this.http.get<{message: string, admins: any}>('http://dummy.com:3000/api/admins')
    .pipe(map((adminData) => {
      return adminData.admins.map(admins => {
        return {
          Username: admins.username.toLowerCase()
        };
      });
    }))
    .subscribe((newpostData) => {
      this.admin = newpostData;
      console.log(newpostData);
      this.adminUpdated.next([...this.admin]);
    });

  }

  getCustomer() {
    this.http.get<{message: string, customers: any}>('http://dummy.com:3000/api/admins')
    .pipe(map((customerData) => {
      return customerData.customers.map(customers => {
        return {
          Customername: customers.Customername.toLowerCase()
        };
      });
    }))
    .subscribe((newcustomerData) => {
      this.Customer = newcustomerData;
      console.log(newcustomerData);
      this.CustomerUpdated.next([...this.Customer]);
    });

  }

  getAdminListener() {
    return this.adminUpdated.asObservable();
  }

  getCustomerListener() {
    return this.CustomerUpdated.asObservable();
  }

  adminRemoved(admin: AdminModel) {
    const id = 1;
    console.log(admin.Username);
    this.http.delete('http://dummy.com:3000/api/admin/' + admin.Username)
      .subscribe(() => {
        const updatedAdmins = this.admin.filter(admins => admins.Username !== admin.Username);
        this.admin = updatedAdmins;
        this.adminUpdated.next([...this.admin]);
      });
  }

  CustomerRemoved(customer: CustomerModel) {
    const id = 2;
    console.log(customer.Customername);
    this.http.delete('http://dummy.com:3000/api/admins/' + customer.Customername)
      .subscribe(() => {
        const updatedCustomers = this.Customer.filter(customers => customers.Customername !== customer.Customername);
        this.Customer = updatedCustomers;
        this.CustomerUpdated.next([...this.Customer]);
      });
  }

  FindinScoreBoard (UserName: string) {
    this.http.get<{message: string, ScoreBoard: any}>('http://dummy.com:3000/api/ScoreBoard/' + UserName)
    .pipe(map((postData) => {
      return postData.ScoreBoard.map(Posts => {
        return {
          UserName: Posts.UserName,
          Points: Posts.Points
        };
      });
    }))
    .subscribe((transformedScoreBoard) => {

        this.ScoreBoard = transformedScoreBoard;
        this.ScoreBoardlength = this.ScoreBoard.length;
        this.ScoreBoardUpdated.next([...this.ScoreBoard]);
    });
  }

  getScoreBoardListener() {
    return this.ScoreBoardUpdated.asObservable();
  }

  UpdateScoreBoard (UserName: string, Points: string) {

    this.http.put('http://dummy.com:3000/api/ScoreBoard/' , {UserName, Points})
    .subscribe((responseData) => {
      console.log('Updated!');
      this.ScoreBoardUpdated.next([...this.ScoreBoard]);
 });

  }

  AddtoScoreBoard(ScoreBoardEntry: ScoreBoard) {
    this.http.post<{message: string}>('http://dummy.com:3000/api/ScoreBoard', ScoreBoardEntry)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.ScoreBoard.push(ScoreBoardEntry);
        this.ScoreBoardUpdated.next([...this.ScoreBoard]);
      });
  }

}
