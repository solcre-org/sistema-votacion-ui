import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Vote } from '../models/vote.interface';
import { Voter } from '../models/voter.interface';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendVote(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote/create`, data).pipe(
      tap(response => console.log('Formulario enviado con éxito', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  addNewVoter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/voter/create`, data).pipe(
      tap(response => console.log('Votante creado con éxito', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  getCandidates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/voter/get_candidate`).pipe(
      tap(response => console.log('Candidatos obtenidos con éxito', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  viewVotesByCandidate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vote/votes/order`).pipe(
      tap(response => console.log('Resultados obtenidos con éxito', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  viewAllVotes(): Observable<Vote[]> {
    return this.http.get(`${this.apiUrl}/vote/get_all_votes`).pipe(
      tap(response => console.log('Todos los votos listados obtenidos con éxito', response)),
      map((respose: any) => {
        //Magia
        return <Vote[]>respose
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  viewAllVoters(): Observable<Voter[]>{
    return this.http.get(`${this.apiUrl}/voter/get_voters`).pipe(
      tap(response => console.log('Todos los votantes obtenidos con exito', response)),
      map((response: any) => {
        return <Voter[]>response
        catchError(error => {
          throw error;
        })
      }),
    );
  }

  login(username: string, password: string): Observable<{ access_token: string }> {
    const body = new HttpParams().set('username', username).set('password', password);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<{ access_token: string }>(`${this.apiUrl}/token`, body.toString(), { headers }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
        console.log('Token guardado:', response.access_token);
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  update_voter(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/voter/voters/${id}`, data).pipe(
      tap(response => console.log('Datos cambiados con éxito', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  update_password(newPassword: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.apiUrl}/admins/password`, { new_password: newPassword }, { headers });
  }
}