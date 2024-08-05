import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VoteComponent } from './components/home/vote/vote.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/management/admin/admin.component';

export const routes: Routes = [
  { path: '', component: VoteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
