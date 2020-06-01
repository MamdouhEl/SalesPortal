import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ExistPost } from '../Exist.service';
import { AdminModel } from '../Admin.model';
import { CustomerModel } from '../Customer.model';
import { Exist } from '../Exist.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NewCustomer } from '../New.model';
import {ExcelService} from '../ExportCSV/excel.service';

@Component({
  selector: 'app-existing-customer-submissions',
  templateUrl: './existing-customer-submissions.component.html',
  styleUrls: ['./existing-customer-submissions.component.css']
})
export class ExistingCustomerSubmissionsComponent implements OnInit, OnDestroy {


  userselected: any [] = [];
  customerselected: any [] = [];
  exists: Exist[] = [];
  newCust: NewCustomer[] = [];
  Admins: AdminModel[] = [];
  Customers: CustomerModel[] = [];
  private ExistSub: Subscription;
  private NewSub: Subscription;
  private AdminExist: Subscription;
  private CustomerExist: Subscription;
  points = -1;
  Status: string;
  public searchString: string;


  constructor(private router: Router, public ExistService: ExistPost, private excelService: ExcelService) {}

  ngOnInit() {

    this.ExistService.getExisting();
    this.ExistSub = this.ExistService.getPostUpdatedListener()
      .subscribe((ExistingCustomers: Exist[]) => {
        this.exists = ExistingCustomers;
      });
  }


  ngOnDestroy() {
    this.ExistSub.unsubscribe();

  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.exists, 'ExistingCustomerSubmission');
 }

  onAccept(points: string, id: string, Cpoints: string) {
    if (points === '0') {
      this.points = parseInt(points, 10);
      this.Status = 'Submission Received';
    } else if (points === '-1') {
      this.points = parseInt(points, 10);
      this.Status = 'Returned';
      this.ExistService.editable[id] = true;
    } else if (points === '1') {
      this.points = parseInt(points, 10);
      this.Status = 'Pending Validation';
      this.ExistService.editable[id] = true;
    } else if (points === '5' || points === '10' || points === '15') {
      if (parseInt(points, 10) === -1) {
        this.points = parseInt(Cpoints, 10) + parseInt(points, 10) + 1;
      } else {
        this.points = parseInt(Cpoints, 10) + parseInt(points, 10);
      }

      this.Status = 'In progress';
    } else if (points === '50' || points === '100' || points === '200') {
      this.points = parseInt(Cpoints, 10) + parseInt(points, 10);
      this.Status = 'Win';
    } else if (points === '20') {
      this.points = parseInt(Cpoints, 10) + parseInt(points, 10);
      this.Status = 'lost';
    } else if (points === '') {
      return;
    }
    this.exists[+id - 1].Points = this.points.toString();
    this.exists[+id - 1].Status = this.Status;
    this.ExistService.UpdatePost(id, String(this.points), this.Status);

  }

}
