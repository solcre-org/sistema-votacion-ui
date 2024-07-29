import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

    sendVote(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote/create`, data).pipe(
      tap(response => console.log('Formulario enviado con éxito', response)),
      catchError(error => {
        console.error('Error al enviar el formulario', error);
        throw error;
      })
    );
  }

  getCandidates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/voter/get_candidate`).pipe(
      tap(response => console.log('Candidatos obtenidos con éxito', response)),
      catchError(error => {
        console.error('Error al obtener candidatos', error);
        throw error;
      })
    );
  }
  
  viewVotesByCandidate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vote/votes/order`).pipe(
      tap(response => console.log('Resultados obtenidos con éxito', response)),
      catchError(error =>{
        console.log('Error al obtener resultados', error);
        throw error;   
      })
    );  
  }

  viewAllVotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vote/get_all_votes`).pipe(
      tap(response => console.log('Todos los votos listados obtenidos con éxito', response)),
      catchError(error =>{
        console.log('Error al obtener votos', error);
        throw error;
      })
    );
  }

  addNewVoter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/voter/create`, data).pipe(
      tap(response => console.log('Votante creado con éxito', response)),
      catchError(error => {
        console.error('Error al agregar votante', error);
        return error;
      })
    );
  }
}