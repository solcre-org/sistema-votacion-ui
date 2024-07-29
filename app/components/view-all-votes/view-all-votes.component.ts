import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Vote } from '../../models/vote.interface';

@Component({
  selector: 'app-view-all-votes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-votes.component.html',
  styleUrls: ['./view-all-votes.component.css']
})
export class ViewAllVotesComponent implements OnInit{
  votes: Vote[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {

    this.apiService.viewAllVotes().subscribe({
      next: (data: Vote[]) => {
        this.votes = data;
      },
      error: (error) => {
        console.error('Error al obtener el detalle de todos los votos', error);
      }
    });
  }
}