import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './components/home/vote/vote.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/management/admin/admin.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { AuthGuard } from './components/auth/auth.guards';
import { ViewVotesComponent } from './components/management/view-votes/view-votes.component';
import { ViewAllVotesComponent } from './components/management/view-all-votes/view-all-votes.component';
import { AddVoterComponent } from './components/management/add-voter/add-voter.component';
import { ViewAllVotersComponent } from './components/management/update-voter/update-voter.component';
import { UpdateAdminComponent } from './components/management/update-admin/update-admin.component';

export const routes: Routes = [
  { path: '', component: VoteComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: 'view-votes', 
        component: ViewVotesComponent,
      },
      {
        path: 'view-all-votes', 
        component: ViewAllVotesComponent,
      },
      {
        path: 'add-voter', 
        component: AddVoterComponent,
      },
      {
        path: 'update-voter', 
        component: ViewAllVotersComponent,
      },
      {
        path: 'update-password', 
        component: UpdateAdminComponent,
      }
    ]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
