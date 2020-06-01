import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  constructor() { }

  ShowDisclaimer = false;

  Disclaimer = ``;

  ngOnInit() {
  }

  onDisclaimer() {
    this.Disclaimer = null;
    this.ShowDisclaimer = false;
  }

  onView() {
    this.ShowDisclaimer = true;
  }


}
