import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ErrorHandlerService } from '../../../services/error-handler.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.valid){
      const {username, password } = this.form.value;
      this.apiService.login(username, password).subscribe(
        response => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/admin']);
        },
        error => {
          console.error('Acceso denegado', error);
        }
      )
    }
  }

  returnPreviousPage(): void {
    this.router.navigate(['/']);
  }
}
