import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../vote/components/header/header.component';
import { VotingFormComponent } from '../../../vote/components/voting-form/voting-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, HeaderComponent, VotingFormComponent],
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  constructor(
    private router: Router,
  ) {}

  goToLogin(): void {
    this.router.navigate(['/auth'])
  }

}
