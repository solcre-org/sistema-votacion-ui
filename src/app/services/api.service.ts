import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Vote } from '../models/vote.interface';
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

  addNewVoter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/voter/create`, data).pipe(
      tap(response => console.log('Votante creado con éxito', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  login(username: string, password: string): Observable<{ access_token: string }> {

    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<{ access_token: string }>(`${this.apiUrl}/token`, body.toString(), { headers }).pipe(
      tap(response => console.log('Login exitoso', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  update_admin(admin_id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admins/${admin_id}`, data).pipe(
      tap(response => console.log('Datos cambiados con éxito', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}