import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';



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
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.valid){
      const {username, password } = this.form.value;
      this.apiService.login(username, password).subscribe(
        (response) => {
          if (response){
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/admin']);
        }
      },
      );
    } else {
      console.error('Credenciales inválidas');
      this.success = false;
      this.message = 'Credenciales inválidas';
    }
  }

  returnPreviousPage(): void {
    this.router.navigate(['/']);
  }
}
