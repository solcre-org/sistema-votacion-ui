import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  message: string = '';
  success: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private apiService: ApiService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandler
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.apiService.login(username, password).subscribe({
        next: (response) => {
          if (response && response.access_token) {
            this.authService.login(response.access_token);
            this.router.navigate(['/admin']);
            this.success = true;
            this.message = 'Inicio de sesión exitoso';
          }
        },
        error: (err) => {
          this.success = false;
          this.message = this.errorHandlerService.handleError(err) || 'error desconocido';

        }
      });
    } else {
      this.success = false;
      this.message = 'Por favor, completa todos los campos.';
    }
  }
  

  returnPreviousPage(): void {
    this.router.navigate(['/']);
  }
}
