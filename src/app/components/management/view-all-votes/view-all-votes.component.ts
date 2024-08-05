import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Vote } from '../../../models/vote.interface';

@Component({
  selector: 'app-view-all-votes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-votes.component.html',
  styleUrls: ['./view-all-votes.component.css']
})
export class ViewAllVotesComponent implements OnInit{
  
  votes: Vote[] = [];
  sortedVotes: Vote[] = [];
  currentSortColumn: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.viewAllVotes().subscribe({
      next: (data: Vote[]) => {
        this.votes = data;
        this.sortedVotes = [...this.votes]; 
      },
      error: (error) => {
        console.error('Error al obtener el detalle de todos los votos', error);
      }
    });
  }

  sortData(column: keyof Vote): void {
    if (this.currentSortColumn === column) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }

    this.sortedVotes.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return this.currentSortDirection === 'asc' ? comparison : -comparison;
    });
  }
}