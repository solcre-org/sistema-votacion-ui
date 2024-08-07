import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Voter } from '../../../models/voter.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-voters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-voter.component.html',
  styleUrls: ['./update-voter.component.css']
})
export class ViewAllVotersComponent implements OnInit {
  voters: Voter[] = [];
  selectedVoter: Voter | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.viewAllVoters().subscribe({
      next: (data: Voter[]) => {
        this.voters = data;
      },
      error: (error) => {
        console.error('Error al obtener el detalle de todos los votantes', error);
      }
    });
  }

  selectVoter(voter: Voter): void {
    this.selectedVoter = { ...voter };
  }

  saveVoter(): void {
    if (this.selectedVoter) {
      this.apiService.update_voter(this.selectedVoter.id, this.selectedVoter).subscribe({
        next: (updatedVoter: Voter) => {
          const index = this.voters.findIndex(v => v.id === updatedVoter.id);
          if (index !== -1) {
            this.voters[index] = updatedVoter;
            this.selectedVoter = null; 
          }
        },
        error: (error) => {
          console.error('Error al actualizar el votante', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.selectedVoter = null;
  }
}
