import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  form: FormGroup;
  message: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.sendPasswordResetLink(this.form.value.email).subscribe({
        next: () => {
          this.success = true;
          this.message = 'Se ha enviado un enlace de recuperación a su correo electrónico.';
        },
        error: (error) => {
          this.success = false;
          this.message = this.errorHandlerService.handleError(error);
          console.error('Error al enviar el enlace de recuperación', error);
        }
      });
    } else {
      this.success = false;
      this.message = 'Por favor, introduzca una dirección de correo electrónico válida.';
    }
  }
}
