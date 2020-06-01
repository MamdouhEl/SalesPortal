import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ExistingCustomerComponent } from './existing-customer/existing-customer.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { AccountComponent } from './account/account.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { NewCustomerSubmissionsComponent } from './new-customer-submissions/new-customer-submissions.component';
import { ExistingCustomerSubmissionsComponent } from './existing-customer-submissions/existing-customer-submissions.component';
import { ConnectionInfoSubmissionsComponent } from './connection-info-submissions/connection-info-submissions.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'NewCustomer', component: NewCustomerComponent },
  { path: 'ExistingCustomer', component: ExistingCustomerComponent },
  { path: 'ContactInfo', component: ContactInfoComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'AdminAccount', component: AdminAccountComponent, canActivate: [AuthGuard] , children: [
    { path: 'newSubmissions', component: NewCustomerSubmissionsComponent},
    { path: 'existSubmissions', component: ExistingCustomerSubmissionsComponent},
    { path: 'connectionSubmissions', component: ConnectionInfoSubmissionsComponent},
  ]},
  { path: 'About', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Opportunities', component: OpportunitiesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
