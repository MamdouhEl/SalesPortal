import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {
  selectedNav: String;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ChangeView (Page: String) {
    if(Page === 'New Customer') {
      this.router.navigate(['/NewCustomer']);
    } else {
      this.router.navigate(['/ExistingCustomer']);
    }

  }

}
