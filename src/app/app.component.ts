import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './vote/components/header/header.component';
import { VotingFormComponent } from './vote/components/voting-form/voting-form.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, VotingFormComponent],
  templateUrl: './app.component.html'
})


export class AppComponent {
  title = 'sistema_votacion';
}