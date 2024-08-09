import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { ViewVotesComponent } from './managment/pages/view-votes/view-votes.component';
import { ViewAllVotesComponent } from './managment/pages/view-all-votes/view-all-votes.component';
import { AddVoterComponent } from './managment/pages/add-voter/add-voter.component';
import { ViewAllVotersComponent } from './managment/pages/update-voter/update-voter.component';
import { UpdateAdminComponent } from './managment/pages/update-admin/update-admin.component';
import { AuthGuard } from './auth/guards/auth.guards';
import { VoteComponent } from './vote/pages/vote/vote.component';
import { AdminComponent } from './managment/components/admin/admin.component';
import { WelcomeComponent } from './managment/pages/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: VoteComponent },
  { 
    path: 'auth', 
    children: [
      {
        path: '', 
        component: LoginComponent,
      },
      { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent 
      },
      {   
        path: 'reset-password', 
        component: ResetPasswordComponent 
      },
    ]
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '', 
        component: WelcomeComponent,
      },
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
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
