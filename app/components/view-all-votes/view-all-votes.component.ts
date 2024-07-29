import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-votes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-votes.component.html',
  styleUrls: ['./view-all-votes.component.css']
})
export class ViewAllVotesComponent implements OnInit{
  votes: any[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {

    this.apiService.viewAllVotes().subscribe(
      (data: any) => {
        this.votes = data;
      },
      (error) => {
        console.error('Error al obtener el detalle de todos los votos', error);
      }
    );
  }

}
