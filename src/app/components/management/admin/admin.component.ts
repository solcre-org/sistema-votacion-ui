import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ViewAllVotesComponent } from '../view-all-votes/view-all-votes.component';
import { ViewVotesComponent } from '../view-votes/view-votes.component';
import { ViewAllVotersComponent } from '../update-voter/update-voter.component';
import { AddVoterComponent } from '../add-voter/add-voter.component';
import { UpdateAdminComponent } from '../update-admin/update-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ViewAllVotesComponent, ViewAllVotersComponent, ViewVotesComponent, AddVoterComponent, UpdateAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  showResults = false;
  showAllVotes = false;
  showAddVoter = false;
  showUpdateVoter = false;
  showUpdateAdmin = false;

  
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  viewVotesByCandidate(): void {
    this.showResults = !this.showResults;
  }

  viewAllVotes(): void {
    this.showAllVotes = !this.showAllVotes;
  }

  addVoter(): void {
    this.showAddVoter = !this.showAddVoter;
  }

  updateVoter(): void {
    this.showUpdateVoter =!this.showUpdateVoter
  }

  updatePassword(): void {
    this.showUpdateAdmin = !this.showUpdateAdmin;
  }

  returnPreviousPage(): void {
    this.router.navigate(['/login']);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
