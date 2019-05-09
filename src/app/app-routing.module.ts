import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { VolunteerComponent } from './volunteer/volunteer/volunteer.component';
import { StatusComponent } from './volunteer/status/status.component';
import { ApproverComponent } from './approver/approver/approver.component';
import { PendingListComponent } from './approver/pending-list/pending-list.component';
import { ApprovedListComponent } from './approver/approved-list/approved-list.component';
import { RejectedListComponent } from './approver/rejected-list/rejected-list.component';
import { AddHouseComponent } from './volunteer/add-house/add-house.component';
import { AddCitizenComponent } from './volunteer/add-citizen/add-citizen.component';
import { ForebiddenComponent } from './forebidden/forebidden.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent} from './notfound/notfound.component';
import { ChartComponent } from './chart/chart.component';
const routes: Routes = [
  { path: 'chart', component: ChartComponent},  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'volunteer', redirectTo: 'house', pathMatch: 'full', canActivate:[AuthGuard] },
  { path: 'status', component: StatusComponent, canActivate:[AuthGuard] },
  { path: 'approver', redirectTo: 'pending', pathMatch: 'full', canActivate:[AuthGuard]  },
  { path: 'pending', component: PendingListComponent, canActivate:[AuthGuard]  },
  { path: 'approved', component: ApprovedListComponent, canActivate:[AuthGuard]  },
  { path: 'rejected', component: RejectedListComponent, canActivate:[AuthGuard]  },
  { path: 'house', component: AddHouseComponent, canActivate:[AuthGuard] },
  { path: 'citizen', component: AddCitizenComponent, canActivate:[AuthGuard] },
  { path: 'forebidden', component: ForebiddenComponent},
  { path: '', redirectTo: 'chart', pathMatch: 'full' },
  { path: '**', component : NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
