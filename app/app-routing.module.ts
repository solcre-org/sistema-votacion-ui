import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { VotingFormComponent } from './components/voting-form/voting-form.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewVotesComponent } from './components/view-votes/view-votes.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import { ViewAllVotesComponent } from './components/view-all-votes/view-all-votes.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/view-votes', component: ViewVotesComponent },
  { path: 'admin/add-new-voter', component: AddVoterComponent},
  { path: 'admin/view-all-voters', component: ViewAllVotesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
