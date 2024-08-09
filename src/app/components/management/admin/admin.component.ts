import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ViewAllVotesComponent } from '../view-all-votes/view-all-votes.component';
import { ViewVotesComponent } from '../view-votes/view-votes.component';
import { ViewAllVotersComponent } from '../update-voter/update-voter.component';
import { AddVoterComponent } from '../add-voter/add-voter.component';
import { UpdateAdminComponent } from '../update-admin/update-admin.component';
import { AuthService } from '../../auth/auth.service';


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
    this.router.navigate(['/login']);
  }

}
