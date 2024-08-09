import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../shared/services/api.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  message: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private apiService: ApiService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['admin'])
    }
  }

  login(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value; 

      this.loading = true;
      this.message = '';
      this.apiService.login(username, password).subscribe({
        next: (response: any) => {
          this.loading = false;

          if (response && response.access_token) {
            this.authService.login(response.access_token);
            this.router.navigate(['/admin']);
          }
        },
        error: (err) => {
          this.message = this.errorHandlerService.handleError(err) || 'error desconocido';
          this.loading = false;
        }
      });
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }

  returnPreviousPage(): void {
    this.router.navigate(['/']);
  }
}
