import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {NgForOf, NgIf, NgClass} from "@angular/common";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';




@Component({
  selector: 'app-voting-form',
  standalone: true,
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.css'],
  imports: [ReactiveFormsModule, NgForOf, NgIf, NgClass, CommonModule],
})

export class VotingFormComponent implements OnInit {
  form: FormGroup;
  candidates: any[] = [];
  message: string = '';
  success: boolean = true;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.fb.group({
      document: ['', Validators.required],
      candidate_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getCandidates().subscribe(
      (data: any) => {
        this.candidates = data;
      },
      (error) => {
        console.error('Error al obtener candidatos', error);
      }
    );
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
      console.error('Formulario inválido');
      this.success = false;
      this.message = 'Formulario inválido';
    }
  }

  handleError(error: any): void {
    this.success = false;
    if (error.status === 404) {
      if (error.error.detail === "Documento no válido.") {
        this.message = "Documento no válido.";
      } else if (error.error.detail === "Votante no registrado.") {
        this.message = "Votante no registrado.";
      } else if (error.error.detail === "Candidato no encontrado.") {
        this.message = "Candidato no encontrado.";
      }
    } else if (error.status === 400) {
      if (error.error.detail === "El votante ya ha votado.") {
        this.message = "El votante ya ha votado.";
      }
    } else {
      this.message = "Error al registrar el voto.";
    }
    console.error('Error al registrar el voto', error);
  }
}