import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.css'
})

export class UpdateAdminComponent {

  form: FormGroup;
  message: string = '';
  success: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const { newPassword } = this.form.value;
      this.apiService.update_password(newPassword).subscribe({
        next: () => {
          alert('Contraseña actualizada correctamente');
        },
        error: (error) => {
          this.error = 'No se pudo actualizar la contraseña.';
        }
      });
    }
  }
}
