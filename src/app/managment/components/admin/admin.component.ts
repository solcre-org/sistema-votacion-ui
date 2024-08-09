import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ViewAllVotesComponent } from '../../../managment/pages/view-all-votes/view-all-votes.component';
import { ViewVotesComponent } from '../../../managment/pages/view-votes/view-votes.component';
import { ViewAllVotersComponent } from '../../../managment/pages/update-voter/update-voter.component';
import { AddVoterComponent } from '../../../managment/pages/add-voter/add-voter.component';
import { UpdateAdminComponent } from '../../../managment/pages/update-admin/update-admin.component';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ViewAllVotesComponent, 
    ViewAllVotersComponent, 
    ViewVotesComponent, 
    AddVoterComponent, 
    UpdateAdminComponent,
    RouterModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
