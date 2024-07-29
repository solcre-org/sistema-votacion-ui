import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-add-voter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.css']
})

export class AddVoterComponent implements OnInit{

  form: FormGroup;
  message: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      document: ['', Validators.required],
      dob: ['', [Validators.required, this.dateValidator]],
      is_candidate: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.addNewVoter(this.form.value).subscribe(
        (response) => {
          this.success = true;
          this.message = 'Votante creado con éxito';
          this.form.reset();
        },
        (error) => {
          this.success = false;
          console.error('Error al agregar votante', error);

          if (error.status === 422) {
            if (error.error.detail && Array.isArray(error.error.detail)) {
              const errorMessages = error.error.detail.map((d: any) => `${d.loc.join(' -> ')}: ${d.msg}`);
              this.message = 'Error al agregar votante: ' + errorMessages.join(', ');
            } else if (error.error.detail) {
              this.message = 'Error al agregar votante: ' + error.error.detail;
            } else {
              this.message = 'Error al agregar votante: Datos inválidos.';
            }
          } else {
            this.message = 'Error al agregar votante.';
          }
        }
      );
    } else {
      this.success = false;
      this.message = 'Por favor, complete todos los campos requeridos.';
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return { 'dateInvalid': true };
    }
    return null;
  }
}