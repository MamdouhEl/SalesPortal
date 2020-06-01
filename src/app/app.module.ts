import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { ExistingCustomerComponent } from './existing-customer/existing-customer.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { AccountComponent } from './account/account.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule, MatInputModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsibleModule } from 'angular2-collapsible';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { ExistingCustomerSubmissionsComponent } from './existing-customer-submissions/existing-customer-submissions.component';
import { NewCustomerSubmissionsComponent } from './new-customer-submissions/new-customer-submissions.component';
import { ConnectionInfoSubmissionsComponent } from './connection-info-submissions/connection-info-submissions.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    ExistingCustomerComponent,
    NewCustomerComponent,
    ContactInfoComponent,
    AccountComponent,
    AdminAccountComponent,
    AboutComponent,
    FilterPipe,
    LoginComponent,
    ExistingCustomerSubmissionsComponent,
    NewCustomerSubmissionsComponent,
    ConnectionInfoSubmissionsComponent,
    OpportunitiesComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    CollapsibleModule,
    NgbModule,
  ],
  exports: [
    FilterPipe,
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
