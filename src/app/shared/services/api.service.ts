import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Vote } from '../models/vote.interface';
import { Voter } from '../models/voter.interface';
import { environment } from '../../../environments/environment.dev';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  public sendVote(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, data).pipe(
      tap(response => console.log('Formulario enviado con éxito', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  public addNewVoter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/voter`, data).pipe(
      tap(response => console.log('Votante creado con éxito', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  public getCandidates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidate`).pipe(
      tap(response => console.log('Candidatos obtenidos con éxito', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  public viewVotesByCandidate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/votes-order`).pipe(
      tap(response => console.log('Resultados obtenidos con éxito', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  public viewAllVotes(): Observable<Vote[]> {
    return this.http.get(`${this.apiUrl}/votes`).pipe(
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

  public viewAllVoters(): Observable<Voter[]>{
    const token: string | null = this.authService.getToken();
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(`${this.apiUrl}/voters`, { headers }).pipe(
      tap(response => console.log('Todos los votantes obtenidos con exito', response)),
      map((response: any) => {
        return <Voter[]>response
        catchError(error => {
          throw error;
        })
      }),
    );
  }

  public login(email: string, password: string): Observable<{ access_token: string }> {
    const body = { email, password };
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth`, body, { headers }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  public update_voter(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/voter/${id}`, data).pipe(
      tap(response => console.log('Datos cambiados con éxito', response)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public update_password(newPassword: string): Observable<any> {
    const token: string | null = this.authService.getToken();
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.apiUrl}/admin/password`, { new_password: newPassword }, { headers });
  }
  public sendPasswordResetLink(email: string): Observable<any> {
    return this.http.post<void>(`${this.apiUrl}/recover-password`, { email });
  }

  public resetPassword(token: string, newPassword: string): Observable<any> {
    const body = {
      token: token,
      new_password: newPassword
    };
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }
  
}