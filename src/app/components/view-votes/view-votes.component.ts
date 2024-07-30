import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Candidates } from '../../models/candidate.interface';

@Component({
  selector: 'app-view-votes',
  standalone: true,
  templateUrl: './view-votes.component.html',
  styleUrls: ['./view-votes.component.css'],
  imports: [CommonModule]
})

export class ViewVotesComponent implements OnInit{
  votes: Candidates[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.apiService.viewVotesByCandidate().subscribe({
      next: (data: Candidates[]) => {
        this.votes = data;
      },
      error: (error) => {
        console.error('Error al obtener los votos', error);
      }
    });
  }
  
  viewVoteDetails(candidate: any): void {
  }
}  
  
  
