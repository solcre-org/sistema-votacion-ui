import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  constructor(
    private router: Router
  ) {}

  viewVotesByCandidate(): void {
    this.router.navigate(['/admin/view-votes']);
  }

  viewAllVotes(): void {
    this.router.navigate(['admin/view-all-voters']);
  }

  addVoter(): void {
    this.router.navigate(['admin/add-new-voter']);
  }

  updatePassword(): void {}

  returnPreviousPage(): void {
    this.router.navigate(['/login']);
  }

}
