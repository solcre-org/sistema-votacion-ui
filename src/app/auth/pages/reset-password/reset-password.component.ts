import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  form: FormGroup;
  message: string = '';
  success: boolean = false;
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.token = this.route.snapshot.queryParams['token'];
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const token = this.token;
      const newPassword = this.form.get('newPassword')?.value;
  
      this.apiService.resetPassword(token, newPassword).subscribe({
        next: () => {
          this.success = true;
          this.message = 'Contraseña restablecida con éxito.';
          this.router.navigate(['/auth']);
        },
        error: (error: HttpErrorResponse) => {
          this.success = false;
          this.message = this.errorHandlerService.handleError(error);
        }
      });
    } else {
      this.success = false;
      this.message = 'Por favor, introduzca una nueva contraseña válida.';
    }
  }
  
}
