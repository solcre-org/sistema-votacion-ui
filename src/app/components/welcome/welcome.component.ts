import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { VotingFormComponent } from '../voting-form/voting-form.component';
import { LoginButtonComponent } from '../login-button/login-button.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, HeaderComponent, VotingFormComponent, LoginButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

}
