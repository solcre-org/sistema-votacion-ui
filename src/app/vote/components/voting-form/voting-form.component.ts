import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';



@Component({
  selector: 'app-voting-form',
  standalone: true,
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})

export class VotingFormComponent implements OnInit {
  
  form: FormGroup;
  candidates: any[] = [];
  message: string = '';
  success: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.form = this.fb.group({
      document: ['', Validators.required],
      candidate_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getCandidates().subscribe({
      next: (data: any) => {
        this.candidates = data;
    },
      error: (error) => {
        console.error('Error al obtener candidatos', error);
      }
    });
  }
    
  
  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.sendVote(this.form.value).pipe(
        catchError((error) => {
          this.handleError(error);
          return of(null);
        })
      ).subscribe(
        (response) => {
          if (response) {
            this.success = true;
            this.message = 'Voto enviado con éxito'; 
          }
        }
      );
    } else {
      this.success = false;
      this.message = 'Formulario inválido';
    }
  }
  
  handleError(error: any): void {
    this.success = false;
    this.message = this.errorHandlerService.handleError(error);
    console.error('Error al registrar el voto', error);
  }
}