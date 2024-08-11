import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { Candidates } from '../../../shared/models/candidate.interface';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-view-votes',
  standalone: true,
  templateUrl: './view-votes.component.html',
  styleUrls: ['./view-votes.component.css'],
  imports: [CommonModule]
})

export class ViewVotesComponent implements OnInit{
  loading: boolean = false;
  votes: Candidates[] = [];
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.loading = true;

    this.apiService.viewVotesByCandidate().subscribe({
      next: (data: Candidates[]) => {
        this.votes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los votos', error);
        this.loading = false;
      }
    });
  }
  

}  
  
  
