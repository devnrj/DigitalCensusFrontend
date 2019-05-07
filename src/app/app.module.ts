import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApproverComponent } from './approver/approver/approver.component';
import { PendingListComponent } from './approver/pending-list/pending-list.component';
import { ApprovedListComponent } from './approver/approved-list/approved-list.component';
import { RejectedListComponent } from './approver/rejected-list/rejected-list.component';
import { VolunteerComponent } from './volunteer/volunteer/volunteer.component';
import { StatusComponent } from './volunteer/status/status.component';
import { AddHouseComponent } from './volunteer/add-house/add-house.component';
import { AddCitizenComponent } from './volunteer/add-citizen/add-citizen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForebiddenComponent } from './forebidden/forebidden.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ApproverComponent,
    PendingListComponent,
    ApprovedListComponent,
    RejectedListComponent,
    VolunteerComponent,
    StatusComponent,
    AddHouseComponent,
    AddCitizenComponent,
    LoginComponent,
    RegisterComponent,
    ForebiddenComponent,
    NotfoundComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
