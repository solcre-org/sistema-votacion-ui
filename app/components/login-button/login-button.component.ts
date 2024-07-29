import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {

  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}